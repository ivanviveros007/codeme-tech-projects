"use server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function setLang(lang: string) {
  const cookieStore = await cookies();
  cookieStore.set("lang", lang, { path: "/", maxAge: 60 * 60 * 24 * 365 });
  revalidatePath("/helpdesk", "layout");
}
