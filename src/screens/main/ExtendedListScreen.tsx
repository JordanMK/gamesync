import { Platform, StyleSheet, View } from "react-native";
import GameList from "../../components/games/GameList";
import { StaticScreenProps } from "@react-navigation/native";
import { Query } from "../../services/IGDBService";

type Props = StaticScreenProps<{
  title: string;
  query: Query;
}>;

const ExtendedListScreen = ({ route }: Props) => {
  const containerStyle =
    Platform.OS === "web" ? styles.webContainer : styles.container;

  return (
    <View style={containerStyle}>
      <GameList query={route.params.query} />
    </View>
  );
};

export default ExtendedListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  webContainer: {
    flex: 1,
    marginHorizontal: 32,
  },
});
