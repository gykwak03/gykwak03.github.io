import Link from "next/link";
import { T } from "@/components/T";

export default function ProjectsPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-[800px] flex-col items-start justify-center px-5 py-16 sm:px-7">
      <p className="text-sm text-muted">
        <T en="Projects are listed with the rest of the selected work on the home page." ko="프로젝트는 메인 화면의 주요 작업에서 함께 소개합니다." />
      </p>
      <Link href="/#work" className="mt-4 text-sm font-medium text-foreground underline decoration-border underline-offset-4">
        <T en="Go to selected work" ko="주요 작업으로 이동" />
      </Link>
    </div>
  );
}
