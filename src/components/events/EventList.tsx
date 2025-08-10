import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useMemo } from "react";
import useEvents from "../../queries/useEvents";
import EventCard from "./EventCard";
import { Title } from "../Title";
import EventCardSkeleton from "./EventCardSkeleton";
import { FlashList } from "@shopify/flash-list";
import { useAppTheme } from "../../hooks/useAppTheme";
import { Event } from "../../types/eventSchema";
import { useNavigation } from "@react-navigation/native";

type Props = {
  title?: string;
};

const EventList = ({ title }: Props) => {
  const {
    data,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isLoading,
  } = useEvents();
  const navigation = useNavigation();

  const events = useMemo(
    () => data?.pages.flatMap((page) => page.data) || [],
    [data],
  );

  const skeletonData = useMemo(() => Array(10).fill({}), []);

  const { colors } = useAppTheme();
  const seeAllStyle = useMemo(
    () => ({ color: colors.primary }),
    [colors.primary],
  );

  const renderEvent = useCallback(
    ({ item }: { item: Event }) => (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Main", {
            screen: "ExtendedList",
            params: { title: item.name, gameIds: item.games },
          });
        }}
      >
        <EventCard event={item} />
      </TouchableOpacity>
    ),
    [navigation],
  );

  const renderSkeleton = useCallback(() => <EventCardSkeleton />, []);

  const renderSeparator = useCallback(
    () => <View style={styles.listItemSeparator} />,
    [],
  );

  if (error) return <Text>{error.message}</Text>;

  return (
    <View>
      {title && (
        <View style={styles.listTitleContainer}>
          <Title variant="h2" style={styles.listTitle}>
            {title}
          </Title>
          <TouchableOpacity>
            <Text style={seeAllStyle}>See all</Text>
          </TouchableOpacity>
        </View>
      )}
      {isLoading ? (
        <FlashList
          data={skeletonData}
          renderItem={renderSkeleton}
          horizontal
          style={styles.listContainer}
          contentContainerStyle={styles.listContentContainer}
          snapToAlignment="start"
          snapToInterval={342}
          ItemSeparatorComponent={renderSeparator}
          bounces={false}
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <FlashList
          data={events}
          renderItem={renderEvent}
          ListFooterComponent={
            isFetchingNextPage ? <EventCardSkeleton /> : null
          }
          keyExtractor={(event) => event.id.toString()}
          horizontal
          snapToAlignment="start"
          snapToInterval={342}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          style={styles.listContainer}
          contentContainerStyle={styles.listContentContainer}
          bounces={false}
          ListFooterComponentStyle={styles.listFooter}
          ItemSeparatorComponent={renderSeparator}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default EventList;

const styles = StyleSheet.create({
  listContainer: {
    marginHorizontal: -16,
  },
  listContentContainer: {
    paddingHorizontal: 16,
  },
  listTitle: {
    marginBottom: 12,
  },
  listFooter: {
    marginStart: 12,
  },
  listItemSeparator: {
    width: 12,
  },
  listTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
