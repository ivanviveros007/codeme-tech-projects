import { getMdxContent } from "@/lib/mdx";

export default async function AiServicePage() {
  const { content } = await getMdxContent("helpdesk/ai-service.mdx");
  return <article className="max-w-3xl">{content}</article>;
}
