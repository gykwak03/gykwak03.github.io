import type { Metadata } from "next";
import { contact } from "@/content/site";
import { Container, PageHeader } from "@/components/ui";
import { ResumeButton } from "@/components/ResumeButton";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Gayoung Kwak.",
};

const links = [
  { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
  { label: "GitHub", value: `github.com/${contact.githubHandle}`, href: contact.github },
  { label: "LinkedIn", value: `linkedin.com/${contact.linkedinHandle}`, href: contact.linkedin },
  { label: "Blog", value: contact.blogHandle, href: contact.blog },
];

export default function ContactPage() {
  return (
    <Container className="py-16">
      <PageHeader
        title={{ en: "Contact", ko: "연락처" }}
        subtitle={{
          en: "For research, graduate study, or collaboration, email is the best way to reach me.",
          ko: "연구, 대학원 진학, 협업과 관련한 문의는 이메일로 연락해 주세요.",
        }}
      />

      <div className="grid gap-3 sm:max-w-lg">
        {links.map((l, i) => (
          <a
            key={l.label}
            href={l.href}
            target={l.href.startsWith("mailto:") ? undefined : "_blank"}
            rel="noreferrer"
            style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
            className="group card-lift reveal flex items-center justify-between rounded-xl border border-border bg-card px-5 py-4 hover:border-accent"
          >
            <span className="text-sm font-medium text-subtle">{l.label}</span>
            <span className="text-sm group-hover:text-accent">{l.value}</span>
          </a>
        ))}
      </div>

      <div className="mt-8">
        <ResumeButton className="btn-press inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-fg hover:opacity-90" />
      </div>
    </Container>
  );
}
