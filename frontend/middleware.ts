import { NextRequest, NextResponse } from "next/server";

const AUTH_ROUTES = [
  "/login",
  "/register",
];

const PROTECTED_ROUTES = [
  "/",
  "/profile",
  "/messages",
  "/settings",
];

export function middleware(
  request: NextRequest
) {
  const accessToken =
    request.cookies.get(
      "accessToken"
    )?.value;

  const { pathname } =
    request.nextUrl;

  const isAuthRoute =
    AUTH_ROUTES.includes(pathname);

  const isProtectedRoute =
    PROTECTED_ROUTES.some(
      (route) =>
        pathname === route ||
        pathname.startsWith(
          `${route}/`
        )
    );

  if (
    !accessToken &&
    isProtectedRoute
  ) {
    return NextResponse.redirect(
      new URL(
        "/login",
        request.url
      )
    );
  }

  if (
    accessToken &&
    isAuthRoute
  ) {
    return NextResponse.redirect(
      new URL("/", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/profile/:path*",
    "/messages/:path*",
    "/settings/:path*",
    "/login",
    "/register",
  ],
};