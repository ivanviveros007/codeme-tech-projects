import { cookies } from "next/headers";

export default async function BackendPage() {
  const lang = (await cookies()).get("lang")?.value ?? "en";

  if (lang === "es") {
    const { default: Content } = await import("@/content/es/helpdesk/backend.mdx");
    return <article className="max-w-3xl"><Content /></article>;
  }
  const { default: Content } = await import("@/content/helpdesk/backend.mdx");
  return <article className="max-w-3xl"><Content /></article>;
}
