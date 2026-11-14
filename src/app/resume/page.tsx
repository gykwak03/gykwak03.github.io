import type { Metadata } from "next";
import {
  contact,
  education,
  experience,
  skills,
  languages,
  honors,
} from "@/content/site";
import { research } from "@/content/research";
import { projects } from "@/content/projects";
import { T } from "@/components/T";
import { Container } from "@/components/ui";
import { ResumeButton } from "@/components/ResumeButton";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume of Gayoung Kwak — education, experience, and skills.",
};

function Block({
  title,
  children,
}: {
  title: { en: string; ko: string };
  children: React.ReactNode;
}) {
  return (
    <section className="reveal border-t border-border py-8">
      <h2 className="mb-5 text-sm font-semibold uppercase tracking-wider text-subtle">
        <T {...title} />
      </h2>
      {children}
    </section>
  );
}

export default function ResumePage() {
  return (
    <Container className="py-16">
      <div className="rise flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            <T en="Gayoung Kwak" ko="곽가영" />
          </h1>
          <p className="mt-2 text-muted">
            <T en="AI & Data Science for Healthcare" ko="헬스케어를 위한 AI·데이터 사이언스" />
          </p>
          <p className="mt-1 text-sm text-subtle">
            <a href={`mailto:${contact.email}`} className="hover:text-accent">
              {contact.email}
            </a>
          </p>
        </div>
        <ResumeButton className="btn-press inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-fg hover:opacity-90" />
      </div>

      {/* Experience */}
      <Block title={{ en: "Experience", ko: "경력" }}>
        {experience.map((e, i) => (
          <div key={i} className="mb-6 last:mb-0">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-semibold">
                <T {...e.role} /> · <T {...e.org} />
              </h3>
              <span className="text-sm text-subtle">
                <T {...e.period} /> · <T {...e.location} />
              </span>
            </div>
            <ul className="mt-3 space-y-1.5">
              {e.bullets.en.map((_, j) => (
                <li key={j} className="flex gap-2 text-sm text-muted">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  <span>
                    <span data-lang="en">{e.bullets.en[j]}</span>
                    <span data-lang="ko">{e.bullets.ko[j]}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Block>

      {/* Research */}
      <Block title={{ en: "Research", ko: "연구" }}>
        {research.map((r) => (
          <div key={r.slug} className="mb-4 last:mb-0">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-medium">
                <T {...r.title} />
              </h3>
              <span className="text-sm text-subtle">
                <T {...r.status} />
              </span>
            </div>
            <p className="mt-1 text-sm text-muted">
              <T {...r.summary} />
            </p>
          </div>
        ))}
      </Block>

      {/* Projects */}
      <Block title={{ en: "Projects", ko: "프로젝트" }}>
        <div className="space-y-4">
          {projects.filter((p) => p.slug !== "sanggwon").map((p) => (
            <div key={p.slug}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-medium">
                  <T {...p.title} /> — <T {...p.subtitle} />
                </h3>
                <span className="text-sm text-subtle">
                  <T {...p.period} />
                </span>
              </div>
              <p className="mt-1 text-sm text-muted">
                <T {...p.summary} />
              </p>
            </div>
          ))}
        </div>
      </Block>

      {/* Honors */}
      <Block title={{ en: "Honors", ko: "수상" }}>
        {honors.map((honor) => (
          <div key={honor.href}>
            <h3 className="font-medium"><T {...honor.award} /></h3>
            <p className="mt-1 text-sm text-subtle"><T {...honor.competition} /></p>
            <p className="mt-2 text-sm text-muted"><T {...honor.description} /></p>
            <a href={honor.href} target="_blank" rel="noreferrer" className="mt-2 inline-block text-sm underline underline-offset-4">
              <T en="Official award record" ko="공식 수상 기록" />
            </a>
          </div>
        ))}
      </Block>

      {/* Education */}
      <Block title={{ en: "Education", ko: "학력" }}>
        <div className="space-y-4">
          {education.map((e, i) => (
            <div key={i} className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <h3 className="font-medium">
                  <T {...e.degree} />
                </h3>
                <p className="text-sm text-muted">
                  <T {...e.school} />
                </p>
              </div>
              <span className="text-sm text-subtle">
                <T {...e.period} />
              </span>
            </div>
          ))}
        </div>
      </Block>

      {/* Skills */}
      <Block title={{ en: "Skills", ko: "기술" }}>
        <div className="space-y-3">
          {skills.map((s, i) => (
            <div key={i} className="grid gap-1 sm:grid-cols-[8rem_1fr] sm:gap-4">
              <span className="font-medium">
                <T {...s.name} />
              </span>
              <span className="text-sm text-muted">
                <T {...s.detail} />
              </span>
            </div>
          ))}
        </div>
      </Block>

      {/* Languages */}
      <Block title={{ en: "Languages", ko: "언어" }}>
        <div className="flex flex-wrap gap-6">
          {languages.map((l, i) => (
            <div key={i}>
              <span className="font-medium">
                <T {...l.name} />
              </span>
              <span className="ml-2 text-sm text-muted">
                <T {...l.level} />
              </span>
            </div>
          ))}
        </div>
      </Block>
    </Container>
  );
}
