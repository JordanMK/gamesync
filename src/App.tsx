import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./navigation";
import * as SplashScreen from "expo-splash-screen";
import { useCustomFonts } from "./hooks/useCustomFonts";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const fontsloaded = useCustomFonts();

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
      <Navigation />
    </SafeAreaProvider>
  );
}
