import { saveToken } from "../utils/secureStore";
import {
  SignIn,
  SignInResponse,
  SignUp,
  SignUpResponse,
  signUpResponseSchema,
} from "../types/authSchema";
import { gameSyncClient } from "./clients/gameSyncClient";
import { Game } from "../types/gameSchema";
import { GameList, gameListSchema } from "../types/gameListSchema";
import { User, userSchema } from "../types/userSchema";

const signIn = async (signIn: SignIn): Promise<SignInResponse> => {
  const response = await gameSyncClient.post("/auth/login", signIn);
  const jwt = response.headers["x-auth-token"] as string;
  if (jwt) {
    await saveToken(jwt);
  }
  return { jwt: jwt };
};

const signUp = async (signUp: SignUp): Promise<SignUpResponse> => {
  const response = await gameSyncClient.post("/auth/register", signUp);

  const parsed = signUpResponseSchema.safeParse(response.data);
  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  return parsed.data;
};

const getGameLists = async (): Promise<GameList[]> => {
  const response = await gameSyncClient.get("/lists");
  const parsed = gameListSchema.array().safeParse(response.data);

  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  return parsed.data;
};

const addGameToList = async (req: {
  id: number;
  game: Game;
}): Promise<GameList> => {
  const response = await gameSyncClient.post(
    `/lists/${req.id}/games`,
    req.game,
  );
  const parsed = gameListSchema.safeParse(response.data);

  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  return parsed.data;
};

const removeGameFromList = async (req: {
  id: number;
  game: Game;
}): Promise<void> => {
  await gameSyncClient.delete(`/lists/${req.id}/games/${req.game.id}`);
};

const getUser = async (): Promise<User> => {
  const response = await gameSyncClient.get("/users");

  const parsed = userSchema.safeParse(response.data);

  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  return parsed.data;
};

export default {
  signIn,
  signUp,
  addGameToList,
  removeGameFromList,
  getGameLists,
  getUser,
};
