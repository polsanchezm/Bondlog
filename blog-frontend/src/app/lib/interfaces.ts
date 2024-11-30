import { JWTPayload } from "jose";

interface Post {
  id: string;
  title: string;
  subtitle: string;
  body: string;
  author: string;
  date: string;
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
