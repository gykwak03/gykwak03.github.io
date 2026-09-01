import { contact } from "@/content/site";
import { LangToggle } from "@/components/LangToggle";

const actionClass =
  "inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-subtle shadow-[0_1px_3px_rgba(16,31,90,0.06)] transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

function MailIcon() {
  return (
    <svg aria-hidden width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg aria-hidden width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.34 1.12 2.91.86.09-.66.35-1.12.64-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.33 9.33 0 0 1 12 6.97c.85 0 1.69.12 2.48.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.89 0 1.37-.01 2.47-.01 2.8 0 .27.18.59.69.49A10.24 10.24 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg aria-hidden width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.5 8.25H3.25V21H6.5V8.25ZM4.87 3A1.88 1.88 0 1 0 4.9 6.75 1.88 1.88 0 0 0 4.87 3ZM21 13.7c0-3.85-2.05-5.64-4.79-5.64a4.14 4.14 0 0 0-3.74 2.05h-.05V8.25H9.3V21h3.25v-6.31c0-1.66.32-3.27 2.38-3.27 2.03 0 2.05 1.9 2.05 3.38V21H21v-7.3Z" />
    </svg>
  );
}

export function ProfileActions() {
  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="Profile links">
      <a data-lang="en" href={contact.cvEn} target="_blank" rel="noreferrer" className={`${actionClass} text-[0.62rem] font-semibold`} aria-label="Résumé" title="Résumé">
        CV
      </a>
      <a data-lang="ko" href={contact.cvKo} target="_blank" rel="noreferrer" className={`${actionClass} text-[0.62rem] font-semibold`} aria-label="이력서" title="이력서">
        CV
      </a>
      <a href={`mailto:${contact.email}`} className={actionClass} aria-label="Email" title="Email">
        <MailIcon />
      </a>
      <a href={contact.github} target="_blank" rel="noreferrer" className={actionClass} aria-label="GitHub" title="GitHub">
        <GitHubIcon />
      </a>
      <a href={contact.linkedin} target="_blank" rel="noreferrer" className={actionClass} aria-label="LinkedIn" title="LinkedIn">
        <LinkedInIcon />
      </a>
      <span aria-hidden className="mx-0.5 h-5 w-px bg-border" />
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card">
        <LangToggle />
      </span>
    </div>
  );
}
