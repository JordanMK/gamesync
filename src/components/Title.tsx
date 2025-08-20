import React from "react";
import { Text, TextStyle } from "react-native";
import { useAppTheme } from "../hooks/useAppTheme";

type TitleVariant = "h1" | "h2" | "h3";

interface TitleProps {
  children: React.ReactNode;
  variant?: TitleVariant;
  style?: TextStyle;
  numberOfLines?: number;
}

// Define styles per variant
const variantStyles: Record<TitleVariant, TextStyle> = {
  h1: {
    fontFamily: "IBMPlexSans_600SemiBold",
    fontWeight: "600",
    fontSize: 42,
    lineHeight: 50,
  },
  h2: {
    fontFamily: "IBMPlexSans_600SemiBold",
    fontSize: 22,
    lineHeight: 32,
  },
  h3: {
    fontFamily: "IBMPlexSans_600SemiBold",
    fontSize: 18,
    lineHeight: 26,
  },
};

export const Title: React.FC<TitleProps> = ({
  children,
  variant = "h1",
  style,
  numberOfLines,
}) => {
  const theme = useAppTheme();

  return (
    <Text
      style={[variantStyles[variant], { color: theme.colors.text }, style]}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
};
