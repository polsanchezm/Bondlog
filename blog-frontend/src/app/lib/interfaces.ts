import { JWTPayload } from "jose";

interface User {
  name: string;
  email: string;
  created_at: string;
}

interface Post {
  id: string;
  title: string;
  subtitle: string;
  body: string;
  authorId: string;
  authorName: string;
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

export type { User, Post, Register, FormState, SessionPayload };
