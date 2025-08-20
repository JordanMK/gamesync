import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getGameById, getGames, Query } from "../services/IGDBService";

export const useGame = (id: number) =>
  useQuery({
    queryKey: ["game", id],
    queryFn: () => getGameById(id),
  });

export const useGames = (query: Query) =>
  useInfiniteQuery({
    queryKey: ["games", query],
    queryFn: ({ pageParam = 0 }) => getGames({ query, pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextOffset,
  });
