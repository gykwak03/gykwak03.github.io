"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Reveals `.reveal` elements as they scroll into view (adds `.is-visible`).
 * One shared IntersectionObserver for the whole app; re-scans on route change.
 * Falls back to showing everything when reduced-motion is on or IO is missing.
 */
export function RevealInit() {
  const pathname = usePathname();

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const els = Array.from(
        document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)"),
      );
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduce || !("IntersectionObserver" in window)) {
        els.forEach((el) => el.classList.add("is-visible"));
        return;
      }

      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("is-visible");
              io.unobserve(e.target);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
      );
      els.forEach((el) => io.observe(el));
    });

    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return null;
}
