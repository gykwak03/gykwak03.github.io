"use client";

import { useEffect, useState } from "react";
import type { Lang } from "@/lib/i18n";

export function LangToggle() {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    // Sync the button to the language the pre-hydration script already applied.
    const current = (document.documentElement.getAttribute("data-lang") ||
      "en") as Lang;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLang(current);
  }, []);

  function toggle() {
    const next: Lang = lang === "en" ? "ko" : "en";
    document.documentElement.setAttribute("data-lang", next);
    document.documentElement.setAttribute("lang", next);
    try {
      localStorage.setItem("lang", next);
    } catch {}
    setLang(next);
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle language"
      title="Switch language"
      className="inline-flex h-8 min-w-8 items-center justify-center rounded-full px-1.5 text-[0.62rem] font-semibold tracking-tight text-muted transition-colors hover:bg-accent-soft hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      {lang === "en" ? "KO" : "EN"}
    </button>
  );
}
