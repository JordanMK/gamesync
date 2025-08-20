import {
  Game,
  GameDetails,
  gameDetailsSchema,
  gameSchema,
} from "../types/gameSchema";
import { Event, eventSchema, Page } from "../types/eventSchema";
import { igdbClient } from "./clients/igdbClient";
import { Platform } from "react-native";

const gameFields = "*, cover.url, genres.name";
const eventFields = "*, event_logo.url, games";
const limit = Platform.OS === "web" ? 20 : 10;

export interface Query {
  where?: string[];
  fields?: string;
  exclude?: string;
  sort?: {
    field: string;
    order: "asc" | "desc";
  };
  limit?: string;
  offset?: string;
  search?: string;
}

type PagedQuery = {
  query: Query;
  pageParam?: number;
};

export const getGameById = async (id: number): Promise<GameDetails> => {
  const response = await igdbClient
    .fields(
      "*, cover.url, genres.name, platforms.alternative_name, platforms.name, screenshots.url",
    )
    .where(`id = ${id}`)
    .request(`/games`);

  const parsed = gameDetailsSchema.array().safeParse(response.data);

  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  return parsed.data[0];
};

export const getGames = async ({
  query,
  pageParam = 0,
}: PagedQuery): Promise<Page<Game[]>> => {
  const client = igdbClient;

  if (query.where) {
    client.where(query.where);
  }

  if (query.sort) {
    client.sort(query.sort.field, query.sort.order);
  }

  if (query.search) {
    client.search(query.search);
  }

  const response = await client
    .fields(query.fields || gameFields)
    .limit(limit)
    .offset(pageParam)
    .request("/games");

  const parsed = gameSchema.array().safeParse(response.data);

  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  return {
    data: parsed.data,
    nextOffset: response.data.length === limit ? pageParam + limit : null,
  };
};

export const getEvents = async ({
  query,
  pageParam = 0,
}: PagedQuery): Promise<Page<Event[]>> => {
  const client = igdbClient;

  if (query.where) {
    client.where(query.where);
  }

  if (query.sort) {
    client.sort(query.sort.field, query.sort.order);
  }

  if (query.search) {
    client.search(query.search);
  }

  const response = await client
    .fields(eventFields)
    .limit(limit)
    .offset(pageParam)
    .request("/events");

  const parsed = eventSchema.array().safeParse(response.data);

  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  return {
    data: parsed.data,
    nextOffset: response.data.length === limit ? pageParam + limit : null,
  };
};
