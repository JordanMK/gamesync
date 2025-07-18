import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Title } from "../../components/Title";
import { useAppTheme } from "../../hooks/useAppTheme";
import Icon from "../../components/Icon";
import { useNavigation } from "@react-navigation/native";
import { Trans } from "react-i18next";

const WelcomeScreen = () => {
  const { colors } = useAppTheme();
  const navigation = useNavigation();
  const { container, image, bottom, dotRow, dot, lastDot, button } = styles;

  return (
    <SafeAreaView style={container}>
      <View>
        <Title>
          <Trans
            i18nKey="welcome.title"
            components={{
              highlight: <Text style={{ color: colors.primary }} />,
            }}
          />
        </Title>
      </View>
      <Image
        source={require("../../assets/welcome.png")}
        style={image}
        resizeMode="contain"
      />
      <View style={bottom}>
        <View style={dotRow}>
          <View style={dot} />
          <View style={dot} />
          <View style={[lastDot, { backgroundColor: colors.text }]} />
        </View>
        <TouchableOpacity
          style={[button, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate("SignInScreen")}
        >
          <Icon name="chevron-right" size={32} color={colors.text} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: "space-between",
    marginVertical: "12%",
  },
  image: {
    alignSelf: "center",
    width: 320,
    height: 320,
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dotRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 99,
    marginHorizontal: 4,
    backgroundColor: "#9fa8ad",
  },
  lastDot: {
    width: 26,
    height: 8,
    borderRadius: 99,
    marginHorizontal: 4,
  },
  button: {
    width: 68,
    height: 68,
    borderRadius: 99,
    justifyContent: "center",
    alignItems: "center",
  },
});
