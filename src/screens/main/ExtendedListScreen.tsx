import { ScrollView, StyleSheet } from "react-native";
import GameList from "../../components/games/GameList";
import { StaticScreenProps } from "@react-navigation/native";

type Props = StaticScreenProps<{
  title: string;
  gameIds?: number[];
}>;

const ExtendedListScreen = ({ route }: Props) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <GameList gameIds={route.params.gameIds} />
    </ScrollView>
  );
};

export default ExtendedListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
});
