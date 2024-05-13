import GitHub from "next-auth/providers/github";
import { AuthError, type NextAuthConfig, type User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/user";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          const validateFields = LoginSchema.safeParse(credentials);
          if (validateFields.success) {
            const { email, password } = validateFields.data;
            const user = await getUserByEmail(email);
            if (!user || !user.password) return null;

            const passwordsMatch = await bcrypt.compare(
              password,
              user.password
            );
            if (passwordsMatch) {
              return user;
            }
          }
          throw new Error("User not found");
        } catch (error) {
          if (error instanceof AuthError) {
            console.error("asdasd" + error.type);
          }
          throw error;
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
