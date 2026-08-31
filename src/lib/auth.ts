import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { supabase } from "@/lib/supabase";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async ({ email, password }) => {
        if (email === "demo@velour.com" && password === "velour123") {
          return { id: "1", name: "Demo User", email: "demo@velour.com" };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return true;
      const { data } = await supabase
        .from("User")
        .select("id")
        .eq("email", user.email)
        .single();

      if (!data) {
        await supabase.from("User").insert({
          id: user.id ?? crypto.randomUUID(),
          name: user.name,
          email: user.email,
          image: user.image,
        });
      }
      return true;
    },
  },
  pages: { signIn: "/login" },
});