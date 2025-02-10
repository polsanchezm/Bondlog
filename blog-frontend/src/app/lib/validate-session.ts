import { decrypt } from "@lib/session";

export async function validateSession(token: string | undefined) {
  if (!token) return null;

  const payload = await decrypt(token);
  if (!payload) return null;

  if (payload.expiresAt) {
    const expiresAt = new Date(payload.expiresAt as string);
    if (new Date() > expiresAt) return null;
  }

  return payload;
}
