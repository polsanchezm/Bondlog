import { NextResponse, NextRequest } from "next/server";
import { validateSession } from "@/lib/validate-session";
// export { auth as middleware } from "@/auth";

import {
  deleteSession,
  deleteUserCookie,
  updateSessionToken,
} from "@/lib/session";

export const config = {
  matcher: ["/account/:path*", "/post/:id/edit", "/post/create"],
};

export async function middleware(req: NextRequest) {
  const sessionCookie = req.cookies.get("session")?.value;
  const payload = await validateSession(sessionCookie);

  if (!payload) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (
    req.nextUrl.pathname.startsWith("/account/edit") &&
    payload.userRole === "admin"
  ) {
    return NextResponse.redirect(new URL("/account", req.url));
  }

  if (payload?.expiresAt) {
    const expiresAt = new Date(payload.expiresAt as string);
    const remainingTime = expiresAt.getTime() - Date.now();

    if (remainingTime < 1 * 60 * 60 * 1000) {
      const updated = await updateSessionToken(sessionCookie!);
      if (updated) {
        const response = NextResponse.next();
        response.cookies.set("session", updated.token, {
          httpOnly: true,
          secure: true,
          expires: updated.expires,
          sameSite: "lax",
          path: "/",
        });
        return response;
      }
    }
  }

  return NextResponse.next();
}