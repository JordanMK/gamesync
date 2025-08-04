import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Title } from "../../components/Title";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import { Trans, useTranslation } from "react-i18next";
import { useAppTheme } from "../../hooks/useAppTheme";
import { useNavigation } from "@react-navigation/native";
import { useSignIn } from "../../queries/useAuth";
import { useState } from "react";
import { signInSchema } from "../../types/authSchema";
import z from "zod";
import PasswordInput from "../../components/PasswordInput";

const SignInScreen = () => {
  const { colors } = useAppTheme();
  const navigation = useNavigation();
  const {
    container,
    inputsContainer,
    forgotPassword,
    button,
    noAccountContainer,
    signUp,
  } = styles;
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, isPending } = useSignIn();
  const [validationErrors, setValidationErrors] = useState<{
    email?: string[];
    password?: string[];
  }>({});

  const handleSignIn = () => {
    const parse = signInSchema.safeParse({ email, password });

    if (!parse.success) {
      const fieldErrors = z.flattenError(parse.error).fieldErrors;
      setValidationErrors(fieldErrors);
      return;
    }

    setValidationErrors({});
    mutate(parse.data);
  };

  return (
    <SafeAreaView style={container}>
      <View>
        <Title>
          <Trans
            i18nKey="signIn.title"
            components={{
              highlight: <Text style={{ color: colors.primary }} />,
            }}
          />
        </Title>
        <View style={inputsContainer}>
          <TextInput
            leadingIcon="email-outline"
            placeholder={t("signIn.email")}
            onChangeText={setEmail}
            onChange={() =>
              setValidationErrors({
                email: undefined,
                password: validationErrors.password,
              })
            }
            error={validationErrors.email?.[0]}
          />
          <PasswordInput
            leadingIcon="lock-outline"
            showTrailingIcon={password.length > 0}
            placeholder={t("signIn.password")}
            onChangeText={setPassword}
            onChange={() =>
              setValidationErrors({
                email: validationErrors.email,
                password: undefined,
              })
            }
            error={validationErrors.password?.[0]}
          />
        </View>
        <TouchableOpacity>
          <Text style={[forgotPassword, { color: colors.text }]}>
            {t("signIn.forgotPassword")}
          </Text>
        </TouchableOpacity>
        <Button
          label={isPending ? t("signIn.loading") : t("signIn.signIn")}
          containerStyle={button}
          onPress={handleSignIn}
        />

        <View style={noAccountContainer}>
          <Text style={{ color: colors.text }}>{t("signIn.noAccount")}</Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUpScreen")}>
            <Text style={[signUp, { color: colors.primary }]}>
              {t("signIn.signUp")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: "space-between",
    marginVertical: "12%",
  },
  inputsContainer: {
    marginTop: 46,
    gap: 30,
  },
  forgotPassword: {
    marginTop: 20,
    textAlign: "right",
    fontWeight: "600",
  },
  button: {
    marginTop: 30,
  },
  noAccountContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  signUp: {
    fontWeight: "600",
  },
});
