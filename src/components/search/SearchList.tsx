import { Platform, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useMemo } from "react";
import SearchGameCard from "./SearchGameCard";
import { Query } from "../../services/IGDBService";
import { useGames } from "../../queries/useGames";
import { useNavigation } from "@react-navigation/native";
import { useAppTheme } from "../../hooks/useAppTheme";
import { Game } from "../../types/gameSchema";
import GameCardSkeleton from "../games/GameCardSkeleton";
import { FlashList } from "@shopify/flash-list";

type Props = {
  query: Query;
};

const SearchList = ({ query }: Props) => {
  const {
    data,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isLoading,
  } = useGames(query);
  const navigation = useNavigation();
  const { colors } = useAppTheme();
  const listContainerStyle = useMemo(
    () =>
      Platform.OS === "web" ? styles.webListContainer : styles.listContainer,
    [],
  );

  const listContentContainerStyle = useMemo(
    () =>
      Platform.OS === "web"
        ? styles.webListContentContainer
        : styles.listContentContainer,
    [],
  );

  const games = useMemo(
    () => data?.pages.flatMap((page) => page.data) || [],
    [data],
  );

  const skeletonData = useMemo(
    () => Array(Platform.OS === "web" ? 20 : 10).fill({}),
    [],
  );

  const renderGame = useCallback(
    ({ item }: { item: Game }) => <SearchGameCard game={item} />,
    [],
  );
  const renderSkeleton = useCallback(() => <GameCardSkeleton />, []);
  const renderSeparator = useCallback(
    () => <View style={styles.listItemSeparator} />,
    [],
  );

  if (error) return <Text>{error.message}</Text>;

  return (
    <View style={styles.container}>
      {isLoading ? (
        <FlashList
          data={skeletonData}
          renderItem={renderSkeleton}
          style={listContainerStyle}
          contentContainerStyle={[
            listContentContainerStyle,
            Platform.OS === "web"
              ? styles.webListContentContainer
              : styles.listContentContainer,
          ]}
          ListFooterComponentStyle={styles.listFooter}
          ItemSeparatorComponent={renderSeparator}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <FlashList
          data={games}
          renderItem={renderGame}
          ListFooterComponent={
            hasNextPage && isFetchingNextPage ? <GameCardSkeleton /> : null
          }
          keyExtractor={(game) => game.id.toString()}
          style={listContainerStyle}
          ListFooterComponentStyle={styles.listFooter}
          ItemSeparatorComponent={renderSeparator}
          showsHorizontalScrollIndicator={false}
          onEndReachedThreshold={0.1}
          bounces={false}
          contentContainerStyle={[
            listContentContainerStyle,
            Platform.OS === "web"
              ? styles.webListContentContainer
              : styles.listContentContainer,
          ]}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
        />
      )}
    </View>
  );
};

export default SearchList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    marginHorizontal: -16,
  },
  webListContainer: {
    marginHorizontal: -64,
  },
  listContentContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 62,
  },
  webListContentContainer: {
    paddingHorizontal: 32,
    paddingTop: 16,
    paddingBottom: 64,
  },
  listTitle: {
    marginBottom: 12,
  },
  listFooter: {
    marginStart: 12,
    alignSelf: "flex-start",
  },
  listItemSeparator: {
    width: 12,
    height: 16,
  },
  listTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
