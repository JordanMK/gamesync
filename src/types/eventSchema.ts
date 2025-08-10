import { z } from "zod";

export const eventLogoSchema = z.object({
  id: z.number(),
  url: z
    .string()
    .transform((value) => `https:${value}`)
    .transform((value) => value.replace("t_thumb", "t_screenshot_big")),
});

export const eventSchema = z.object({
  id: z.number(),
  name: z.string(),
  eventLogo: eventLogoSchema.optional(),
  startTime: z
    .number()
    .transform((value) => new Date(value * 1000))
    .optional(),
  timezone: z.string().optional(),
  games: z.array(z.number()),
});

export const eventsSchema = z.array(eventSchema);

export type Event = z.infer<typeof eventSchema>;

export type Page<T> = {
  data: T;
  nextOffset: number | null;
};
