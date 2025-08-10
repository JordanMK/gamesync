import { useColorScheme } from "react-native";
import { useThemeStore } from "../stores/themeStore";
import { darkTheme, lightTheme } from "../utils/theme";

export const useAppTheme = () => {
  const systemTheme = useColorScheme();
  const themeState = useThemeStore((state) => state.theme);

  const resolvedTheme = themeState === "system" ? systemTheme : themeState;

  return resolvedTheme === "dark" ? darkTheme : lightTheme;
};
