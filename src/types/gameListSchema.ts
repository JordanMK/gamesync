import z from "zod";
import { gameSchema } from "./gameSchema";

export type PredefinedName = "Playing" | "Planned" | "Completed" | "Dropped";

export const gameListSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable().optional(),
  isPredefined: z.boolean(),
  createdAt: z.string().transform((value) => new Date(value)),
  games: z.array(gameSchema).default([]),
});

export type GameList = z.infer<typeof gameListSchema>;
