import {
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Title } from "../../components/Title";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import { Trans, useTranslation } from "react-i18next";
import { useAppTheme } from "../../hooks/useAppTheme";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useSignUp } from "../../queries/useAuth";
import { signUpSchema } from "../../types/authSchema";
import z from "zod";
import PasswordInput from "../../components/PasswordInput";

const SignUpScreen = () => {
  const { colors } = useAppTheme();
  const navigation = useNavigation();
  const {
    container,
    webContainer,
    inputsContainer,
    button,
    hasAccountContainer,
    signIn,
  } = styles;
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState<{
    username?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  }>({});
  const { mutate, isPending, error } = useSignUp();
  const containerStyle: StyleProp<ViewStyle> =
    Platform.OS === "web"
      ? [webContainer, { backgroundColor: colors.card }]
      : container;

  const handleSignUp = () => {
    const parse = signUpSchema.safeParse({
      username,
      email,
      password,
      confirmPassword,
    });

    if (!parse.success) {
      const fieldErrors = z.flattenError(parse.error).fieldErrors;
      setValidationErrors(fieldErrors);
      return;
    }

    setValidationErrors({});
    mutate(parse.data);

    if (!error) {
      navigation.navigate("SignIn");
    } else {
      console.warn(error);
    }
  };

  return (
    <SafeAreaView style={containerStyle}>
      <View>
        <Title>
          <Trans
            i18nKey="signUp.title"
            components={{
              highlight: <Text style={{ color: colors.primary }} />,
            }}
          />
        </Title>
        <View style={inputsContainer}>
          <TextInput
            leadingIcon="smart-card-outline"
            placeholder={t("signUp.username")}
            onChangeText={setUsername}
            onChange={() =>
              setValidationErrors({
                username: undefined,
                email: validationErrors.email,
                password: validationErrors.password,
                confirmPassword: validationErrors.confirmPassword,
              })
            }
            error={validationErrors.username?.[0]}
          />
          <TextInput
            leadingIcon="email-outline"
            placeholder={t("signUp.email")}
            onChangeText={setEmail}
            onChange={() =>
              setValidationErrors({
                username: validationErrors.username,
                email: undefined,
                password: validationErrors.password,
                confirmPassword: validationErrors.confirmPassword,
              })
            }
            error={validationErrors.email?.[0]}
          />
          <PasswordInput
            leadingIcon="lock-outline"
            placeholder={t("signUp.password")}
            showTrailingIcon={password.length > 0}
            onChangeText={setPassword}
            onChange={() =>
              setValidationErrors({
                username: validationErrors.username,
                email: validationErrors.email,
                password: undefined,
                confirmPassword: validationErrors.confirmPassword,
              })
            }
            error={validationErrors.password?.[0]}
          />
          <PasswordInput
            leadingIcon="lock-outline"
            placeholder={t("signUp.confirmPassword")}
            showTrailingIcon={confirmPassword.length > 0}
            onChangeText={setConfirmPassword}
            onChange={() =>
              setValidationErrors({
                username: validationErrors.username,
                email: validationErrors.email,
                password: validationErrors.password,
                confirmPassword: undefined,
              })
            }
            error={validationErrors.confirmPassword?.[0]}
          />
        </View>
        <Button
          label={isPending ? t("signUp.loading") : t("signUp.signUp")}
          containerStyle={button}
          onPress={handleSignUp}
        />

        <View style={hasAccountContainer}>
          <Text style={{ color: colors.text }}>{t("signUp.hasAccount")}</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={[signIn, { color: colors.primary }]}>
              {t("signUp.signIn")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: "space-between",
    marginVertical: "12%",
  },
  webContainer: {
    flex: 1,
    padding: 32,
    paddingHorizontal: 72,
    marginVertical: "2%",
    justifyContent: "center",
    alignSelf: "center",
    width: 480,
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderWidth: 1,
    borderRadius: 12,
  },
  inputsContainer: {
    marginTop: 46,
    gap: 30,
  },
  button: {
    marginTop: 30,
  },
  hasAccountContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  signIn: {
    fontWeight: "500",
  },
});
