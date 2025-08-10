import { Image, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { Game } from "../../types/gameSchema";
import SkeletonPlaceholder from "expo-skeleton-placeholder";

type Props = {
  game: Game;
};

const GameCard = ({ game }: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        {isLoading && (
          <SkeletonPlaceholder
            backgroundColor="rgba(255, 255, 255, 0.3)"
            highlightColor="rgba(255, 255, 255, 0.4)"
          >
            <SkeletonPlaceholder.Item
              style={styles.image}
              height={styles.imageWrapper.height}
              width={styles.container.width}
            />
          </SkeletonPlaceholder>
        )}
        <Image
          source={{ uri: game.cover?.url }}
          resizeMode="cover"
          style={[styles.image, isLoading && styles.hiddenImage]}
          onLoadEnd={() => setIsLoading(false)}
        />
      </View>
      <Text style={styles.gameName} numberOfLines={2}>
        {game.name}
      </Text>
    </View>
  );
};

export default GameCard;

const styles = StyleSheet.create({
  container: {
    width: 92,
    alignSelf: "center",
  },
  imageWrapper: {
    height: 146,
    borderRadius: 8,
    marginBottom: 4,
    overflow: "hidden",
  },
  image: {
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 8,
  },
  hiddenImage: {
    position: "absolute",
    opacity: 0,
  },
  gameName: {
    marginBottom: 2,
    height: 36,
  },
});
