import { Platform, StyleSheet, Text, View } from "react-native";
import SearchInput from "../../../components/search/SearchInput";
import { useState } from "react";
import SearchList from "../../../components/search/SearchList";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SearchScreen = () => {
  const { bottom } = useSafeAreaInsets();
  const [query, setQuery] = useState("");
  const containerStyle =
    Platform.OS === "web" ? styles.webContainer : styles.container;

  const hasSearched = query.length > 0;

  return (
    <View>
      <View style={[containerStyle, styles.searchInputContainer]}>
        <SearchInput onQuery={setQuery} />
      </View>

      {hasSearched && (
        <View style={[containerStyle, styles.searchListContainer]}>
          <SearchList
            query={{
              search: query,
            }}
          />
        </View>
      )}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  webContainer: {
    paddingHorizontal: 32,
  },
  searchInputContainer: {
    borderBottomWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.2)",
  },
  recentContainer: {
    padding: 16,
  },
  recentTitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  searchListContainer: {
    height: "100%",
  },
});
