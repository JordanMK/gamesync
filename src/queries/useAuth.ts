import { useMutation } from "@tanstack/react-query";
import gameSyncService from "../services/gameSyncService";
import useAuthStore from "../stores/authStore";
import { SignIn, SignUp } from "../types/authSchema";

export const useSignIn = () => {
  const authStore = useAuthStore();

  return useMutation({
    mutationFn: (data: SignIn) => gameSyncService.signIn(data),
    onSuccess: async (data) => {
      await authStore.signIn(data.jwt);
    },
  });
};

export const useSignUp = () => {
  return useMutation({
    mutationFn: (data: SignUp) => gameSyncService.signUp(data),
  });
};
