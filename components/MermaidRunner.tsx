"use client";
import { useEffect } from "react";

export function MermaidRunner() {
  useEffect(() => {
    async function run() {
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

      const blocks = document.querySelectorAll<HTMLElement>("[data-mermaid]");
      for (const el of blocks) {
        const chart = el.getAttribute("data-mermaid");
        if (!chart) continue;
        const id = `mermaid-${Math.random().toString(36).slice(2)}`;
        try {
          const { svg } = await mermaid.render(id, chart);
          el.innerHTML = svg;
        } catch {
          el.innerHTML = `<p class="text-red-400 text-xs p-2">Diagram error</p>`;
        }
      }
    }
    run();
  }, []);

  return null;
}
