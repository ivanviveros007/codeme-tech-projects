import { getMdxContent } from "@/lib/mdx";
import { cookies } from "next/headers";

export default async function FrontPage() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value ?? "en";
  const { content } = await getMdxContent("helpdesk/front.mdx", lang);
  return <article className="max-w-3xl">{content}</article>;
}
