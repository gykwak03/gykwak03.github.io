import { contact } from "@/content/site";
import { publicPath } from "@/lib/paths";

/**
 * Language-aware résumé download. Both anchors render; the bilingual CSS
 * (`html[data-lang]`) shows the one matching the current language, so a Korean
 * visitor downloads "이력서_곽가영.pdf" and an English visitor gets the EN résumé.
 */
export function ResumeButton({ className = "" }: { className?: string }) {
  return (
    <>
      <a
        data-lang="en"
        href={publicPath(contact.cvEn)}
        download="Gayoung_Kwak_Resume.pdf"
        className={className}
      >
        Download Résumé
      </a>
      <a
        data-lang="ko"
        href={publicPath(contact.cvKo)}
        download="이력서_곽가영.pdf"
        className={className}
      >
        이력서 다운로드
      </a>
    </>
  );
}
