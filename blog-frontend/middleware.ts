import { NextResponse, NextRequest } from 'next/server';
import { isAuthenticated } from "@/actions/auth"; // La misma función de autenticación

export async function middleware(request: NextRequest) {
  const authCheck = await isAuthenticated();

  // Si el usuario no está autenticado y está intentando acceder a una página protegida
  if (!authCheck && request.nextUrl.pathname !== '/login') {
    // Redirigir a la página de login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Si el usuario está autenticado o está accediendo a la página de login, continuar con la solicitud
  return NextResponse.next();
}

// Si solo quieres que esto se aplique a rutas específicas, puedes configurar las rutas que quieres proteger
export const config = {
  matcher: ['/account', '/dashboard', '/settings'], // Las rutas que necesitas proteger
};
