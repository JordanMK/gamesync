import { useInfiniteQuery } from "@tanstack/react-query";
import { getEvents, Query } from "../services/IGDBService";

export const useEvents = (query: Query) =>
  useInfiniteQuery({
    queryKey: ["events", query],
    queryFn: ({ pageParam = 0 }) => getEvents({ query, pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextOffset,
  });
