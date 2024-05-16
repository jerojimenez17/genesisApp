"use server";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import credentials from "next-auth/providers/credentials";
import { redirect } from "next/navigation";
import { z } from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Campos invalidos" };
  }
  const { email, password } = validateFields.data;
  let resp = false;
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    }).then((credentials) => {
      resp = true;
    });
  } catch (err) {
    return { error: "Contraseña incorrecta else" + (err as AuthError).message };
  }
  if (resp) {
    redirect(DEFAULT_LOGIN_REDIRECT);
  }
};
