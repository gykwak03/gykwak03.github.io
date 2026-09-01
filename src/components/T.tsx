import type { L } from "@/lib/i18n";

/**
 * Renders both English and Korean copies of a string into the DOM.
 * CSS (`html[data-lang]`) shows exactly one — so switching languages is
 * instant, flash-free, and needs no re-render or client JS.
 */
export function T({ en, ko }: L) {
  return (
    <>
      <span data-lang="en">{en}</span>
      <span data-lang="ko">{ko}</span>
    </>
  );
}

/** Block-level variant (e.g. wrapping paragraphs or lists). */
export function TBlock({
  en,
  ko,
  className,
}: {
  en: React.ReactNode;
  ko: React.ReactNode;
  className?: string;
}) {
  return (
    <>
      <div data-lang="en" className={className}>
        {en}
      </div>
      <div data-lang="ko" className={className}>
        {ko}
      </div>
    </>
  );
}
