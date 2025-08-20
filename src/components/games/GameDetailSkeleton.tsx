import { StyleSheet, View } from "react-native";
import SkeletonPlaceholder from "expo-skeleton-placeholder";

const GameDetailSkeleton = () => {
  return (
    <View style={styles.container}>
      <SkeletonPlaceholder
        backgroundColor="rgba(255, 255, 255, 0.3)"
        highlightColor="rgba(255, 255, 255, 0.4)"
      >
        <View style={styles.mainContainer}>
          <View style={styles.headerTop}>
            <SkeletonPlaceholder.Item style={styles.gameImage} />
            <View style={styles.headerRight}>
              <SkeletonPlaceholder.Item style={styles.gameTitle} />
              <SkeletonPlaceholder.Item style={styles.gameGenres} />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <SkeletonPlaceholder.Item style={styles.button} />
            <SkeletonPlaceholder.Item style={styles.button} />
          </View>

          <View style={styles.screenshotsRow}>
            {Array.from({ length: 3 }).map((_, idx) => (
              <View key={idx} style={styles.screenshotWrapper}>
                <SkeletonPlaceholder.Item style={styles.gameScreenshot} />
              </View>
            ))}
          </View>

          <View>
            <SkeletonPlaceholder.Item style={styles.sectionTitle} />
            <SkeletonPlaceholder.Item style={styles.summaryLine} />
            <SkeletonPlaceholder.Item style={styles.summaryLine} />
            <SkeletonPlaceholder.Item style={styles.summaryLineShort} />
          </View>

          <View>
            <SkeletonPlaceholder.Item style={styles.sectionTitle} />
            <View style={styles.horizontalList}>
              {Array.from({ length: 3 }).map((_, idx) => (
                <View key={idx} style={styles.cardWrapper}>
                  <SkeletonPlaceholder.Item style={styles.cardImage} />
                  <SkeletonPlaceholder.Item style={styles.cardText} />
                </View>
              ))}
            </View>
          </View>

          <View>
            <SkeletonPlaceholder.Item style={styles.sectionTitle} />
            {Array.from({ length: 2 }).map((_, idx) => (
              <SkeletonPlaceholder.Item key={idx} style={styles.eventItem} />
            ))}
          </View>
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};

export default GameDetailSkeleton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  mainContainer: {
    gap: 32,
    paddingVertical: 16,
  },
  headerTop: {
    flexDirection: "row",
    gap: 16,
  },
  headerRight: {
    flex: 1,
    gap: 8,
  },
  gameImage: {
    width: 124,
    height: 170,
    borderRadius: 8,
  },
  gameTitle: {
    height: 24,
    borderRadius: 4,
    width: "80%",
  },
  gameGenres: {
    height: 14,
    borderRadius: 4,
    width: "60%",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    flex: 1,
    height: 40,
    borderRadius: 8,
  },
  screenshotsRow: {
    flexDirection: "row",
    gap: 12,
  },
  screenshotWrapper: {
    flexShrink: 0,
  },
  gameScreenshot: {
    width: 300,
    height: 168,
    borderRadius: 16,
  },
  sectionTitle: {
    height: 24,
    borderRadius: 4,
    width: "40%",
    marginBottom: 8,
  },
  summaryLine: {
    height: 14,
    borderRadius: 4,
    marginBottom: 6,
    width: "100%",
  },
  summaryLineShort: {
    height: 14,
    borderRadius: 4,
    width: "70%",
  },
  horizontalList: {
    flexDirection: "row",
    gap: 12,
  },
  cardWrapper: {
    width: 92,
    alignItems: "center",
  },
  cardImage: {
    height: 146,
    width: 92,
    borderRadius: 8,
    marginBottom: 6,
  },
  cardText: {
    height: 14,
    borderRadius: 4,
    width: "100%",
  },
  eventItem: {
    height: 50,
    borderRadius: 8,
    marginBottom: 8,
  },
});
