// app/middleware.ts
import { NextAuthRequest } from "next-auth";
import { auth } from "../auth"; // Import your auth config
import { NextRequest, NextResponse } from "next/server";

// Define restricted paths
const restrictedPaths = ["/dashboard/internal"];

// Middleware function
export default auth((req: NextAuthRequest) => {
  // console.log("🚀 ~ req:", req);
  // Access session data from req.auth
  const session = req.auth;
  const isAuthenticated = !!session?.user;
  const url = req.nextUrl;
  const { pathname } = url;

  // console.log("🚀 ~ middleware ~ isAuthenticated:", isAuthenticated);
  // console.log("🚀 ~ middleware ~ pathname:", pathname);

  // Redirect authenticated users away from signin/signup pages
  if (
    isAuthenticated &&
    (pathname === "/auth/signin" || pathname === "/auth/signup")
  ) {
    console.log(
      "Redirecting authenticated user from",
      pathname,
      "to /dashboard"
    );
    return NextResponse.redirect(new URL("/dashboard/", req.url));
  }

  // Redirect unauthenticated users trying to access /dashboard
  if (!isAuthenticated && pathname.startsWith("/dashboard")) {
    console.log(
      "Redirecting unauthenticated user from",
      pathname,
      "to /signin"
    );
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  // Role-based access control for restricted paths
  const isRestrictedPath = restrictedPaths.some((path) =>
    pathname.includes(path)
  );
  if (isRestrictedPath) {
    if (session?.user?.role !== "admin") {
      console.log(
        "Redirecting non-admin user (role:",
        session?.user?.role,
        ") from",
        pathname,
        "to /dashboard"
      );
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    console.log("Allowing admin role access to", pathname);
  }

  // Example: Restrict specific paths based on roles (uncomment if needed)
  // if (pathname.match(/^\/dashboard\/novels\/[^/]+\/repository$/)) {
  //   if (session?.user?.role !== "user" && session?.user?.role !== "creator") {
  //     console.log(
  //       "Redirecting non-user/creator role",
  //       session?.user?.role,
  //       "from",
  //       pathname,
  //       "to /dashboard/todos"
  //     );
  //     return NextResponse.redirect(new URL("/dashboard/todos", req.url));
  //   }
  // }

  // Allow the request to proceed
  return NextResponse.next();
});

// Matcher configuration
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/dashboard/:path*",
    "/auth/:path*",
  ],
};
