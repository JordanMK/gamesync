import axios from "axios";
import { Game, gamesSchema } from "../types/gameSchema";
import { Event, eventsSchema, Page } from "../types/eventSchema";
import camelcaseKeys from "camelcase-keys";
import { QueryFunctionContext } from "@tanstack/react-query";

const igdbApi = axios.create({
  baseURL: process.env.EXPO_PUBLIC_IGDB_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_IGDB_API_ACCESS_TOKEN}`,
    "Client-ID": process.env.EXPO_PUBLIC_IGDB_API_CLIENT_ID,
    "Content-Type": "text/plain",
  },
  responseType: "json",
});

igdbApi.interceptors.response.use(
  (response) => {
    if (
      response.headers["content-type"]?.includes("application/json") &&
      typeof response.data === "object"
    ) {
      response.data = camelcaseKeys(response.data, { deep: true });
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const getLatestEvents = async ({
  pageParam = 0,
}: QueryFunctionContext<string[], number>): Promise<Page<Event[]>> => {
  const now = Math.floor(Date.now() / 1000);

  const limit = 10;
  const query = `
    fields *, event_logo.url, games;
    sort start_time desc;
    where start_time < ${now};
    limit ${limit};
    offset ${pageParam};
  `;

  const response = await igdbApi.post("/events", query);
  const parsed = eventsSchema.safeParse(response.data);

  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  return {
    data: parsed.data,
    nextOffset: response.data.length === limit ? pageParam + limit : null,
  };
};

type QueryWithIds = {
  ids: number[];
  pageParam?: number;
};

export const getGamesByIds = async ({
  pageParam = 0,
  ids,
}: QueryWithIds): Promise<Page<Game[]>> => {
  const limit = 10;
  let query = `
    fields *, cover.url;
    limit ${limit};
    offset ${pageParam};
  `;

  if (ids.length > 0) {
    query += `where id = (${ids.join(",")});`;
  }

  const response = await igdbApi.post("/games", query);
  const parsed = gamesSchema.safeParse(response.data);

  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  return {
    data: parsed.data,
    nextOffset: response.data.length === limit ? pageParam + limit : null,
  };
};

export const getGames = async ({
  pageParam = 0,
}: QueryFunctionContext<string[], number>): Promise<Page<Game[]>> => {
  const limit = 10;
  const query = `
    fields *, cover.url;
    limit ${limit};
    offset ${pageParam};
  `;

  const response = await igdbApi.post("/games", query);
  const parsed = gamesSchema.safeParse(response.data);

  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  return {
    data: parsed.data,
    nextOffset: response.data.length === limit ? pageParam + limit : null,
  };
};
