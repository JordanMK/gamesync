import { Platform, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useMemo } from "react";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import { FlashList } from "@shopify/flash-list";
import { Game } from "../../types/gameSchema";

type Props = {
  games: Game[];
  horizontal?: boolean;
  isLoading?: boolean;
  error?: Error | null;
  onRefresh?: () => void;
};

const StaticGameList = ({
  horizontal,
  games,
  isLoading,
  error,
  onRefresh,
}: Props) => {
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
  const skeletonData = useMemo(
    () => Array(Platform.OS === "web" ? 20 : 10).fill({}),
    [],
  );

  const renderGame = useCallback(
    ({ item }: { item: Game }) => <GameCard game={item} />,
    [],
  );
  const renderSkeleton = useCallback(() => <GameCardSkeleton />, []);
  const renderSeparator = useCallback(
    () => <View style={styles.listItemSeparator} />,
    [],
  );

  const listLayoutProps = useMemo(() => {
    if (horizontal) {
      return {
        horizontal: true,
        snapToAlignment: "start" as const,
        snapToInterval: 104,
      } as const;
    } else {
      return {
        numColumns: Platform.OS === "web" ? 9 : 3,
      } as const;
    }
  }, [horizontal]);

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
            !horizontal &&
              (Platform.OS === "web"
                ? styles.webListVerticalPadding
                : styles.listVerticalPadding),
          ]}
          ListFooterComponentStyle={styles.listFooter}
          ItemSeparatorComponent={renderSeparator}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          showsVerticalScrollIndicator={false}
          {...listLayoutProps}
        />
      ) : (
        <FlashList
          data={games}
          ListEmptyComponent={
            <Text style={styles.listEmptyText}>This list is empty</Text>
          }
          renderItem={renderGame}
          keyExtractor={(game) => game.id.toString()}
          onRefresh={onRefresh}
          style={listContainerStyle}
          ListFooterComponentStyle={styles.listFooter}
          ItemSeparatorComponent={renderSeparator}
          showsHorizontalScrollIndicator={false}
          onEndReachedThreshold={horizontal ? 0.5 : 0.1}
          bounces={false}
          contentContainerStyle={[
            listContentContainerStyle,
            !horizontal &&
              (Platform.OS === "web"
                ? styles.webListVerticalPadding
                : styles.listVerticalPadding),
          ]}
          {...listLayoutProps}
        />
      )}
    </View>
  );
};

export default StaticGameList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    marginHorizontal: -16,
    flex: 1,
  },
  webListContainer: {
    flex: 1,
  },
  listContentContainer: {
    paddingHorizontal: 16,
  },
  webListContentContainer: {
    paddingHorizontal: 32,
  },
  listVerticalPadding: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    paddingTop: 16,
  },
  webListVerticalPadding: {
    paddingHorizontal: 32,
    paddingBottom: 64,
    paddingTop: 16,
  },
  listEmptyText: {
    flex: 1,
    textAlign: "center",
    marginTop: 32,
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
