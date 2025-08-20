import { DarkTheme } from "@react-navigation/native";
import { useThemeStore } from "../stores/themeStore";
import { LightTheme } from "../utils/theme";

export const useAppTheme = () => {
  const theme = useThemeStore((state) => state.theme);
  return theme === "light" ? LightTheme : DarkTheme;
};
