import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow the login page through unconditionally
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const adminCookie = request.cookies.get("addy_admin");

  if (!adminCookie || adminCookie.value !== "true") {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
