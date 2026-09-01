import { contact } from "@/content/site";
import { T } from "@/components/T";

export function Footer() {
  const links = [
    { label: "Email", href: `mailto:${contact.email}` },
    { label: "GitHub", href: contact.github },
    { label: "LinkedIn", href: contact.linkedin },
    { label: "Blog", href: contact.blog },
  ];

  return (
    <footer className="mt-20">
      <div className="mx-auto flex max-w-[720px] flex-col items-center justify-between gap-4 border-t border-border px-5 py-8 text-xs text-subtle sm:flex-row sm:px-7">
        <p>
          © 2026 <T en="Gayoung Kwak" ko="곽가영" />
        </p>
        <div className="flex flex-wrap items-center gap-3">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noreferrer"
              className="transition-colors hover:text-accent"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
