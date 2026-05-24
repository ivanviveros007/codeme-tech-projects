import { readFile } from "fs/promises";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx/components";

export async function getMdxContent(filePath: string) {
  const fullPath = path.join(process.cwd(), "content", filePath);
  const source = await readFile(fullPath, "utf-8");
  const { content, frontmatter } = await compileMDX<{ title: string; description: string }>({
    source,
    components: mdxComponents as any,
    options: { parseFrontmatter: true },
  });
  return { content, frontmatter };
}
