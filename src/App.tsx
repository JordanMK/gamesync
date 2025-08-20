import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./navigation";
import * as SplashScreen from "expo-splash-screen";
import { useCustomFonts } from "./hooks/useCustomFonts";
import { useEffect } from "react";
import "./i18n";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useAuthStore from "./stores/authStore";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useThemeStore } from "./stores/themeStore";
import { LightTheme, DarkTheme } from "./utils/theme";

SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

export default function App() {
  const fontsloaded = useCustomFonts();
  const theme = useThemeStore((state) => state.theme);
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

  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <BottomSheetModalProvider>
            <Navigation theme={theme === "light" ? LightTheme : DarkTheme} />
          </BottomSheetModalProvider>
        </SafeAreaProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
