import { signIn } from "@/auth";

export const dynamic = "force-dynamic";

export default function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20">
            <span className="font-mono text-lg font-bold text-indigo-400">C</span>
          </div>
          <h1 className="text-xl font-semibold text-white">CodeMe Tech Projects</h1>
          <p className="mt-1 text-sm text-zinc-500">Internal documentation — restricted access</p>
        </div>

        {/* Form */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
          <h2 className="mb-1 text-base font-semibold text-white">Sign in</h2>
          <p className="mb-6 text-sm text-zinc-400">
            Enter your email. We'll send you a magic link to access the docs.
          </p>

          <form
            action={async (formData: FormData) => {
              "use server";
              const params = await searchParams;
              await signIn("resend", {
                email: formData.get("email") as string,
                redirectTo: params.callbackUrl ?? "/",
              });
            }}
            className="flex flex-col gap-4"
          >
            <input
              type="email"
              name="email"
              required
              placeholder="you@company.com"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30"
            />
            <button
              type="submit"
              className="w-full rounded-xl bg-indigo-500 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400"
            >
              Send magic link
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-zinc-600">
          Access is restricted to invited collaborators.
        </p>
      </div>
    </div>
  );
}
