import { StyleSheet, Text, View } from "react-native";
import { useGameLists } from "../../../queries/useGameLists";
import { PredefinedName } from "../../../types/gameListSchema";
import { StaticScreenProps } from "@react-navigation/native";
import StaticGameList from "../../../components/games/StaticGameList";

type Props = StaticScreenProps<{
  predefinedName: PredefinedName;
}>;

const ListTab = ({ route }: Props) => {
  const { data, isLoading, error, refetch } = useGameLists();

  if (!data) {
    return (
      <View>
        <Text>no data</Text>
      </View>
    );
  }

  const predefinedLists = data.filter((list) => list.isPredefined);

  const list = predefinedLists.find(
    (list) => list.name === route.params.predefinedName,
  );
  if (!list) {
    return (
      <View>
        <Text>no list</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StaticGameList
        games={list.games}
        isLoading={isLoading}
        error={error}
        onRefresh={refetch}
      />
    </View>
  );
};

export default ListTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
