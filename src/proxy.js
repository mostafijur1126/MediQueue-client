import { NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

// This function can be marked `async` if using `await` inside
export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  const isProtected =
    request.nextUrl.pathname.startsWith("/add-tutor") ||
    request.nextUrl.pathname.startsWith("/my-tutors") ||
    request.nextUrl.pathname.startsWith("/my-sessions") ||
    request.nextUrl.pathname.startsWith("/tutors");

  if (isProtected && !session) {
    const loginUrl = new URL("/login", request.url);

    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);

    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request) { ... }

export const config = {
  matcher: ["/add-tutor", "/my-tutors", "/my-sessions", "/tutors/:path"],
};
