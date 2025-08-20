import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import gameSyncService from "../services/gameSyncService";

export const useUser = () =>
  useQuery({
    queryKey: ["user"],
    queryFn: () => gameSyncService.getUser(),
  });
