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
import { Platform, TouchableOpacity } from "react-native";
import DetailsScreen from "../screens/main/DetailsScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ListTab from "../screens/main/lists/ListTab";
import { MaterialIcons } from "@expo/vector-icons";
import SearchScreen from "../screens/main/search/SearchScreen";
import ProfileScreen from "../screens/main/ProfileScreen";

const ListsTabNavigator = createMaterialTopTabNavigator({
  screenOptions: ({ theme }) => ({
    tabBarStyle: {
      backgroundColor: theme.colors.background,
    },
  }),
  screens: {
    Playing: {
      screen: ListTab,
      initialParams: { predefinedName: "Playing" },
    },
    Planned: {
      screen: ListTab,
      initialParams: { predefinedName: "Planned" },
    },
    Played: {
      screen: ListTab,
      initialParams: { predefinedName: "Played" },
    },
    Dropped: {
      screen: ListTab,
      initialParams: { predefinedName: "Dropped" },
    },
  },
});

const MainNavigator = createBottomTabNavigator({
  initialRouteName: "Home",
  screenOptions: ({ theme }) => ({
    tabBarPosition: Platform.OS === "web" ? "left" : "bottom",
    tabBarVariant: Platform.OS === "web" ? "material" : "uikit",
    headerStyle: {
      backgroundColor: theme.colors.background,
    },
    headerShadowVisible: false,
    tabBarStyle: {
      backgroundColor: theme.colors.card,
      borderTopWidth: 0,
      borderRightColor:
        Platform.OS === "web" ? "rgba(0, 0, 0, 0.15)" : "transparent",
      minWidth: Platform.OS === "web" ? "auto" : undefined,
    },
    tabBarShowLabel: Platform.OS !== "web",
    tabBarIconStyle: {
      paddingInlineStart: Platform.OS === "web" ? 10 : undefined,
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
      marginStart: Platform.OS === "web" ? 32 : 16,
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
      screen: SearchScreen,
      options: {
        headerShown: false,
        tabBarIcon: ({ color }) => (
          <MaterialIcons name="search" size={24} color={color} />
        ),
      },
    },
    Lists: {
      screen: ListsTabNavigator,
      options: {
        tabBarIcon: ({ color }) => (
          <Icon name="format-list-bulleted" size={24} color={color} />
        ),
      },
    },
    Profile: {
      screen: ProfileScreen,
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
    Details: {
      screen: DetailsScreen,
      initialParams: { id: 0 },
      options: ({ navigation, theme }) => ({
        headerTitle: "",
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
        Welcome: WelcomeScreen,
        SignIn: SignInScreen,
        SignUp: SignUpScreen,
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
