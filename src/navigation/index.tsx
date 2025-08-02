import {
  createStaticNavigation,
  StaticParamList,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import WelcomeScreen from "../screens/onboarding/WelcomeScreen";
import SignInScreen from "../screens/onboarding/SignInScreen";
import SignUpScreen from "../screens/onboarding/SignUpScreen";
import HomeScreen from "../screens/main/HomeScreen";
import { useIsAuthenticated, useIsNotAuthenticated } from "../stores/authStore";

const MainNavigator = createBottomTabNavigator({
  screens: {
    HomeScreen,
  },
});

const RootNavigator = createNativeStackNavigator({
  groups: {
    Onboarding: {
      if: useIsNotAuthenticated,
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
      if: useIsAuthenticated,
      screens: {
        MainNavigator,
      },
    },
  },
});

const Navigation = createStaticNavigation(RootNavigator);

type RootNavigatorParamList = StaticParamList<typeof RootNavigator>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootNavigatorParamList {}
  }
}

export default Navigation;
