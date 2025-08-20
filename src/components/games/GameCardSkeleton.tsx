import { StyleSheet, View } from "react-native";
import SkeletonPlaceholder from "expo-skeleton-placeholder";

const GameCardSkeleton = () => {
  return (
    <View style={styles.container}>
      <SkeletonPlaceholder
        backgroundColor="rgba(255, 255, 255, 0.3)"
        highlightColor="rgba(255, 255, 255, 0.4)"
      >
        <SkeletonPlaceholder.Item style={styles.image} />
        <View style={{ marginBottom: 2 }}>
          <SkeletonPlaceholder.Item style={styles.gameName} />
        </View>
        <SkeletonPlaceholder.Item style={styles.gameName} />
      </SkeletonPlaceholder>
    </View>
  );
};

export default GameCardSkeleton;

const styles = StyleSheet.create({
  container: {
    width: 92,
    alignSelf: "center",
  },
  image: {
    height: 146,
    borderRadius: 8,
    marginBottom: 6,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  gameName: {
    minHeight: 15,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
});
