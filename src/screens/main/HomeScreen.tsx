import { ScrollView, StyleSheet, View } from "react-native";
import EventList from "../../components/events/EventList";
import GameList from "../../components/games/GameList";

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.listContainer}>
        <EventList title="Latest events" />
        <GameList title="Latest games" horizontal />
        <GameList title="Latest games" horizontal />
        <GameList title="Latest games" horizontal />
        <GameList title="Latest games" horizontal />
        <EventList title="Upcoming events" />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  listContainer: {
    gap: 24,
    paddingBottom: 32,
  },
});
