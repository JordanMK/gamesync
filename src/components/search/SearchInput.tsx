import { StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "../Icon";
import { MaterialIcons } from "@expo/vector-icons";

type Props = {
  onQuery: (query: string) => void;
  onChangeText?: (query: string) => void;
};

const SearchInput = ({ onQuery, onChangeText }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <MaterialIcons name="search" size={24} />
      <TextInput
        style={styles.input}
        placeholder="Search games & events"
        onEndEditing={(e) => onQuery(e.nativeEvent.text)}
        onChangeText={onChangeText}
      />
    </SafeAreaView>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingTop: 4,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
});
