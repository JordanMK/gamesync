import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { Game, GameCategoryEnum } from "../../types/gameSchema";
import SkeletonPlaceholder from "expo-skeleton-placeholder";
import { useAppTheme } from "../../hooks/useAppTheme";
import { firstToUpperCase } from "../../utils";
import { useNavigation } from "@react-navigation/native";

type Props = {
  game: Game;
};

const SearchGameCard = ({ game }: Props) => {
  const { colors } = useAppTheme();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const showCategory = game.category !== GameCategoryEnum.main;
  const gameCategory = GameCategoryEnum[game.category];
  const gameGenres = game.genres.map((genre) => genre.name).join(", ");

  const navigateToGameDetails = () =>
    navigation.navigate("Main", {
      screen: "Details",
      params: { id: game.id },
    });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.gameContainer}
        onPress={navigateToGameDetails}
      >
        <View style={styles.imageWrapper}>
          {isLoading && (
            <SkeletonPlaceholder
              backgroundColor="rgba(255, 255, 255, 0.3)"
              highlightColor="rgba(255, 255, 255, 0.4)"
            >
              <SkeletonPlaceholder.Item
                style={styles.image}
                height={styles.imageWrapper.height}
                width={styles.imageWrapper.width}
              />
            </SkeletonPlaceholder>
          )}
          <Image
            source={{ uri: game.cover?.url }}
            resizeMode="cover"
            style={[
              showCategory ? styles.imageWithCategory : styles.image,
              isLoading && styles.hiddenImage,
            ]}
            onLoadEnd={() => setIsLoading(false)}
          />
          {showCategory && (
            <Text
              style={[
                styles.gameCategory,
                { backgroundColor: colors.primary + "d9" },
              ]}
            >
              {firstToUpperCase(gameCategory)}
            </Text>
          )}
        </View>
        <View style={styles.details}>
          <Text style={styles.gameName} numberOfLines={1}>
            {game.name}
          </Text>
          <Text style={{}} numberOfLines={1}>
            {gameGenres}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SearchGameCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gameContainer: {
    flexDirection: "row",
  },
  imageWrapper: {
    height: 116,
    width: 73,
    borderRadius: 8,
    marginRight: 12,
    overflow: "hidden",
  },
  image: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 8,
    height: 116,
    width: 73,
  },
  imageWithCategory: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 8,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    height: 100,
  },
  hiddenImage: {
    position: "absolute",
    opacity: 0,
  },
  details: {
    flex: 1,
    gap: 4,
    maxWidth: "70%",
  },
  gameName: {
    lineHeight: 16,
    fontSize: 14,
    fontWeight: "600",
  },
  gameCategory: {
    padding: 2,
    fontSize: 9,
    fontWeight: "500",
    width: "100%",
    textAlign: "center",
  },
});
