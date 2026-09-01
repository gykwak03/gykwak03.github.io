import type { ComponentType } from "react";
import Image from "next/image";
import Link from "next/link";
import { T } from "@/components/T";
import { LangToggle } from "@/components/LangToggle";
import type { DetailMedia } from "@/lib/detail";
import type { L } from "@/lib/i18n";
import { publicPath } from "@/lib/paths";

type DetailLink = {
  label: string;
  href: string;
};

export function WorkDetail({
  kind,
  title,
  subtitle,
  context,
  period,
  role,
  collaborators,
  collaboratorLabel = { en: "Collaborators", ko: "공동 작업자" },
  badge,
  links,
  media = [],
  body,
}: {
  kind: L;
  title: L;
  subtitle: L;
  context: L;
  period: L;
  role?: L;
  collaborators?: L;
  collaboratorLabel?: L;
  badge?: L;
  links: DetailLink[];
  media?: DetailMedia[];
  body: { en: ComponentType; ko: ComponentType };
}) {
  const BodyEn = body.en;
  const BodyKo = body.ko;

  return (
    <div className="mx-auto w-full max-w-[800px] px-5 pb-20 pt-12 sm:px-7 sm:pt-16">
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-sm text-subtle transition-colors hover:text-foreground"
        >
          <span aria-hidden>←</span>
          <T en="Back to home" ko="메인으로 돌아가기" />
        </Link>
        <div className="flex items-center gap-1" aria-label="Language setting">
          <LangToggle />
        </div>
      </div>

      <header className="rise mt-10 border-b border-border pb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
          <T {...kind} />
        </p>
        <h1 className="mt-3 max-w-[740px] text-[2rem] font-semibold leading-[1.12] tracking-[-0.045em] text-foreground sm:text-[2.8rem]">
          <T {...title} />
        </h1>
        <p className="mt-4 max-w-[650px] text-base leading-7 text-muted sm:text-lg">
          <T {...subtitle} />
        </p>

        <div className="mt-7 space-y-1.5 text-sm">
          <p className="text-muted">
            <span className="font-semibold text-foreground">Gayoung Kwak</span>
            {role && (
              <>
                <span className="text-subtle"> · </span>
                <T {...role} />
              </>
            )}
          </p>
          {collaborators && (
            <p className="text-muted">
              <span className="font-medium text-foreground">
                <T {...collaboratorLabel} />
              </span>
              <span className="text-subtle"> · </span>
              <T {...collaborators} />
            </p>
          )}
          <p className="italic text-muted">
            <T {...context} />
            <span className="not-italic text-subtle"> · <T {...period} /></span>
          </p>
        </div>

        {(badge || links.length > 0) && (
          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            {badge && (
              <span className="rounded-full bg-accent-soft px-3 py-1.5 text-xs font-medium text-accent">
                <T {...badge} />
              </span>
            )}
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="btn-press rounded-full bg-foreground px-3.5 py-1.5 text-xs font-medium text-background"
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        )}
      </header>

      <article className="reveal pt-10">
        <h2 className="text-2xl font-semibold tracking-[-0.035em] text-foreground">
          <T en="Abstract" ko="개요" />
        </h2>
        <div className="mt-5">
          <div
            data-lang="en"
            className="prose max-w-none prose-p:text-[1rem] prose-p:leading-8 prose-p:text-muted sm:prose-p:text-[1.04rem]"
          >
            <BodyEn />
          </div>
          <div
            data-lang="ko"
            className="prose max-w-none break-keep prose-p:text-[1rem] prose-p:leading-8 prose-p:text-muted sm:prose-p:text-[1.04rem]"
          >
            <BodyKo />
          </div>
        </div>
      </article>

      {media.length > 0 && (
        <section
          aria-label="Project evidence"
          className="reveal mt-10 space-y-8"
        >
          {media.map((item) => (
            <figure key={item.src}>
              <div className="overflow-hidden rounded-xl bg-white shadow-[0_8px_30px_rgba(16,31,90,0.07)]">
                <Image
                  src={publicPath(item.src)}
                  alt={item.alt.en}
                  width={item.width}
                  height={item.height}
                  sizes="(max-width: 850px) 90vw, 744px"
                  loading="lazy"
                  className="h-auto w-full"
                  style={item.trimTop ? { marginTop: `-${item.trimTop}px` } : undefined}
                />
              </div>
              <figcaption className="mt-2.5 text-xs leading-5 text-subtle">
                <T {...item.caption} />
              </figcaption>
            </figure>
          ))}
        </section>
      )}

      <div className="mt-14 border-t border-border pt-6">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-sm text-subtle transition-colors hover:text-foreground"
        >
          <span aria-hidden>←</span>
          <T en="Back to selected work" ko="주요 작업으로 돌아가기" />
        </Link>
      </div>
    </div>
  );
}
