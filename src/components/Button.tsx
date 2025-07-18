import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useAppTheme } from "../hooks/useAppTheme";

interface ButtonProps {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  leadingIcon?: React.ReactNode;
  disabled?: boolean;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  backgroundColor?: string;
  textColor?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  leadingIcon,
  disabled = false,
  containerStyle,
  labelStyle,
  backgroundColor,
  textColor,
}) => {
  const { colors } = useAppTheme();

  const finalBackgroundColor = disabled
    ? "#ccc"
    : (backgroundColor ?? colors.primary);
  const finalTextColor = textColor ?? colors.text;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: finalBackgroundColor },
        containerStyle,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      {leadingIcon && <View style={styles.icon}>{leadingIcon}</View>}
      <Text style={[styles.label, { color: finalTextColor }, labelStyle]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    borderRadius: 99,
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
  icon: {
    marginRight: 8,
  },
});
