"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const services = [
  { slug: "ai-service", label: "AI Service",  sub: "FastAPI · LangGraph · Gemini" },
  { slug: "backend",    label: "Backend",     sub: "NestJS · TypeORM · PostgreSQL" },
  { slug: "front",      label: "Frontend",    sub: "Next.js · TailwindCSS · Socket.IO" },
  { slug: "landing",    label: "Landing",     sub: "Next.js · Resend · i18n" },
];

const labels: Record<string, { section: string }> = {
  en: { section: "Services" },
  es: { section: "Servicios" },
};

export function SidebarNav({ lang }: { lang: string }) {
  const pathname = usePathname();
  const t = labels[lang] ?? labels.en;

  return (
    <div className="px-4 py-6">
      <p className="mb-4 px-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-600">
        {t.section}
      </p>
      <nav className="flex flex-col gap-1">
        {services.map((s) => {
          const isActive = pathname === `/helpdesk/${s.slug}`;
          return (
            <Link
              key={s.slug}
              href={`/helpdesk/${s.slug}`}
              className={`group flex flex-col rounded-lg px-3 py-2.5 transition-colors ${
                isActive ? "bg-zinc-800" : "hover:bg-zinc-900"
              }`}
            >
              <span className={`text-sm font-medium transition-colors ${
                isActive ? "text-white" : "text-zinc-300 group-hover:text-white"
              }`}>
                {s.label}
              </span>
              <span className="text-xs text-zinc-600">{s.sub}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
