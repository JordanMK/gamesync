import { useInfiniteQuery } from "@tanstack/react-query";
import { getGames, getGamesByIds } from "../services/IGDBService";

const useGames = () =>
  useInfiniteQuery({
    queryKey: ["games"],
    queryFn: getGames,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextOffset,
  });

const useGamesByIds = (ids: number[]) => {
  return useInfiniteQuery({
    queryKey: ["games", ids],
    queryFn: ({ pageParam = 0 }) => getGamesByIds({ pageParam, ids }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextOffset,
  });
};

export { useGames, useGamesByIds };
