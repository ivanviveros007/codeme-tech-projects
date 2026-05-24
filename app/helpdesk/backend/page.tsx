import { getMdxContent } from "@/lib/mdx";

export default async function BackendPage() {
  const { content } = await getMdxContent("helpdesk/backend.mdx");
  return <article className="max-w-3xl">{content}</article>;
}
