# Molten glass hero asset

The Hero sculpture is generated reproducibly with Blender 5.2+. It is based on
the local image in `reference/`: a compact molten-glass mass with smooth folds,
deep cavities, blue internal attenuation, and narrow warm reflection ribbons.

```powershell
& "C:\Program Files\Blender Foundation\Blender 5.2\blender.exe" `
  --background --factory-startup `
  --python blender\create_glass_orb.py
```

Generated outputs:

- `glass-orb.blend` — editable Blender scene with the implicit metaball source
- `renders/glass-orb-preview.png` — material and silhouette preview
- `../public/models/glass-orb.glb` — optimized web asset

The preview-only camera, floor, and lights are excluded from the GLB export.
Three.js replaces the exported material at runtime and generates a custom
white/blue/coral reflection studio so the glass responds to the portfolio's
light/dark themes and pointer interaction.
