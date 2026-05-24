import { auth, signOut } from "@/auth";
import Link from "next/link";
import { cookies } from "next/headers";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const t = {
  en: {
    title: "Projects",
    subtitle: "Architecture reference and technical documentation for all active systems.",
    status: "active",
    signOut: "Sign out",
    projectName: "Helpdesk AI",
    projectDesc: "Multi-tenant SaaS helpdesk with AI-powered ticket routing. Full-stack system with NestJS backend, FastAPI AI service, Next.js frontends and a marketing landing page.",
    services: ["AI Service", "Backend", "Frontend", "Landing"],
  },
  es: {
    title: "Proyectos",
    subtitle: "Referencia de arquitectura y documentación técnica de todos los sistemas activos.",
    status: "activo",
    signOut: "Cerrar sesión",
    projectName: "Helpdesk AI",
    projectDesc: "SaaS multi-tenant de helpdesk con routing de tickets por IA. Sistema full-stack con backend NestJS, servicio de IA FastAPI, frontends en Next.js y una landing page de marketing.",
    services: ["Servicio IA", "Backend", "Frontend", "Landing"],
  },
};

const stack = ["NestJS", "FastAPI", "Next.js", "PostgreSQL", "LangGraph", "Gemini"];

export default async function DashboardPage() {
  const [session, cookieStore] = await Promise.all([auth(), cookies()]);
  const lang = (cookieStore.get("lang")?.value ?? "en") as keyof typeof t;
  const tx = t[lang] ?? t.en;

  return (
    <div className="min-h-screen bg-zinc-950">
      <header className="sticky top-0 z-10 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-indigo-500/20 bg-indigo-500/10">
              <span className="font-mono text-sm font-bold text-indigo-400">C</span>
            </div>
            <span className="text-sm font-semibold text-white">CodeMe Tech Projects</span>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher currentLang={lang} />
            <span className="text-xs text-zinc-500">{session?.user?.email}</span>
            <form action={async () => { "use server"; await signOut(); }}>
              <button type="submit" className="text-xs text-zinc-500 transition hover:text-zinc-300">
                {tx.signOut}
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-white">{tx.title}</h1>
          <p className="mt-2 text-zinc-500">{tx.subtitle}</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Link
            href="/helpdesk"
            className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 p-7 transition-all hover:border-indigo-500/40"
          >
            <div className="absolute right-6 top-6 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="text-xs capitalize text-zinc-500">{tx.status}</span>
            </div>

            <h2 className="mb-2 text-lg font-semibold text-white transition-colors group-hover:text-indigo-300">
              {tx.projectName}
            </h2>
            <p className="mb-5 text-sm leading-relaxed text-zinc-400">{tx.projectDesc}</p>

            <div className="mb-5 flex flex-wrap gap-2">
              {tx.services.map((s) => (
                <span key={s} className="rounded-lg border border-zinc-700 bg-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-300">
                  {s}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5">
              {stack.map((tech) => (
                <span key={tech} className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-xs text-indigo-400">
                  {tech}
                </span>
              ))}
            </div>

            <div className="absolute bottom-7 right-7 text-zinc-600 transition-all group-hover:translate-x-0.5 group-hover:text-indigo-400">
              →
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
