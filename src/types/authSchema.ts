import { z } from "zod";

export const signInSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Please enter a valid password")
    .min(6, "Password must be at least 6 characters"),
});

export const signUpSchema = z
  .object({
    username: z
      .string()
      .min(1, "Please enter a valid username")
      .min(3, "Username must be at least 3 characters"),
    email: z.email("Please enter a valid email address"),
    password: z
      .string()
      .min(1, "Please enter a valid password")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const signInResponseSchema = z.object({
  jwt: z.jwt(),
});

export const signUpResponseSchema = z.object({
  username: z.string(),
  email: z.email(),
  createdAt: z.string(),
});

export type SignIn = z.infer<typeof signInSchema>;
export type SignUp = z.infer<typeof signUpSchema>;
export type SignInResponse = z.infer<typeof signInResponseSchema>;
export type SignUpResponse = z.infer<typeof signUpResponseSchema>;
