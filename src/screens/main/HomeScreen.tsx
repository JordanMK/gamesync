import { Platform, ScrollView, StyleSheet, View } from "react-native";
import EventList from "../../components/events/EventList";
import GameList from "../../components/games/GameList";
import { t } from "i18next";

const HomeScreen = () => {
  const currentUnixTimestamp = Math.floor(Date.now() / 1000);
  const containerStyle =
    Platform.OS === "web" ? styles.webContainer : styles.container;
  const webContainerStyle =
    Platform.OS === "web" ? styles.webListContainer : styles.listContainer;

  return (
    <ScrollView style={containerStyle}>
      <View style={webContainerStyle}>
        <EventList
          title={t("home.latestEvents")}
          query={{
            where: [`start_time < ${currentUnixTimestamp}`],
            sort: { field: "start_time", order: "desc" },
          }}
        />
        <GameList
          title={t("home.topGames")}
          horizontal
          query={{
            sort: { field: "rating_count", order: "desc" },
          }}
        />
        <GameList
          title={t("home.mostAnticipated")}
          horizontal
          query={{
            where: [
              `first_release_date > ${currentUnixTimestamp}`,
              "hypes > 0",
            ],
            sort: { field: "hypes", order: "desc" },
          }}
        />
        <GameList
          title={t("home.comingSoon")}
          horizontal
          query={{
            where: [`first_release_date > ${currentUnixTimestamp}`],
            sort: { field: "first_release_date", order: "asc" },
          }}
        />
        <GameList
          title={t("home.recentlyReleased")}
          horizontal
          query={{
            where: [`first_release_date <= ${currentUnixTimestamp}`],
            sort: { field: "first_release_date", order: "desc" },
          }}
        />
        <EventList
          title={t("home.upcomingEvents")}
          query={{
            where: [`start_time > ${currentUnixTimestamp}`],
            sort: { field: "start_time", order: "asc" },
          }}
        />
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
  webContainer: {
    flex: 1,
    paddingHorizontal: 32,
  },
  listContainer: {
    gap: 24,
    paddingBottom: 32,
  },
  webListContainer: {
    gap: 32,
    paddingBottom: 64,
  },
});
