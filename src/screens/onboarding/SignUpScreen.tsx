import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Title } from "../../components/Title";
import Icon from "../../components/Icon";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import { Trans, useTranslation } from "react-i18next";
import { useAppTheme } from "../../hooks/useAppTheme";
import { useNavigation } from "@react-navigation/native";

const SignUpScreen = () => {
  const { colors } = useAppTheme();
  const navigation = useNavigation();
  const { container, inputsContainer, button, hasAccountContainer, signIn } =
    styles;
  const { t } = useTranslation();

  return (
    <SafeAreaView style={container}>
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
            leadingIcon={<Icon name="smart-card-outline" />}
            placeholder={t("signUp.username")}
          />
          <TextInput
            leadingIcon={<Icon name="email-outline" />}
            placeholder={t("signUp.email")}
          />
          <TextInput
            leadingIcon={<Icon name="lock-outline" />}
            placeholder={t("signUp.password")}
          />
          <TextInput
            leadingIcon={<Icon name="lock-outline" />}
            placeholder={t("signUp.confirmPassword")}
          />
        </View>
        <Button
          label={t("signUp.signUp")}
          containerStyle={button}
          onPress={() => navigation.navigate("MainNavigator")}
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
