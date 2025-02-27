import { z } from "zod";

const LoginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-zA-Z]/, {
      message: "Password must contain at least one letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character.",
    })
    .trim(),
});

const SignupFormSchema = z
  .object({
    username: z
      .string()
      .min(2, { message: "Username must be at least 2 characters long." })
      .regex(/^[\p{L}0-9\s]+$/u, {
        message: "Username can contain only letters and numbers.",
      })
      .trim(),
    email: z.string().email({ message: "Please enter a valid email." }).trim(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[a-zA-Z]/, {
        message: "Password must contain at least one letter.",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Password must contain at least one special character.",
      })
      .trim(),
    password_confirmation: z.string().trim(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords must match.",
    path: ["password_confirmation"],
  });

const PostSchema = z.object({
  title: z
    .string({ required_error: "Title is required." })
    .min(5, { message: "Title must be at least 5 characters long." })
    .trim(),
  subtitle: z
    .string({ required_error: "Subtitle is required." })
    .min(5, { message: "Subitle must be at least 5 characters long." })
    .trim(),
  body: z.string({ required_error: "Body is required." })
    .trim(),
});

const CommentSchema = z.object({
  content: z
    .string({ required_error: "Content is required." })
    .trim(),
});

export { LoginFormSchema, SignupFormSchema, PostSchema, CommentSchema };
