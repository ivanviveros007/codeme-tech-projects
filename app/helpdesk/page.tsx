import Link from "next/link";

const services = [
  {
    slug: "ai-service",
    name: "AI Service",
    description: "FastAPI service that runs a LangGraph ReAct agent powered by Gemini. Reads incoming tickets, performs RAG over historical data, and decides category, priority and technician assignment.",
    stack: ["FastAPI", "LangGraph", "LangChain", "ChromaDB", "Gemini", "Python 3.11"],
    port: 8000,
    color: "indigo",
  },
  {
    slug: "backend",
    name: "Backend",
    description: "NestJS REST API with multi-tenant architecture. Handles auth, tickets, technicians, levels, invitations and real-time WebSocket events. The orchestration layer between all parts of the system.",
    stack: ["NestJS", "TypeORM", "PostgreSQL", "Socket.IO", "JWT", "Resend"],
    port: 3001,
    color: "violet",
  },
  {
    slug: "front",
    name: "Frontend",
    description: "Next.js 15 App Router application serving three distinct roles: clients creating tickets, technicians managing their queue, and admins overseeing the full operation with metrics.",
    stack: ["Next.js 15", "TailwindCSS", "React Query", "Socket.IO Client", "TypeScript"],
    port: 3000,
    color: "emerald",
  },
  {
    slug: "landing",
    name: "Landing Page",
    description: "Marketing site for early adopter acquisition. EN/ES toggle, a beta sign-up form that sends emails via Resend, and rate limiting on the contact API route.",
    stack: ["Next.js 15", "TailwindCSS", "Resend", "MDX", "i18n Context"],
    port: 3003,
    color: "amber",
  },
];

const colorMap: Record<string, { badge: string; border: string; dot: string }> = {
  indigo:  { badge: "bg-indigo-500/10 text-indigo-400",  border: "hover:border-indigo-500/40",  dot: "bg-indigo-400" },
  violet:  { badge: "bg-violet-500/10 text-violet-400",  border: "hover:border-violet-500/40",  dot: "bg-violet-400" },
  emerald: { badge: "bg-emerald-500/10 text-emerald-400", border: "hover:border-emerald-500/40", dot: "bg-emerald-400" },
  amber:   { badge: "bg-amber-500/10 text-amber-400",    border: "hover:border-amber-500/40",   dot: "bg-amber-400" },
};

export default function HelpdeskIndexPage() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-white">Helpdesk AI</h1>
        <p className="mt-3 max-w-2xl text-zinc-400 leading-relaxed">
          Multi-tenant SaaS helpdesk where AI automatically routes support tickets to the most qualified available technician. Four services that work together — pick one to explore its architecture in depth.
        </p>
      </div>

      {/* System overview */}
      <div className="mb-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">System flow</p>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          {[
            { label: "User creates ticket", color: "text-zinc-300" },
            { label: "→", color: "text-zinc-600" },
            { label: "Backend (3001)", color: "text-violet-400" },
            { label: "→", color: "text-zinc-600" },
            { label: "AI Service (8000)", color: "text-indigo-400" },
            { label: "→", color: "text-zinc-600" },
            { label: "LangGraph + Gemini", color: "text-indigo-300" },
            { label: "→", color: "text-zinc-600" },
            { label: "Decision JSON", color: "text-zinc-300" },
            { label: "→", color: "text-zinc-600" },
            { label: "Backend assigns", color: "text-violet-400" },
            { label: "→", color: "text-zinc-600" },
            { label: "WebSocket + Email", color: "text-emerald-400" },
          ].map((item, i) => (
            <span key={i} className={`font-mono ${item.color}`}>{item.label}</span>
          ))}
        </div>
      </div>

      {/* Service cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {services.map((service) => {
          const c = colorMap[service.color];
          return (
            <Link
              key={service.slug}
              href={`/helpdesk/${service.slug}`}
              className={`group relative rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-all ${c.border}`}
            >
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${c.dot}`} />
                    <h2 className="font-semibold text-white">{service.name}</h2>
                  </div>
                  <span className="text-xs text-zinc-600">port {service.port}</span>
                </div>
                <span className="text-lg text-zinc-700 transition-all group-hover:translate-x-0.5 group-hover:text-zinc-400">→</span>
              </div>

              <p className="mb-4 text-sm leading-relaxed text-zinc-400">{service.description}</p>

              <div className="flex flex-wrap gap-1.5">
                {service.stack.map((t) => (
                  <span key={t} className={`rounded-full px-2 py-0.5 text-xs ${c.badge}`}>
                    {t}
                  </span>
                ))}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
