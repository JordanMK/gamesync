import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Title } from "../../components/Title";
import Icon from "../../components/Icon";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import { Trans, useTranslation } from "react-i18next";
import { useAppTheme } from "../../hooks/useAppTheme";
import { useNavigation } from "@react-navigation/native";

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
            leadingIcon={<Icon name="email-outline" />}
            placeholder={t("signIn.email")}
          />
          <TextInput
            leadingIcon={<Icon name="lock-outline" />}
            placeholder={t("signIn.password")}
          />
        </View>
        <TouchableOpacity>
          <Text style={[forgotPassword, { color: colors.text }]}>
            {t("signIn.forgotPassword")}
          </Text>
        </TouchableOpacity>
        <Button
          label={t("signIn.signIn")}
          containerStyle={button}
          onPress={() => navigation.navigate("MainNavigator")}
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
