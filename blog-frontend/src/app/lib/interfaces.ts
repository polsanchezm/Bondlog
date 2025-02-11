import { JWTPayload } from "jose";

interface SessionPayload extends JWTPayload {
  userToken: string;
  expiresAt: Date;
  userRole: string;
}

interface User {
  id: string;
  username: string;
  role: string;
  email: string;
  created_at: string;
  updated_at: string;
}

interface PostDetailProps {
  post: Post;
  user: User | null;
  isLoggedIn: boolean;
}

interface PostActionsProps {
  postId: string;
  userId: string;
  post: Post;
  userRole?: string;
}

interface Post {
  id: string;
  title: string;
  subtitle: string;
  body: string;
  author_id: string;
  author_username: string;
  date: string;
  created_at: string;
  updated_at: string;
  is_pinned: boolean;
}

interface Register {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface FormState {
  email: string;
  password: string;
}

interface APIError {
  message?: string;
  response?: {
    data?: {
      message?: string;
    };
    status?: number;
  };
}

interface Pagination {
  current_page: number;
  next_page_url: string;
  prev_page_url: string;
}

export type {
  User,
  Post,
  Register,
  FormState,
  SessionPayload,
  PostDetailProps,
  PostActionsProps,
  APIError,
  Pagination,
};
