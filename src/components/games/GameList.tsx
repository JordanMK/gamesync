import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useMemo } from "react";
import { Title } from "../Title";
import { useGamesByIds } from "../../queries/useGame";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import { FlashList } from "@shopify/flash-list";
import { useAppTheme } from "../../hooks/useAppTheme";
import { Game } from "../../types/gameSchema";
import { useNavigation } from "@react-navigation/native";

type Props = {
  title?: string;
  horizontal?: boolean;
  gameIds?: number[];
};

const GameList = ({ title, horizontal, gameIds }: Props) => {
  const {
    data,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isLoading,
  } = useGamesByIds(gameIds || []);
  const navigation = useNavigation();

  const { colors } = useAppTheme();
  const seeAllStyle = useMemo(
    () => ({ color: colors.primary }),
    [colors.primary],
  );

  const games = useMemo(
    () => data?.pages.flatMap((page) => page.data) || [],
    [data],
  );

  const skeletonData = useMemo(() => Array(10).fill({}), []);

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
        numColumns: 3,
      } as const;
    }
  }, [horizontal]);

  const navigateToExtendedList = (title: string) =>
    navigation.navigate("Main", {
      screen: "ExtendedList",
      params: { title },
    });

  if (error) return <Text>{error.message}</Text>;

  return (
    <View>
      {title && (
        <View style={styles.listTitleContainer}>
          <Title variant="h2" style={styles.listTitle}>
            {title}
          </Title>
          <TouchableOpacity onPress={() => navigateToExtendedList(title)}>
            <Text style={seeAllStyle}>See all</Text>
          </TouchableOpacity>
        </View>
      )}

      {isLoading ? (
        <FlashList
          data={skeletonData}
          renderItem={renderSkeleton}
          style={styles.listContainer}
          contentContainerStyle={[
            styles.listContentContainer,
            !horizontal && styles.listVerticalPadding,
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
          renderItem={renderGame}
          ListFooterComponent={isFetchingNextPage ? <GameCardSkeleton /> : null}
          keyExtractor={(game) => game.id.toString()}
          style={styles.listContainer}
          ListFooterComponentStyle={styles.listFooter}
          ItemSeparatorComponent={renderSeparator}
          showsHorizontalScrollIndicator={false}
          onEndReachedThreshold={horizontal ? 0.5 : 0.1}
          bounces={false}
          contentContainerStyle={[
            styles.listContentContainer,
            !horizontal && styles.listVerticalPadding,
          ]}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          {...listLayoutProps}
        />
      )}
    </View>
  );
};

export default GameList;

const styles = StyleSheet.create({
  listContainer: {
    marginHorizontal: -16,
  },
  listContentContainer: {
    paddingHorizontal: 16,
  },
  listVerticalPadding: {
    paddingBottom: 32,
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
    height: 12,
  },
  listTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
