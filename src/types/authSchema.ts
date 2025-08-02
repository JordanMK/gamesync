import { z } from "zod";
import i18next from "i18next";

export const signInSchema = z.object({
  email: z.email(i18next.t("signIn.email")).nonempty(i18next.t("signIn.email")),
  password: z.string().nonempty().min(6),
});

export const signUpSchema = z.object({
  username: z.string().nonempty(),
  email: z.email().nonempty(),
  password: z.string().nonempty().min(6),
  confirmPassword: z.string().nonempty().min(6),
});

export const signInResponseSchema = z.object({
  jwt: z.string(),
});

export const signUpResponseSchema = z.object({
  username: z.string(),
  email: z.email(),
  createdAt: z.date(),
});

export type SignIn = z.infer<typeof signInSchema>;
export type SignUp = z.infer<typeof signUpSchema>;
export type SignInResponse = z.infer<typeof signInResponseSchema>;
export type SignUpResponse = z.infer<typeof signUpResponseSchema>;
