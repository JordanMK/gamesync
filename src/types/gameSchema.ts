import { z } from "zod";

export enum GameCategoryEnum {
  main = 0,
  DLC = 1,
  expansion = 2,
  bundle = 3,
  standalone = 4,
  mod = 5,
  episode = 6,
  season = 7,
  remake = 8,
  remaster = 9,
  expanded = 10,
  port = 11,
  fork = 12,
  pack = 13,
  update = 14,
}

export const gameCoverSchema = z.object({
  url: z
    .string()
    .transform((value) => (value.startsWith("http") ? value : `https:${value}`))
    .transform((value) => value.replace("t_thumb", "t_cover_big")),
});

export const gameScreenshotSchema = z.object({
  url: z
    .string()
    .transform((value) => `https:${value}`)
    .transform((value) => value.replace("t_thumb", "t_screenshot_big")),
});

export const gameGenreSchema = z.object({
  name: z.string(),
});

export const gamePlatformSchema = z.object({
  alternativeName: z.string().optional(),
  name: z.string(),
});

export const gameSchema = z.object({
  id: z.number(),
  name: z.string(),
  category: z.enum(GameCategoryEnum),
  cover: gameCoverSchema.default({
    url: "https://images.igdb.com/igdb/image/upload/t_cover_big/nocover.jpg",
  }),
  genres: z.array(gameGenreSchema).default([]),
});

export const gameDetailsSchema = gameSchema.extend({
  screenshots: z.array(gameScreenshotSchema).default([]),
  similarGames: z.array(z.number()).default([]),
  summary: z.string().optional(),
  platforms: z.array(gamePlatformSchema).default([]),
});

export type Game = z.infer<typeof gameSchema>;
export type GameDetails = z.infer<typeof gameDetailsSchema>;
