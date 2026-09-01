"""Generate the reference-matched molten glass hero object.

The form is built as an implicit metaball volume: overlapping positive fields
create the soft mass while negative ellipsoids carve flowing cavities into the
surface. This produces the rounded, liquid topology seen in the local visual
reference without relying on a downloaded model or texture.

Run from the repository root with Blender 5.2+:
  blender --background --factory-startup --python blender/create_glass_orb.py

Outputs:
  blender/glass-orb.blend
  blender/renders/glass-orb-preview.png
  public/models/glass-orb.glb
"""

from __future__ import annotations

import math
from pathlib import Path

import bpy
from mathutils import Euler, Vector


PROJECT_ROOT = Path(__file__).resolve().parents[1]
BLEND_PATH = PROJECT_ROOT / "blender" / "glass-orb.blend"
PREVIEW_PATH = PROJECT_ROOT / "blender" / "renders" / "glass-orb-preview.png"
GLB_PATH = PROJECT_ROOT / "public" / "models" / "glass-orb.glb"

for output_dir in (BLEND_PATH.parent, PREVIEW_PATH.parent, GLB_PATH.parent):
    output_dir.mkdir(parents=True, exist_ok=True)


def clear_scene() -> None:
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete(use_global=False)
    for datablocks in (
        bpy.data.meshes,
        bpy.data.curves,
        bpy.data.materials,
        bpy.data.metaballs,
        bpy.data.cameras,
        bpy.data.lights,
    ):
        for datablock in list(datablocks):
            if datablock.users == 0:
                datablocks.remove(datablock)


def set_socket(node, name: str, value) -> None:
    target = node.inputs.get(name)
    if target is not None:
        target.default_value = value


def make_glass_material() -> bpy.types.Material:
    material = bpy.data.materials.new("Molten_Ice_Glass")
    material.use_nodes = True
    material.diffuse_color = (0.72, 0.88, 1.0, 1.0)
    material.metallic = 0.0
    material.roughness = 0.035

    tree = material.node_tree
    assert tree is not None
    bsdf = tree.nodes.get("Principled BSDF")
    output = tree.nodes.get("Material Output")
    assert bsdf is not None and output is not None
    set_socket(bsdf, "Base Color", (0.76, 0.9, 1.0, 1.0))
    set_socket(bsdf, "Metallic", 0.0)
    set_socket(bsdf, "Roughness", 0.035)
    set_socket(bsdf, "IOR", 1.46)
    set_socket(bsdf, "Transmission Weight", 1.0)
    set_socket(bsdf, "Coat Weight", 1.0)
    set_socket(bsdf, "Coat Roughness", 0.018)

    absorption = tree.nodes.new("ShaderNodeVolumeAbsorption")
    absorption.inputs["Color"].default_value = (0.18, 0.48, 0.82, 1.0)
    absorption.inputs["Density"].default_value = 0.022
    tree.links.new(absorption.outputs["Volume"], output.inputs["Volume"])
    return material


def make_floor_material() -> bpy.types.Material:
    material = bpy.data.materials.new("Reference_Backdrop")
    material.use_nodes = True
    tree = material.node_tree
    assert tree is not None
    bsdf = tree.nodes.get("Principled BSDF")
    assert bsdf is not None
    set_socket(bsdf, "Base Color", (0.68, 0.79, 0.91, 1.0))
    set_socket(bsdf, "Roughness", 0.42)
    return material


def add_metaball_element(
    family: bpy.types.MetaBall,
    *,
    location: tuple[float, float, float],
    radius: float,
    size: tuple[float, float, float] = (1.0, 1.0, 1.0),
    rotation: tuple[float, float, float] = (0.0, 0.0, 0.0),
    negative: bool = False,
    stiffness: float = 2.0,
) -> None:
    element = family.elements.new()
    element.type = "ELLIPSOID"
    element.co = location
    element.radius = radius
    element.size_x, element.size_y, element.size_z = size
    element.rotation = Euler(rotation).to_quaternion()
    element.stiffness = stiffness
    element.use_negative = negative


def create_molten_blob(material: bpy.types.Material) -> bpy.types.Object:
    family = bpy.data.metaballs.new("MoltenGlass_Field")
    family.resolution = 0.035
    family.render_resolution = 0.022
    family.threshold = 0.59
    meta_object = bpy.data.objects.new("MoltenGlass_Implicit", family)
    bpy.context.collection.objects.link(meta_object)

    # Positive fields create a compact, irregular mass rather than a sphere.
    positive_fields = [
        ((0.0, 0.0, 0.0), 1.18, (1.0, 0.91, 1.02), (0.0, 0.0, 0.0), 2.3),
        ((-0.5, 0.02, 0.47), 0.28, (1.2, 0.82, 0.76), (0.18, -0.1, -0.36), 1.85),
        ((0.57, 0.04, 0.3), 0.25, (1.08, 0.84, 0.9), (-0.12, 0.22, 0.42), 1.82),
        ((-0.3, -0.02, -0.6), 0.3, (1.2, 0.84, 0.74), (-0.24, 0.08, 0.2), 1.82),
        ((0.54, 0.08, -0.48), 0.24, (0.84, 0.88, 1.1), (0.25, -0.18, -0.24), 1.8),
    ]
    for location, radius, size, rotation, stiffness in positive_fields:
        add_metaball_element(
            family,
            location=location,
            radius=radius,
            size=size,
            rotation=rotation,
            stiffness=stiffness,
        )

    # Negative fields carve smooth folds and partially enclosed cavities. Most
    # sit close to the camera-facing side (negative Blender Y).
    negative_fields = [
        ((-0.5, -0.58, 0.52), 0.5, (1.42, 1.22, 0.7), (0.35, -0.1, -0.42), 2.45),
        ((0.4, -0.6, 0.56), 0.43, (1.3, 1.18, 0.72), (-0.2, 0.22, 0.46), 2.45),
        ((-0.58, -0.59, -0.11), 0.46, (1.36, 1.15, 0.76), (-0.28, 0.18, 0.28), 2.5),
        ((0.5, -0.58, -0.28), 0.44, (1.38, 1.18, 0.72), (0.32, -0.1, -0.34), 2.45),
        ((0.02, -0.6, -0.65), 0.42, (1.58, 1.15, 0.68), (-0.16, 0.26, 0.12), 2.5),
        ((0.0, -0.62, 0.02), 0.31, (1.85, 1.05, 0.58), (0.12, -0.38, 0.65), 2.4),
        ((-0.12, 0.5, 0.78), 0.34, (1.35, 0.92, 0.58), (0.2, 0.15, -0.2), 2.2),
        ((0.74, 0.18, 0.2), 0.29, (0.92, 0.9, 1.28), (-0.32, 0.18, 0.18), 2.25),
    ]
    for location, radius, size, rotation, stiffness in negative_fields:
        add_metaball_element(
            family,
            location=location,
            radius=radius,
            size=size,
            rotation=rotation,
            negative=True,
            stiffness=stiffness,
        )

    bpy.context.view_layer.objects.active = meta_object
    meta_object.select_set(True)
    bpy.ops.object.convert(target="MESH")
    blob = bpy.context.object
    assert blob is not None
    blob.name = "Blob_Glass"
    blob.data.name = "Blob_Glass_Mesh"
    blob.data.materials.append(material)
    blob.rotation_euler = (math.radians(4), math.radians(-8), math.radians(-5))
    blob.scale = (1.04, 0.94, 1.0)
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)

    for polygon in blob.data.polygons:
        polygon.use_smooth = True

    smooth = blob.modifiers.new("Liquid surface polish", "SMOOTH")
    smooth.factor = 0.23
    smooth.iterations = 4
    bpy.context.view_layer.objects.active = blob
    bpy.ops.object.modifier_apply(modifier=smooth.name)

    subdivision = blob.modifiers.new("Optical surface subdivision", "SUBSURF")
    subdivision.subdivision_type = "CATMULL_CLARK"
    subdivision.levels = 1
    subdivision.render_levels = 1
    bpy.ops.object.modifier_apply(modifier=subdivision.name)

    blob["asset"] = "molten-glass-reference-study"
    blob["role"] = "hero-sculpture"
    return blob


def add_area_light(
    name: str,
    location: tuple[float, float, float],
    energy: float,
    size: float,
    color: tuple[float, float, float],
    shape: str = "DISK",
) -> bpy.types.Object:
    data = bpy.data.lights.new(name=name, type="AREA")
    data.energy = energy
    data.shape = shape
    data.size = size
    if shape == "RECTANGLE":
        data.size_y = max(size * 0.12, 0.08)
    data.color = color
    obj = bpy.data.objects.new(name, data)
    bpy.context.collection.objects.link(obj)
    obj.location = location
    obj.rotation_euler = (Vector((0.0, 0.0, 0.0)) - obj.location).to_track_quat(
        "-Z", "Y"
    ).to_euler()
    return obj


def configure_camera() -> bpy.types.Object:
    data = bpy.data.cameras.new("Preview_Camera")
    data.type = "ORTHO"
    data.ortho_scale = 3.35
    obj = bpy.data.objects.new("Preview_Camera", data)
    bpy.context.collection.objects.link(obj)
    obj.location = (0.06, -8.2, 0.16)
    target = Vector((0.0, 0.0, 0.02))
    obj.rotation_euler = (target - obj.location).to_track_quat("-Z", "Y").to_euler()
    bpy.context.scene.camera = obj
    return obj


def main() -> None:
    clear_scene()
    scene = bpy.context.scene
    scene.render.engine = "BLENDER_EEVEE"
    scene.render.resolution_x = 720
    scene.render.resolution_y = 720
    scene.render.resolution_percentage = 100
    scene.render.image_settings.file_format = "PNG"
    scene.render.image_settings.color_mode = "RGBA"
    scene.render.image_settings.color_depth = "8"
    scene.render.film_transparent = False
    scene.render.filepath = str(PREVIEW_PATH)
    try:
        scene.view_settings.look = "AgX - Medium High Contrast"
    except TypeError:
        pass

    world = bpy.data.worlds.new("Reference_Sky")
    world.use_nodes = True
    background = world.node_tree.nodes.get("Background")
    assert background is not None
    background.inputs["Color"].default_value = (0.54, 0.68, 0.84, 1.0)
    background.inputs["Strength"].default_value = 0.38
    scene.world = world

    blob = create_molten_blob(make_glass_material())
    root = bpy.data.objects.new("MoltenGlassRoot", None)
    bpy.context.collection.objects.link(root)
    blob.parent = root
    export_objects = [blob, root]

    # Preview-only studio. Long warm and cool strips create the ribbon-like
    # reflections that define the reference object.
    bpy.ops.mesh.primitive_plane_add(size=20, location=(0.0, 0.75, -1.72))
    floor = bpy.context.object
    assert floor is not None
    floor.name = "Preview_Floor"
    floor.data.materials.append(make_floor_material())
    add_area_light("Key_White", (-3.6, -4.0, 4.5), 1050, 4.2, (0.96, 0.98, 1.0))
    add_area_light("Fill_Blue", (3.8, -2.6, 2.2), 680, 3.1, (0.28, 0.58, 1.0))
    add_area_light("Coral_Strip_Left", (-3.2, -2.0, 0.4), 540, 4.2, (1.0, 0.34, 0.22), "RECTANGLE")
    add_area_light("Coral_Strip_Right", (3.0, -1.8, -0.1), 430, 3.8, (1.0, 0.48, 0.32), "RECTANGLE")
    add_area_light("Top_Rim", (0.2, 2.8, 4.4), 920, 3.0, (0.54, 0.78, 1.0))
    configure_camera()

    bpy.ops.wm.save_as_mainfile(filepath=str(BLEND_PATH))
    bpy.ops.render.render(write_still=True)

    bpy.ops.object.select_all(action="DESELECT")
    for obj in export_objects:
        obj.select_set(True)
    bpy.context.view_layer.objects.active = root
    bpy.ops.export_scene.gltf(
        filepath=str(GLB_PATH),
        export_format="GLB",
        use_selection=True,
        export_apply=True,
        export_materials="EXPORT",
        export_yup=True,
        export_animations=False,
        export_cameras=False,
        export_lights=False,
        export_extras=True,
        export_draco_mesh_compression_enable=False,
        export_meshopt_compression_enable=False,
    )

    print(f"BLEND={BLEND_PATH}")
    print(f"PREVIEW={PREVIEW_PATH}")
    print(f"GLB={GLB_PATH}")


if __name__ == "__main__":
    main()
