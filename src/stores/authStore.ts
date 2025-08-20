import { create } from "zustand";
import { getToken, saveToken, removeToken } from "../utils/secureStore";

type AuthStore = {
  isAuthenticated: boolean;
  token: string | null;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
  restoreToken: () => Promise<void>;
};

const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  token: null,

  signIn: async (token: string) => {
    await saveToken(token);
    set({ token, isAuthenticated: true });
  },

  signOut: async () => {
    await removeToken();
    set({ token: null, isAuthenticated: false });
  },

  restoreToken: async () => {
    const token = await getToken();
    if (token) {
      set({ token, isAuthenticated: true });
    } else {
      set({ token: null, isAuthenticated: false });
    }
  },
}));

export const useIsAuthenticated = () =>
  useAuthStore((state) => state.isAuthenticated);

export const useIsNotAuthenticated = () =>
  !useAuthStore((state) => state.isAuthenticated);

export default useAuthStore;
