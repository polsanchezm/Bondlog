// middleware.ts
import { NextResponse, NextRequest } from "next/server";
import { validateSession } from "@lib/validate-session";
import {
  deleteSession,
  deleteUserCookie,
  updateSessionToken,
} from "@/lib/session";

export const config = {
  // Define las rutas que requieren autenticación.
  // Ejemplo: todas las rutas que comienzan con "/protected" estarán restringidas.
  matcher: ["/account/:path*", "/post/:id/edit", "/post/create"],
};

export async function middleware(req: NextRequest) {
  const sessionCookie = req.cookies.get("session")?.value;
  const payload = await validateSession(sessionCookie);

  // Si no hay sesión válida, elimina la sesión (si existe) y redirige al login.
  if (!payload) {
    console.warn(
      "[Middleware] Sesión inválida o expirada. Eliminando cookie y redirigiendo a /login."
    );
    const response = NextResponse.redirect(new URL("/login", req.url));
    // Es importante usar las mismas opciones que usaste al establecer la cookie (p.ej., path)
    deleteSession();
  }

  if (
    req.nextUrl.pathname.startsWith("/account/edit") &&
    payload.userRole === "admin"
  ) {
    // Puedes redirigir a la página de inicio o a una página de "No autorizado"
    return NextResponse.redirect(new URL("/account", req.url));
  }

  // Si hay un payload y la sesión está a punto de expirar, actualiza el token.
  if (payload?.expiresAt) {
    const expiresAt = new Date(payload.expiresAt as string);
    const remainingTime = expiresAt.getTime() - Date.now();

    // Si queda menos de 1 hora, actualizamos la sesión.
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

  // Si la sesión es válida y no es necesario actualizar, permite el acceso.
  return NextResponse.next();
}
