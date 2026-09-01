import type { Metadata } from "next";
import { education, languages } from "@/content/site";
import { T } from "@/components/T";
import { Container, PageHeader } from "@/components/ui";
import AboutEn from "@/content/mdx/about.en.mdx";
import AboutKo from "@/content/mdx/about.ko.mdx";

export const metadata: Metadata = {
  title: "About",
  description: "About Gayoung Kwak — background, education, and interests.",
};

export default function AboutPage() {
  return (
    <Container className="py-16">
      <PageHeader
        title={{ en: "About", ko: "소개" }}
        subtitle={{
          en: "Background, education, and research interests.",
          ko: "학업 배경과 연구 관심 분야를 소개합니다.",
        }}
      />

      <div className="grid gap-12 lg:grid-cols-[1fr_18rem]">
        {/* Bio */}
        <div
          className="rise"
          style={{ "--rise-delay": "120ms" } as React.CSSProperties}
        >
          <div data-lang="en" className="prose max-w-none">
            <AboutEn />
          </div>
          <div data-lang="ko" className="prose max-w-none">
            <AboutKo />
          </div>
        </div>

        {/* Side: education + languages */}
        <aside
          className="rise space-y-8"
          style={{ "--rise-delay": "200ms" } as React.CSSProperties}
        >
          <section>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-subtle">
              <T en="Education" ko="학력" />
            </h2>
            <ul className="space-y-4">
              {education.map((e, i) => (
                <li key={i} className="border-l-2 border-border pl-4">
                  <p className="text-xs text-subtle">
                    <T {...e.period} />
                  </p>
                  <p className="mt-0.5 font-medium">
                    <T {...e.degree} />
                  </p>
                  <p className="text-sm text-muted">
                    <T {...e.school} />
                  </p>
                  {e.note && (
                    <p className="mt-1 text-xs text-subtle">
                      <T {...e.note} />
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-subtle">
              <T en="Languages" ko="언어" />
            </h2>
            <ul className="space-y-2">
              {languages.map((l, i) => (
                <li key={i} className="flex items-baseline justify-between gap-2">
                  <span className="font-medium">
                    <T {...l.name} />
                  </span>
                  <span className="text-sm text-muted">
                    <T {...l.level} />
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </Container>
  );
}
