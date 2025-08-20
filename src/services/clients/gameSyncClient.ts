import axios, { AxiosError } from "axios";
import { getToken, removeToken } from "../../utils/secureStore";

export const gameSyncClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  responseType: "json",
});

gameSyncClient.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

gameSyncClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      await removeToken();
    }
    return Promise.reject(error);
  },
);
