import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";

const allowedEmails = (process.env.ALLOWED_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Resend({
      from: "HelpDesk AI Docs <onboarding@resend.dev>",
      apiKey: process.env.RESEND_API_KEY,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    verifyRequest: "/auth/verify",
  },
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;
      if (allowedEmails.length === 0) return true; // dev: allow all
      return allowedEmails.includes(user.email.toLowerCase());
    },
  },
});
