import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";

export const LightTheme = {
  ...NavigationDefaultTheme,
  dark: false,
  colors: {
    ...NavigationDefaultTheme.colors,
    background: "#dad5cb",
    text: "#0e2532",
    primary: "#e02929",
    card: "#e9e6e0",
    border: "#3e515b",
    notification: "#000000",
  },
};

export const DarkTheme = {
  ...NavigationDarkTheme,
  dark: true,
  colors: {
    ...NavigationDarkTheme.colors,
    background: "#0e2532",
    text: "#dad5cb",
    primary: "#e02929",
    card: "#3e515b",
    border: "#3e515b",
    notification: "#000000",
  },
};
