import z from "zod";

export const userSchema = z.object({
  username: z.string(),
  email: z.email(),
  createdAt: z.string().transform((value) => new Date(value)),
});

export type User = z.infer<typeof userSchema>;
