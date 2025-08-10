import { useInfiniteQuery } from "@tanstack/react-query";
import { getLatestEvents } from "../services/IGDBService";

const useEvents = () =>
  useInfiniteQuery({
    queryKey: ["events"],
    queryFn: getLatestEvents,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextOffset,
  });

export default useEvents;
