import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

export async function saveToken(token: string) {
  if (Platform.OS === "web") {
    localStorage.setItem("jwt", token);
  } else {
    await SecureStore.setItemAsync("jwt", token);
  }
}

export async function getToken() {
  if (Platform.OS === "web") {
    return localStorage.getItem("jwt");
  } else {
    return await SecureStore.getItemAsync("jwt");
  }
}

export async function removeToken() {
  if (Platform.OS === "web") {
    localStorage.removeItem("jwt");
  } else {
    await SecureStore.deleteItemAsync("jwt");
  }
}
