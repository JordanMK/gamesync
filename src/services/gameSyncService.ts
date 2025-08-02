import axios, { AxiosError } from "axios";
import { getToken, removeToken, saveToken } from "../utils/secureStore";
import {
  SignIn,
  SignInResponse,
  signInResponseSchema,
  SignUp,
  SignUpResponse,
  signUpResponseSchema,
} from "../types/authSchema";

const gameSyncApi = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  responseType: "json",
});

gameSyncApi.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

gameSyncApi.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.log("token expired");
      await removeToken();
    }
    return Promise.reject(error);
  },
);

const signIn = async (signIn: SignIn): Promise<SignInResponse> => {
  const response = await gameSyncApi.post("/auth/login", signIn);
  const jwt = response.headers["x-auth-token"] as string;
  if (jwt) {
    await saveToken(jwt);
  }
  return { jwt: jwt };
};

const signUp = async (signUp: SignUp): Promise<SignUpResponse> => {
  const response = await gameSyncApi.post("/auth/register", signUp);

  const parsed = signUpResponseSchema.safeParse(response.data);
  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  return parsed.data;
};

export default {
  signIn,
  signUp,
};
