import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const protectedRoutes = [
    "/cart",
    "/wishlist",
    "/shop",
    "/brands",
    "/categories",
  ];

  const authRoutes = ["/login", "/register"];

  const myPath = request.nextUrl.pathname;

  const myToken = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const token = myToken?.routeToken;

  const isProtectedRoute = protectedRoutes.some((path) =>
    myPath.startsWith(path)
  );

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const isAuthRoute = authRoutes.some((path) =>
    myPath.startsWith(path)
  );

  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
