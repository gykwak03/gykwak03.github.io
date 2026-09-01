import type { L } from "@/lib/i18n";
import { T } from "@/components/T";

export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto max-w-5xl px-5 ${className}`}>{children}</div>
  );
}

export function PageHeader({ title, subtitle }: { title: L; subtitle?: L }) {
  return (
    <div className="rise mb-10">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        <T {...title} />
      </h1>
      {subtitle && (
        <p className="mt-3 max-w-2xl text-lg text-muted">
          <T {...subtitle} />
        </p>
      )}
    </div>
  );
}
