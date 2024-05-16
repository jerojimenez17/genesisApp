import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  publicRoutes,
  authRoutes,
} from "@/routes";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";
import { redirect } from "next/navigation";

export default auth((req) => {
  const { nextUrl } = req;

  const isLoggedIn = !!req.auth;
  console.log("auth" + nextUrl.pathname);
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  if (isApiAuthRoute) {
    return;
  }
  console.log({ isLoggedIn });
  console.log({ isAuthRoute });
  if (isAuthRoute) {
    if (isLoggedIn) {
      // return NextResponse.redirect(new URL("/settings", nextUrl).toString());
      // return NextResponse.rewrite(new URL("/settings", nextUrl).toString());

      return Response.redirect(new URL("/settings", nextUrl));
    }
    return;
  }
  if (!isLoggedIn && !isPublicRoute) {
    // return NextResponse.rewrite(new URL("/auth/login", nextUrl).toString());
    return Response.redirect(new URL("/auth/login", nextUrl));
  }
  return;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
