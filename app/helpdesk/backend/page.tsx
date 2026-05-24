import { getMdxContent } from "@/lib/mdx";
import { cookies } from "next/headers";

export default async function BackendPage() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value ?? "en";
  const { content } = await getMdxContent("helpdesk/backend.mdx", lang);
  return <article className="max-w-3xl">{content}</article>;
}
