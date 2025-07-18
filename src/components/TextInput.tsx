import React from "react";
import {
  View,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleSheet,
} from "react-native";
import { useAppTheme } from "../hooks/useAppTheme";

interface TextInputProps extends RNTextInputProps {
  leadingIcon?: React.ReactNode;
}

const TextInput: React.FC<TextInputProps> = ({
  leadingIcon,
  style,
  ...props
}) => {
  const { colors } = useAppTheme();
  return (
    <View style={[styles.container, { borderColor: colors.border }]}>
      {leadingIcon && <View style={styles.icon}>{leadingIcon}</View>}
      <RNTextInput
        {...props}
        style={[styles.input, style, { color: colors.text }]}
        placeholderTextColor="#3e515b"
        cursorColor={colors.primary}
      />
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
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
});
