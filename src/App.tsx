import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./navigation";
import * as SplashScreen from "expo-splash-screen";
import { useCustomFonts } from "./hooks/useCustomFonts";
import { useEffect } from "react";
import { useAppTheme } from "./hooks/useAppTheme";
import { DefaultTheme } from "@react-navigation/native";
import "./i18n";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useAuthStore from "./stores/authStore";

SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

export default function App() {
  const fontsloaded = useCustomFonts();
  const { colors } = useAppTheme();
  const restoreToken = useAuthStore((s) => s.restoreToken);

  useEffect(() => {
    const prepare = async () => {
      await restoreToken();
      if (fontsloaded) {
        SplashScreen.hideAsync();
      }
    };
    prepare();
  }, [fontsloaded, restoreToken]);

  if (!fontsloaded) return null;

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.background,
      text: colors.text,
      card: colors.card,
      border: colors.border,
    },
  };

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <Navigation theme={navTheme} />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
