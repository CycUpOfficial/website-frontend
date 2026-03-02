// import { NextRequest, NextResponse } from "next/server";

// const AUTH_ROUTES = ["/profile"];

// const isProtectedRoute = (pathname: string) => {
//   return AUTH_ROUTES.some((route) => pathname.startsWith(route));
// };

// export async function middleware(request: NextRequest) {
//   const { pathname, search } = request.nextUrl;

//   if (!isProtectedRoute(pathname)) {
//     return NextResponse.next();
//   }

//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//   if (!apiUrl) {
//     return NextResponse.next();
//   }

//   const cookieHeader = request.headers.get("cookie");

//   try {
//     const response = await fetch(`${apiUrl}/auth/me`, {
//       method: "GET",
//       headers: {
//         ...(cookieHeader ? { cookie: cookieHeader } : {}),
//       },
//       cache: "no-store",
//     });

//     if (response.ok) {
//       return NextResponse.next();
//     }
//   } catch (error) {
//     // Fall through to redirect.
//   }

//   const redirectUrl = request.nextUrl.clone();
//   redirectUrl.pathname = "/";
//   redirectUrl.searchParams.set("auth", "login");
//   redirectUrl.searchParams.set("redirect", `${pathname}${search}`);

//   return NextResponse.redirect(redirectUrl);
// }

// export const config = {
//   matcher: ["/profile/:path*"],
// };
