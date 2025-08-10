import { z } from "zod";

export const gameCoverSchema = z.object({
  url: z
    .string()
    .transform((value) => `https:${value}`)
    .transform((value) => value.replace("t_thumb", "t_cover_big")),
});

export const gameSchema = z.object({
  id: z.number(),
  cover: gameCoverSchema.default({
    url: "https://images.igdb.com/igdb/image/upload/t_cover_big/nocover.jpg",
  }),
  name: z.string(),
  summary: z.string().optional(),
});

export const gamesSchema = z.array(gameSchema);

export type Game = z.infer<typeof gameSchema>;
