import { cookies } from "next/headers";

export default async function LandingPage() {
  const lang = (await cookies()).get("lang")?.value ?? "en";

  if (lang === "es") {
    const { default: Content } = await import("@/content/es/helpdesk/landing.mdx");
    return <article className="max-w-3xl"><Content /></article>;
  }
  const { default: Content } = await import("@/content/helpdesk/landing.mdx");
  return <article className="max-w-3xl"><Content /></article>;
}
