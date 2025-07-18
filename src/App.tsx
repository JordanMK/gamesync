import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./navigation";
import * as SplashScreen from "expo-splash-screen";
import { useCustomFonts } from "./hooks/useCustomFonts";
import { useEffect } from "react";
import { useAppTheme } from "./hooks/useAppTheme";
import { DefaultTheme } from "@react-navigation/native";
import "./i18n";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const fontsloaded = useCustomFonts();
  const { colors } = useAppTheme();

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

  useEffect(() => {
    if (fontsloaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsloaded]);

  if (!fontsloaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Navigation theme={navTheme} />
    </SafeAreaProvider>
  );
}
