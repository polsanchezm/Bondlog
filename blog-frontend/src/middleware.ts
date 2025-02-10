// middleware.ts
import { NextResponse, NextRequest } from "next/server";
import { validateSession } from "@lib/validate-session";
import { deleteSession, updateSessionToken } from "@/lib/session";

export const config = {
  matcher: "/:path*",
};

export async function middleware(req: NextRequest) {
  console.log("[Middleware] Ruta accedida:", req.nextUrl.pathname);
  const sessionCookie = req.cookies.get("session")?.value;

  const payload = await validateSession(sessionCookie);

  if (!payload) {
    console.warn(
      "[Middleware] Sesión inválida o expirada. Eliminando cookie y redirigiendo a /login."
    );
    const response = NextResponse.redirect(new URL("/login", req.url));
    // Es importante usar las mismas opciones que usaste al establecer la cookie (p.ej., path)
    deleteSession();
  }

  if (payload?.expiresAt) {
    const expiresAt = new Date(payload!.expiresAt as string);
    const remainingTime = expiresAt.getTime() - Date.now();

    // Si queda menos de 30 minutos, actualizamos la sesión
    if (remainingTime < 30 * 60 * 1000) {
      console.log("[Middleware] Renovando sesión para usuario activo.");
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
  console.log("[Middleware] Sesión válida:", payload);
  return NextResponse.next();
}
