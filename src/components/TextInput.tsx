import React from "react";
import {
  View,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleSheet,
  Text,
} from "react-native";
import { useAppTheme } from "../hooks/useAppTheme";

interface TextInputProps extends RNTextInputProps {
  leadingIcon?: React.ReactNode;
  error?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  leadingIcon,
  error,
  style,
  ...props
}) => {
  const { colors } = useAppTheme();
  return (
    <View style={styles.outerContainer}>
      <View style={[styles.container, { borderColor: colors.border }]}>
        {leadingIcon && <View style={styles.icon}>{leadingIcon}</View>}
        <RNTextInput
          {...props}
          style={[styles.input, style, { color: colors.text }]}
          placeholderTextColor="#3e515b"
          cursorColor={colors.primary}
        />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  outerContainer: {
    gap: 6,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderRadius: 14,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  icon: {
    marginRight: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Inter_400Regular",
  },
  error: {
    color: "red",
  },
});
