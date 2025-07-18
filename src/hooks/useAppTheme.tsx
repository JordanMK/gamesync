import { useColorScheme } from "react-native";
import { useThemeStore } from "../stores/themeStore";
import { darkTheme, lightTheme } from "../utils/theme";

export const useAppTheme = () => {
  const systemTheme = useColorScheme();
  const { theme: themeState } = useThemeStore();

  const resolvedTheme = themeState === "system" ? systemTheme : themeState;

  const theme = resolvedTheme === "dark" ? darkTheme : lightTheme;

  return theme;
};
