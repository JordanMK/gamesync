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
import Icon from "../components/Icon";
import ExtendedListScreen from "../screens/main/ExtendedListScreen";
import { TouchableOpacity } from "react-native";

const MainNavigator = createBottomTabNavigator({
  initialRouteName: "Home",
  screenOptions: ({ theme }) => ({
    headerStyle: {
      backgroundColor: theme.colors.background,
    },
    headerShadowVisible: false,
    tabBarStyle: {
      backgroundColor: theme.colors.card,
      borderTopWidth: 0,
    },
    tabBarActiveTintColor: theme.colors.primary,
    tabBarInactiveTintColor: theme.colors.text,
    headerLeft: () => (
      <Icon
        name="gamepad-outline"
        size={32}
        color={theme.colors.primary}
        style={{ transform: [{ rotate: "50deg" }] }}
      />
    ),
    headerLeftContainerStyle: {
      marginStart: 16,
      marginEnd: 8,
    },
  }),
  screens: {
    Home: {
      screen: HomeScreen,
      options: {
        tabBarIcon: ({ color }) => (
          <Icon name="home-outline" size={24} color={color} />
        ),
      },
    },
    Search: {
      screen: HomeScreen,
      options: {
        tabBarIcon: ({ color }) => (
          <Icon name="map-search-outline" size={24} color={color} />
        ),
      },
    },
    Lists: {
      screen: HomeScreen,
      options: {
        tabBarIcon: ({ color }) => (
          <Icon name="format-list-bulleted" size={24} color={color} />
        ),
      },
    },
    Profile: {
      screen: HomeScreen,
      options: {
        tabBarIcon: ({ color }) => (
          <Icon name="account-outline" size={24} color={color} />
        ),
      },
    },
    ExtendedList: {
      initialParams: { title: "" },
      options: ({ route, theme, navigation }) => ({
        title: route.params.title,
        tabBarButton: () => null,
        tabBarItemStyle: {
          display: "none",
        },
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={32} color={theme.colors.text} />
          </TouchableOpacity>
        ),
      }),
      screen: ExtendedListScreen,
    },
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
      screenOptions: {
        headerShown: false,
      },
      screens: {
        Main: MainNavigator,
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
