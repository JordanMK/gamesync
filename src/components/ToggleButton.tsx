import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useAppTheme } from "../hooks/useAppTheme";

interface ToggleButtonProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
  leadingIcon?: React.ReactNode;
  disabled?: boolean;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  activeBackgroundColor?: string;
  inactiveBackgroundColor?: string;
  activeTextColor?: string;
  inactiveTextColor?: string;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  label,
  isActive,
  onPress,
  leadingIcon,
  disabled = false,
  containerStyle,
  labelStyle,
  activeBackgroundColor,
  inactiveBackgroundColor,
  activeTextColor,
  inactiveTextColor,
}) => {
  const { colors } = useAppTheme();

  const backgroundColor = isActive
    ? (activeBackgroundColor ?? colors.primary)
    : (inactiveBackgroundColor ?? "rgba(255, 255, 255, 0.5)");

  const textColor = isActive
    ? (activeTextColor ?? colors.text)
    : (inactiveTextColor ?? colors.text);

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor },
        containerStyle,
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      {leadingIcon && <View style={styles.icon}>{leadingIcon}</View>}
      <Text style={[styles.label, { color: textColor }, labelStyle]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default ToggleButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 20,
    justifyContent: "flex-start",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
  icon: {
    marginRight: 8,
  },
  disabled: {
    opacity: 0.5,
  },
});
