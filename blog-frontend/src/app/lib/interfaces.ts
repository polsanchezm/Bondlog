import { JWTPayload } from "jose";

interface Post {
  title: string;
  subtitle: string;
  body: string;
}

interface Register {
  name: string;
  email: string;
  password: string;
}

interface FormState {
  email: string;
  password: string;
}

interface SessionPayload extends JWTPayload {
  userToken: string;
  expiresAt: Date;
}

export type { Post, Register, FormState, SessionPayload };
