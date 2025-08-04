import React, { useState } from "react";
import {
  View,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleSheet,
  Text,
  Pressable,
} from "react-native";
import { useAppTheme } from "../hooks/useAppTheme";
import Icon, { MaterialIconName } from "./Icon";

interface PasswordInputProps extends RNTextInputProps {
  leadingIcon?: MaterialIconName;
  showTrailingIcon?: boolean;
  error?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  leadingIcon,
  showTrailingIcon,
  error,
  style,
  ...props
}) => {
  const { colors } = useAppTheme();
  const [secure, setSecure] = useState(true);

  const toggleSecure = () => setSecure((prev) => !prev);

  return (
    <View style={styles.outerContainer}>
      <View
        style={[
          styles.container,
          { borderColor: error ? "red" : colors.border },
        ]}
      >
        {leadingIcon && (
          <View style={styles.icon}>
            <Icon
              name={leadingIcon}
              color={error ? "red" : colors.text}
              size={24}
            />
          </View>
        )}
        <RNTextInput
          {...props}
          secureTextEntry={secure}
          style={[styles.input, style, { color: error ? "red" : colors.text }]}
          placeholderTextColor={error ? "red" : "#3e515b"}
          cursorColor={colors.primary}
        />
        {showTrailingIcon && (
          <Pressable onPress={toggleSecure} style={styles.icon}>
            <Icon
              name={secure ? "eye-outline" : "eye-off-outline"}
              color={error ? "red" : colors.text}
              size={24}
            />
          </Pressable>
        )}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default PasswordInput;

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
    marginHorizontal: 8,
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
