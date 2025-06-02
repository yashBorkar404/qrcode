import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/recursion", "/queues", "/leaderboard", "/practice"];

export default async function middleware(request: NextRequest) {
  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route),
  );

  if (isProtected) {
    // Check for session token in cookies
    const sessionToken = request.cookies.get("next-auth.session-token") || 
                         request.cookies.get("__Secure-next-auth.session-token");

    if (!sessionToken) {
      const absoluteURL = new URL("/sign-in", request.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }

    // For Edge Runtime compatibility, we'll do a simpler check
    // The actual JWT verification can be done in the page components
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
