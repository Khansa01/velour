import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async ({ email, password }) => {
        // dummy auth — nanti diganti DB
        if (email === "demo@velour.com" && password === "velour123") {
          return { id: "1", name: "Demo User", email: "demo@velour.com" };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});