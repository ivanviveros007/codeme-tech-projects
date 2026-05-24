import { getMdxContent } from "@/lib/mdx";

export default async function LandingPage() {
  const { content } = await getMdxContent("helpdesk/landing.mdx");
  return <article className="max-w-3xl">{content}</article>;
}
