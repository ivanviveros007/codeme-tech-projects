"use client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { setLang } from "@/app/actions/setLang";

export function LanguageSwitcher({ currentLang }: { currentLang: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleSwitch(lang: string) {
    if (lang === currentLang) return;
    startTransition(async () => {
      await setLang(lang);
      router.refresh();
    });
  }

  return (
    <div className={`flex items-center gap-0.5 rounded-lg border border-zinc-800 bg-zinc-900 p-0.5 ${isPending ? "opacity-50" : ""}`}>
      {(["en", "es"] as const).map((lang) => (
        <button
          key={lang}
          onClick={() => handleSwitch(lang)}
          className={`rounded-md px-2.5 py-1 text-xs font-semibold uppercase tracking-wide transition-colors ${
            currentLang === lang
              ? "bg-indigo-500 text-white"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          {lang}
        </button>
      ))}
    </div>
  );
}
