import Link from "next/link";
import { auth } from "@/auth";

const services = [
  { slug: "ai-service", label: "AI Service", sub: "FastAPI · LangGraph · Gemini" },
  { slug: "backend",    label: "Backend",    sub: "NestJS · TypeORM · PostgreSQL" },
  { slug: "front",      label: "Frontend",   sub: "Next.js · TailwindCSS · Socket.IO" },
  { slug: "landing",    label: "Landing",    sub: "Next.js · Resend · i18n" },
];

export default async function HelpdeskLayout({ children }: { children: React.ReactNode }) {
  await auth();
  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Top bar */}
      <header className="sticky top-0 z-10 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-6 py-3.5">
          <Link href="/" className="text-zinc-500 transition hover:text-zinc-300">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <span className="text-xs text-zinc-600">/</span>
          <Link href="/" className="text-xs text-zinc-500 hover:text-zinc-300 transition">Projects</Link>
          <span className="text-xs text-zinc-600">/</span>
          <span className="text-xs font-medium text-zinc-300">Helpdesk AI</span>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl gap-0">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-zinc-800 lg:block sticky top-[49px] h-[calc(100vh-49px)] overflow-y-auto">
          <div className="px-4 py-6">
            <p className="mb-4 px-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-600">
              Services
            </p>
            <nav className="flex flex-col gap-1">
              {services.map((s) => (
                <Link
                  key={s.slug}
                  href={`/helpdesk/${s.slug}`}
                  className="group flex flex-col rounded-lg px-3 py-2.5 transition-colors hover:bg-zinc-900"
                >
                  <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">
                    {s.label}
                  </span>
                  <span className="text-xs text-zinc-600">{s.sub}</span>
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1 px-8 py-10 lg:px-12">
          {children}
        </main>
      </div>
    </div>
  );
}
