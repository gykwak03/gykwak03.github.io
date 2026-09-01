import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { research, getResearch } from "@/content/research";
import { WorkDetail } from "@/components/WorkDetail";

export function generateStaticParams() {
  return research.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const r = getResearch(slug);
  if (!r) return {};
  return { title: r.title.en, description: r.summary.en };
}

export default async function ResearchDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const r = getResearch(slug);
  if (!r) notFound();

  return (
    <WorkDetail
      kind={{ en: "Research", ko: "연구" }}
      title={r.title}
      subtitle={r.summary}
      context={r.venue}
      period={r.period}
      role={r.role}
      collaborators={r.collaborators}
      collaboratorLabel={{ en: "Co-authors", ko: "공동저자" }}
      badge={r.status}
      links={[]}
      body={r.body}
    />
  );
}
