import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

const ADMIN_EMAILS = ["khansa@test.com"];

export default auth((req) => {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin")) {
    const user = req.auth?.user;
    if (!user) return NextResponse.redirect(new URL("/login", req.url));
    if (!ADMIN_EMAILS.includes(user.email ?? "")) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};