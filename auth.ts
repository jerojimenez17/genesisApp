import NextAuth, { DefaultSession } from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
// import { db } from "@/lib/db";
import { getUserById } from "./data/user";
import { PrismaClient, UserRole } from "@prisma/client";
import { db } from "./lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  callbacks: {
    async signIn({ user }) {
      try {
        if (user.id) {
          const existingUser = await getUserById(user.id);
          if (!existingUser) {
            return false;
          }
          return true;
        }
        return false;
      } catch (err) {
        return false;
      }
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      token.role = existingUser.role;
      console.log({ token });
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
