"use client";

import { useEffect, useRef } from "react";

interface Props {
  chart: string;
  caption?: string;
}

export default function MermaidDiagram({ chart, caption }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    async function render() {
      const mermaid = (await import("mermaid")).default;
      mermaid.initialize({
        startOnLoad: false,
        theme: "dark",
        themeVariables: {
          background: "#18181b",
          primaryColor: "#6366f1",
          primaryTextColor: "#f4f4f5",
          primaryBorderColor: "#3f3f46",
          lineColor: "#71717a",
          secondaryColor: "#27272a",
          tertiaryColor: "#3f3f46",
          fontSize: "14px",
        },
      });

      if (!ref.current || cancelled) return;
      const id = `mermaid-${Math.random().toString(36).slice(2)}`;
      try {
        const { svg } = await mermaid.render(id, chart);
        if (ref.current && !cancelled) {
          ref.current.innerHTML = svg;
        }
      } catch {
        if (ref.current && !cancelled) {
          ref.current.innerHTML = `<p class="text-red-400 text-xs p-2">Diagram error</p>`;
        }
      }
    }
    render();
    return () => { cancelled = true; };
  }, [chart]);

  return (
    <div className="my-6">
      <div
        ref={ref}
        className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900 p-6 text-center min-h-[80px]"
      />
      {caption && (
        <p className="mt-2 text-center text-xs text-zinc-500">{caption}</p>
      )}
    </div>
  );
}
