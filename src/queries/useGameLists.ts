import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import gameSyncService from "../services/gameSyncService";
import { Game } from "../types/gameSchema";

export const useAddGameToList = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: number; game: Game }) =>
      gameSyncService.addGameToList(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gameLists"] });
    },
  });
};

export const useRemoveGameFromList = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: number; game: Game }) =>
      gameSyncService.removeGameFromList(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gameLists"] });
    },
  });
};

export const useGameLists = () =>
  useQuery({
    queryKey: ["gameLists"],
    queryFn: () => gameSyncService.getGameLists(),
  });
