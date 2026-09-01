import Image from "next/image";
import Link from "next/link";
import { T, TBlock } from "@/components/T";
import { ProfileActions } from "@/components/ProfileActions";
import { education, experience, languages } from "@/content/site";
import { projects } from "@/content/projects";
import { research } from "@/content/research";

const coreSkills = ["Python", "SQL", "R", "C++", "HTML/CSS", "JavaScript", "React", "AWS", "GCP"];

const projectMarks = [
  { src: "/logos/show-me-the-sanggwon-logo.png", alt: "Show Me The Sanggwon", scale: "scale-[0.82]" },
  { src: "/logos/dentiscan-logo.jpg", alt: "DentiScan", scale: "scale-100" },
  { src: "/logos/ss-ti-line.svg", alt: "SS-TI nutrition survey icon", scale: "scale-100" },
  { src: "/logos/food-poisoning-welch-icon.png", alt: "Welch bacterium game character", scale: "scale-100" },
  { src: "/logos/book-delivery-robot-line.svg", alt: "Book-delivery robot icon", scale: "scale-100" },
] as const;

function LogoBadge({
  src,
  alt,
  size = "large",
  scale = "scale-100",
}: {
  src: string;
  alt: string;
  size?: "small" | "large";
  scale?: string;
}) {
  const sizeClass = size === "small" ? "h-11 w-11" : "h-14 w-14";

  return (
    <div className={`relative z-10 flex ${sizeClass} shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-white shadow-[0_2px_8px_rgba(16,31,90,0.08)]`}>
      <Image
        src={src}
        alt={alt}
        width={96}
        height={96}
        className={`h-full w-full object-cover ${scale}`}
      />
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-5 text-[1.35rem] font-semibold tracking-[-0.025em] text-foreground">
      {children}
    </h2>
  );
}

export default function Home() {
  const study = research[0];

  return (
    <div className="mx-auto w-full max-w-[800px] px-5 pb-12 pt-12 sm:px-7 sm:pt-16">
      <section id="about" className="rise scroll-mt-10 pb-16 sm:pb-20">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="flex min-w-0 items-center gap-5">
            <div className="relative shrink-0">
              <div className="absolute inset-0 translate-y-1.5 rounded-full bg-black/10 blur-lg" />
              <Image
                src="/profile-gayoung-kwak.jpg"
                alt="Portrait of Gayoung Kwak"
                width={116}
                height={116}
                sizes="(max-width: 639px) 92px, 116px"
                preload
                className="relative h-[92px] w-[92px] rounded-full border border-border object-cover object-[50%_42%] shadow-[0_6px_24px_rgba(16,31,90,0.12)] sm:h-[116px] sm:w-[116px]"
              />
            </div>
            <div className="min-w-0">
              <h1 className="text-[2rem] font-semibold leading-none tracking-[-0.045em] text-foreground sm:text-[2.6rem]">
                Gayoung Kwak
              </h1>
              <p className="mt-2 text-sm text-muted sm:whitespace-nowrap sm:text-base">
                <T en="Healthcare AI · Applied Machine Learning" ko="헬스케어 AI · 응용 머신러닝" />
              </p>
            </div>
          </div>
          <div className="sm:ml-auto">
            <ProfileActions />
          </div>
        </div>

        <TBlock
          className="mt-10 space-y-5 text-[1rem] leading-7 text-muted sm:mt-11 sm:text-[1.04rem] sm:leading-8"
          en={
            <>
              <p>
                Hi, I&apos;m Gayoung, an undergraduate at <strong className="font-semibold text-foreground">Kyung Hee University</strong> double majoring in <strong className="font-semibold text-foreground">Food Science &amp; Nutrition</strong> and <strong className="font-semibold text-foreground">Software Convergence</strong>. I also studied Data Science &amp; Engineering as an exchange student at Instituto Superior Técnico, University of Lisbon.
              </p>
              <p>
                I use clinical records, public data, and medical images to build and evaluate <strong className="font-semibold text-foreground">machine-learning systems</strong>. I focus on predictive performance, reproducibility, and the limits of real-world use.
              </p>
              <p>
                My work connects <strong className="font-semibold text-foreground">nutrition and health knowledge</strong> with <strong className="font-semibold text-foreground">data and software</strong>. Recent projects include <Link href="/research/delirium-llm" className="text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground">LLM-based feature selection</Link> for ICU delirium prediction, an <Link href="/projects/sanggwon" className="text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground">explainable restaurant-site survival model</Link>, and a <Link href="/projects/dentiscan" className="text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground">two-stage dental image screening pipeline</Link>.
              </p>
            </>
          }
          ko={
            <>
              <p>
                안녕하세요, 곽가영입니다. <strong className="font-semibold text-foreground">경희대학교</strong>에서 <strong className="font-semibold text-foreground">식품영양학</strong>과 <strong className="font-semibold text-foreground">소프트웨어융합학</strong>을 복수전공하고 있으며, <strong className="font-semibold text-foreground">리스본대학교 Instituto Superior Técnico 교환학생</strong>으로 Data Science &amp; Engineering 과정을 공부했습니다.
              </p>
              <p>
                임상 데이터, 공공데이터, 의료 영상을 활용해 <strong className="font-semibold text-foreground">머신러닝 시스템</strong>을 개발하고 평가합니다. 예측 성능과 재현성, 실제 적용 범위와 한계를 함께 검토합니다.
              </p>
              <p>
                <strong className="font-semibold text-foreground">영양·헬스케어 분야 지식</strong>과 <strong className="font-semibold text-foreground">데이터·소프트웨어 기술</strong>을 연결하는 작업에 관심이 있습니다. 최근에는 <Link href="/research/delirium-llm" className="text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground">LLM 기반 중환자실 섬망 예측 변수 선택 연구</Link>, <Link href="/projects/sanggwon" className="text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground">설명 가능한 요식업 입지 생존 예측 모델</Link>, <Link href="/projects/dentiscan" className="text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground">두 단계 치과 영상 스크리닝 파이프라인</Link>을 수행했습니다.
              </p>
            </>
          }
        />
      </section>

      <section id="experience" className="scroll-mt-28 pb-16 sm:pb-20">
        <SectionTitle><T en="Experience" ko="경력" /></SectionTitle>
        <div className="space-y-7">
          {experience.map((item) => (
            <article key={item.org.en} className="grid grid-cols-[44px_1fr] gap-4">
              <LogoBadge src="/logos/yonsei-university-logo.png" alt="Yonsei University" size="small" />
              <div className="min-w-0 pt-0.5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold leading-5 text-foreground"><T {...item.org} /></h3>
                    <p className="mt-1 text-sm text-muted"><T {...item.role} /></p>
                  </div>
                  <span className="shrink-0 text-xs tabular-nums text-subtle"><T {...item.period} /></span>
                </div>
                <p className="mt-3 text-sm leading-6 text-muted">
                  <T
                    en="Led a study evaluating LLM-based clinical feature selection for ICU delirium prediction. Built a 32,574-patient MIMIC-IV cohort and assessed selection reproducibility and downstream predictive performance."
                    ko="중환자실 섬망 예측을 위한 LLM 기반 임상 변수 선택 연구를 주도했습니다. MIMIC-IV 환자 32,574명의 코호트를 구축하고 변수 선택의 재현성과 예측 성능을 평가했습니다."
                  />
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="education" className="scroll-mt-28 pb-16 sm:pb-20">
        <SectionTitle><T en="Education" ko="학력" /></SectionTitle>
        <div className="space-y-6">
          {education.map((item, index) => (
            <article key={item.degree.en} className="grid grid-cols-[44px_1fr] gap-4">
              {index === 2 ? (
                <LogoBadge
                  src="/logos/ist-lisbon-logo.png"
                  alt="Instituto Superior Técnico"
                  size="small"
                  scale="scale-[0.8]"
                />
              ) : (
                <LogoBadge
                  src="/logos/kyung-hee-university-logo.png"
                  alt="Kyung Hee University"
                  size="small"
                  scale="scale-100 translate-y-[2px]"
                />
              )}
              <div className="min-w-0 pt-0.5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold leading-5 text-foreground"><T {...item.school} /></h3>
                    <p className="mt-1 text-sm text-muted"><T {...item.degree} /></p>
                  </div>
                  <span className="shrink-0 text-xs tabular-nums text-subtle"><T {...item.period} /></span>
                </div>
                {item.note && (
                  <p className="mt-2 text-xs leading-5 text-subtle"><T {...item.note} /></p>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="skills" className="scroll-mt-28 pb-12 sm:pb-14">
        <SectionTitle><T en="Skills" ko="기술" /></SectionTitle>
        <div className="flex flex-wrap gap-2">
          {coreSkills.map((skill) => (
            <span key={skill} className="rounded-md bg-foreground px-3 py-1.5 text-xs font-medium text-background">
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section id="languages" className="scroll-mt-28 pb-20 sm:pb-24">
        <SectionTitle><T en="Languages" ko="언어" /></SectionTitle>
        <div className="flex flex-wrap gap-x-7 gap-y-2">
          {languages.map((language) => (
            <div key={language.name.en} className="text-sm">
              <span className="font-medium text-foreground"><T {...language.name} /></span>
              <span className="ml-2 text-muted"><T {...language.level} /></span>
            </div>
          ))}
        </div>
      </section>

      <section id="work" className="scroll-mt-28 pb-16">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-semibold tracking-[-0.045em] text-foreground sm:text-[2.35rem]">
            <T en="Selected Work" ko="주요 작업" />
          </h2>
          <p className="mx-auto mt-4 max-w-[650px] text-sm leading-6 text-muted sm:text-base sm:leading-7">
            <T
              en="Research and projects across healthcare, applied machine learning, public data, and interactive applications."
              ko="헬스케어, 응용 머신러닝, 공공데이터, 웹·게임 애플리케이션을 아우르는 연구와 프로젝트입니다."
            />
          </p>
        </div>

        <div className="timeline-list relative">
          <article className="timeline-item group relative grid grid-cols-[56px_1fr] gap-5 pb-10">
            <LogoBadge src="/logos/yonsei-university-logo.png" alt="Yonsei University" />
            <div className="min-w-0 pt-0.5">
              <div className="flex items-center gap-2 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-subtle">
                <span>2024–25</span><span aria-hidden>·</span><T en="Research" ko="연구" />
              </div>
              <h3 className="mt-2 text-lg font-semibold leading-6 tracking-[-0.02em] text-foreground transition-colors group-hover:text-accent">
                <Link href={`/research/${study.slug}`}><T {...study.title} /></Link>
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted"><T {...study.summary} /></p>
              <p className="mt-3 text-xs font-medium text-foreground">
                <T en="Role" ko="역할" /> <span className="text-subtle">·</span> <T {...study.role} />
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {study.tags.slice(0, 5).map((tag) => (
                  <span key={tag} className="rounded-full border border-border px-2 py-0.5 text-[0.65rem] text-subtle">{tag}</span>
                ))}
              </div>
              <Link href={`/research/${study.slug}`} className="mt-4 inline-flex text-xs font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground">
                <T en="View details" ko="자세히 보기" />
              </Link>
            </div>
          </article>

          {projects.map((project, index) => (
            <article key={project.slug} className="timeline-item group relative grid grid-cols-[56px_1fr] gap-5 pb-10 last:pb-0">
              <LogoBadge
                src={projectMarks[index].src}
                alt={projectMarks[index].alt}
                scale={projectMarks[index].scale}
              />
              <div className="min-w-0 pt-0.5">
                <div className="flex items-center gap-2 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-subtle">
                  <span><T {...project.period} /></span><span aria-hidden>·</span><span><T {...project.context} /></span>
                </div>
                <h3 className="mt-2 text-lg font-semibold leading-6 tracking-[-0.02em] text-foreground transition-colors group-hover:text-accent">
                  <Link href={`/projects/${project.slug}`}><T {...project.title} /></Link>
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted"><T {...project.summary} /></p>
                <p className="mt-3 text-xs font-medium text-foreground">
                  <T en="Role" ko="역할" /> <span className="text-subtle">·</span> <T {...project.role} />
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 5).map((tag) => (
                    <span key={tag} className="rounded-full border border-border px-2 py-0.5 text-[0.65rem] text-subtle">{tag}</span>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-3 text-xs font-medium">
                  <Link href={`/projects/${project.slug}`} className="text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground">
                    <T en="View details" ko="자세히 보기" />
                  </Link>
                  {project.links.map((link) => (
                    <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="text-subtle hover:text-foreground">
                      {link.label} ↗
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-20 rounded-2xl border border-border bg-card px-6 py-8 text-center shadow-[0_8px_35px_rgba(16,31,90,0.06)] sm:px-10">
        <h2 className="text-xl font-semibold tracking-[-0.03em] text-foreground"><T en="Research and collaboration" ko="연구 및 협업" /></h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted">
          <T en="I welcome conversations about healthcare data, applied machine learning, and research opportunities." ko="헬스케어 데이터, 응용 머신러닝, 연구 기회에 관한 연락을 환영합니다." />
        </p>
        <a href="mailto:gykwak03@khu.ac.kr" className="mt-5 inline-flex rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-transform hover:-translate-y-0.5">
          <T en="Email me" ko="메일 보내기" />
        </a>
      </section>
    </div>
  );
}
