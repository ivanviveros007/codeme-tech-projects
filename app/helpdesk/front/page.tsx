import { getMdxContent } from "@/lib/mdx";

export default async function FrontPage() {
  const { content } = await getMdxContent("helpdesk/front.mdx");
  return <article className="max-w-3xl">{content}</article>;
}
