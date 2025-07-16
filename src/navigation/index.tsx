import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import WelcomeScreen from "../screens/onboarding/WelcomeScreen";
import SignInScreen from "../screens/onboarding/SignInScreen";
import SignUpScreen from "../screens/onboarding/SignUpScreen";
import HomeScreen from "../screens/main/HomeScreen";

const MainNavigator = createBottomTabNavigator({
  screens: {
    HomeScreen,
  },
});

const RootNavigator = createNativeStackNavigator({
  groups: {
    Onboarding: {
      if: () => true,
      screenOptions: {
        headerShown: false,
      },
      screens: {
        WelcomeScreen,
        SignInScreen,
        SignUpScreen,
      },
    },
    Main: {
      if: () => false,
      screens: {
        MainNavigator,
      },
    },
  },
});

const Navigation = createStaticNavigation(RootNavigator);

export default Navigation;
