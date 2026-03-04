import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const isProtectedRoute = (pathname: string) => {
  return (
    pathname.startsWith("/profile") ||
    pathname.startsWith("/product/new") ||
    pathname.startsWith("/product/edit")
  );
};

const buildLoginRedirect = (request: NextRequest) => {
  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = "/";
  redirectUrl.searchParams.set("auth", "login");
  redirectUrl.searchParams.set(
    "redirect",
    `${request.nextUrl.pathname}${request.nextUrl.search}`,
  );
  return NextResponse.redirect(redirectUrl);
};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!isProtectedRoute(pathname)) {
    return NextResponse.next();
  }

  if (!API_URL) {
    return buildLoginRedirect(request);
  }

  const cookieHeader = request.headers.get("cookie");
  const token = request.cookies.get("auth_token")?.value;

  try {
    const response = await fetch(`${API_URL}/auth/me`, {
      method: "GET",
      headers: {
        ...(cookieHeader ? { cookie: cookieHeader } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      cache: "no-store",
    });

    if (response.ok) {
      return NextResponse.next();
    }
  } catch (error) {
    // Fall through to redirect when session validation fails.
  }

  return buildLoginRedirect(request);
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/product/new/:path*",
    "/product/new",
    "/product/edit/:path*",
    "/product/edit",
  ],
};
