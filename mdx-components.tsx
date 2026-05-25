import type { MDXComponents } from "mdx/types";
import MermaidDiagram from "@/components/MermaidDiagram";
import { mdxComponents } from "@/components/mdx/components";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    ...(mdxComponents as MDXComponents),
    MermaidDiagram,
  };
}
