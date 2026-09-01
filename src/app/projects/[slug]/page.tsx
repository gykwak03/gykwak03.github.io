import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/content/projects";
import { WorkDetail } from "@/components/WorkDetail";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return { title: p.title.en, description: p.summary.en };
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  return (
    <WorkDetail
      kind={{ en: "Project", ko: "프로젝트" }}
      title={p.title}
      subtitle={p.subtitle}
      context={p.context}
      period={p.period}
      role={p.role}
      collaborators={p.collaborators}
      badge={p.badge}
      links={p.links}
      media={p.media}
      body={p.body}
    />
  );
}
