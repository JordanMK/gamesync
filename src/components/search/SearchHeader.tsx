import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppTheme } from "../../hooks/useAppTheme";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const SearchHeader = () => {
  const { colors } = useAppTheme();
  const navigation = useNavigation();

  const navigateToSearchModal = () =>
    navigation.navigate("Main", {
      screen: "Search",
      params: {
        screen: "SearchModal",
      },
    });

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={navigateToSearchModal}>
        <View style={[styles.inputContainer, { backgroundColor: colors.card }]}>
          <MaterialIcons name="search" color={colors.text} size={24} />
          <Text style={styles.input}>Search games & events</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SearchHeader;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 4,
  },
  inputContainer: {
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  input: {
    fontSize: 15,
  },
});
