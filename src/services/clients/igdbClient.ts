import apicalypse from "apicalypse";
import camelcaseKeys from "camelcase-keys";

export const igdbClient = apicalypse({
  baseURL: process.env.EXPO_PUBLIC_IGDB_API_URL,
  method: "POST",
  responseType: "json",
  headers: {
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_IGDB_API_ACCESS_TOKEN}`,
    "Client-ID": process.env.EXPO_PUBLIC_IGDB_API_CLIENT_ID,
  },
  transformResponse: (response) =>
    camelcaseKeys(JSON.parse(response), { deep: true }),
});
