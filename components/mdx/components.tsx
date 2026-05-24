import MermaidDiagram from "@/components/MermaidDiagram";

function Callout({ type = "info", children }: { type?: "info" | "warn" | "tip"; children: React.ReactNode }) {
  const styles = {
    info:  "border-indigo-500/30 bg-indigo-500/5 text-indigo-300",
    warn:  "border-amber-500/30 bg-amber-500/5 text-amber-300",
    tip:   "border-emerald-500/30 bg-emerald-500/5 text-emerald-300",
  };
  const icons = { info: "ℹ", warn: "⚠", tip: "✦" };
  return (
    <div className={`my-4 flex gap-3 rounded-xl border px-4 py-3 text-sm leading-relaxed ${styles[type]}`}>
      <span className="shrink-0 mt-0.5">{icons[type]}</span>
      <div>{children}</div>
    </div>
  );
}

function EnvTable({ vars }: { vars: { name: string; description: string; example?: string }[] }) {
  return (
    <div className="my-4 overflow-hidden rounded-xl border border-zinc-800">
      <table className="w-full text-sm">
        <thead className="bg-zinc-900 text-left">
          <tr>
            <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-zinc-500">Variable</th>
            <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-zinc-500">Description</th>
            <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-zinc-500">Example</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800 bg-zinc-950">
          {vars.map((v) => (
            <tr key={v.name}>
              <td className="px-4 py-2.5 font-mono text-xs text-indigo-400">{v.name}</td>
              <td className="px-4 py-2.5 text-zinc-300">{v.description}</td>
              <td className="px-4 py-2.5 font-mono text-xs text-zinc-500">{v.example ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FileTable({ files }: { files: { path: string; description: string }[] }) {
  return (
    <div className="my-4 overflow-hidden rounded-xl border border-zinc-800">
      <table className="w-full text-sm">
        <thead className="bg-zinc-900 text-left">
          <tr>
            <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-zinc-500">File</th>
            <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-zinc-500">Purpose</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800 bg-zinc-950">
          {files.map((f) => (
            <tr key={f.path}>
              <td className="px-4 py-2.5 font-mono text-xs text-emerald-400">{f.path}</td>
              <td className="px-4 py-2.5 text-zinc-300">{f.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TechBadge({ name, color = "indigo" }: { name: string; color?: string }) {
  const colors: Record<string, string> = {
    indigo: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    violet: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    rose: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${colors[color] ?? colors.indigo}`}>
      {name}
    </span>
  );
}

function TechStack({ items }: { items: { name: string; role: string; color?: string }[] }) {
  return (
    <div className="my-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div key={item.name} className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3">
          <TechBadge name={item.name} color={item.color} />
          <p className="mt-2 text-xs leading-relaxed text-zinc-400">{item.role}</p>
        </div>
      ))}
    </div>
  );
}

export const mdxComponents = {
  MermaidDiagram,
  Callout,
  EnvTable,
  FileTable,
  TechStack,
  TechBadge,
  // Typography overrides
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="mb-4 mt-10 text-3xl font-bold tracking-tight text-white first:mt-0" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="mb-3 mt-10 border-b border-zinc-800 pb-2 text-xl font-semibold text-white" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="mb-2 mt-6 text-base font-semibold text-zinc-200" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-4 leading-relaxed text-zinc-400" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mb-4 space-y-1.5 pl-5 text-zinc-400" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="list-disc leading-relaxed" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-zinc-200" {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-xs text-indigo-300" {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="my-4 overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-sm leading-relaxed" {...props} />
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-4 overflow-hidden rounded-xl border border-zinc-800">
      <table className="w-full text-sm" {...props} />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-zinc-900 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500" {...props} />
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="px-4 py-2.5" {...props} />
  ),
  tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody className="divide-y divide-zinc-800 bg-zinc-950" {...props} />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="px-4 py-2.5 text-zinc-300" {...props} />
  ),
};
