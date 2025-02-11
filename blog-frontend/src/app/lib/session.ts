"use server";
import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { SessionPayload } from "./interfaces";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    if (!session) return null;

    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error: unknown) {
    console.error("Failed to verify session", error);
    return null;
  }
}

export async function createSession(userToken: string, userRole: string) {
  // Establecemos la nueva expiración (12 horas a partir de ahora)
  const expiresAt = new Date(Date.now() + 12 * 60 * 60 * 1000);

  const token = await encrypt({ userToken, userRole, expiresAt });

  (await cookies()).set("session", token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
  return token;
}

export async function updateSessionToken(token: string) {
  const payload = (await decrypt(token)) as SessionPayload;
  if (!payload) return null;

  // Establecemos la nueva expiración para 12 horas a partir de ahora
  const newExpiresAt = new Date(Date.now() + 12 * 60 * 60 * 1000);

  payload.expiresAt = newExpiresAt;

  // Generamos un nuevo token con la nueva fecha de expiración
  const newToken = await encrypt({
    userToken: payload.userToken,
    userRole: payload.userRole,
    expiresAt: payload.expiresAt,
  });

  return { token: newToken, expires: newExpiresAt };
}

export async function deleteSession() {
  const cookieStore = cookies();
  (await cookieStore).delete("session");
}
