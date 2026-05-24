import Link from "next/link";
import { cookies } from "next/headers";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { SidebarNav } from "@/components/SidebarNav";

const breadcrumb: Record<string, string> = {
  en: "Projects",
  es: "Proyectos",
};

export default async function HelpdeskLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value ?? "en";

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Top bar */}
      <header className="sticky top-0 z-10 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-zinc-500 transition hover:text-zinc-300">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <span className="text-xs text-zinc-600">/</span>
            <Link href="/" className="text-xs text-zinc-500 hover:text-zinc-300 transition">
              {breadcrumb[lang] ?? breadcrumb.en}
            </Link>
            <span className="text-xs text-zinc-600">/</span>
            <span className="text-xs font-medium text-zinc-300">Helpdesk AI</span>
          </div>
          <LanguageSwitcher currentLang={lang} />
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl gap-0">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-zinc-800 lg:block sticky top-[49px] h-[calc(100vh-49px)] overflow-y-auto">
          <SidebarNav lang={lang} />
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1 px-8 py-10 lg:px-12">
          {children}
        </main>
      </div>
    </div>
  );
}
