import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useMemo } from "react";
import EventCard from "./EventCard";
import { Title } from "../Title";
import EventCardSkeleton from "./EventCardSkeleton";
import { FlashList } from "@shopify/flash-list";
import { Event } from "../../types/eventSchema";
import { useNavigation } from "@react-navigation/native";
import { Query } from "../../services/IGDBService";
import { useEvents } from "../../queries/useEvents";

type Props = {
  title?: string;
  query: Query;
};

const EventList = ({ title, query }: Props) => {
  const {
    data,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isLoading,
  } = useEvents(query);
  const navigation = useNavigation();
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

  const events = useMemo(
    () => data?.pages.flatMap((page) => page.data) || [],
    [data],
  );

  const skeletonData = useMemo(
    () => Array(Platform.OS === "web" ? 20 : 10).fill({}),
    [],
  );
  const renderEvent = useCallback(
    ({ item }: { item: Event }) => (
      <TouchableOpacity
        disabled={!item.games.length}
        onPress={() => {
          navigation.navigate("Main", {
            screen: "ExtendedList",
            params: {
              title: item.name,
              query: {
                where: [`id = (${item.games.join(",")});`],
              },
            },
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
  if (events.length === 0 && !isLoading) return;

  return (
    <View>
      {title && (
        <View>
          <Title variant="h2" style={styles.listTitle}>
            {title}
          </Title>
        </View>
      )}
      {isLoading ? (
        <FlashList
          data={skeletonData}
          renderItem={renderSkeleton}
          horizontal
          style={listContainerStyle}
          contentContainerStyle={listContentContainerStyle}
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
          ListEmptyComponent={
            <View style={styles.listEmptyContainer}>
              <Text>This list is empty</Text>
            </View>
          }
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          style={listContainerStyle}
          contentContainerStyle={listContentContainerStyle}
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
  webListContainer: {
    marginHorizontal: -64,
  },
  listContentContainer: {
    paddingHorizontal: 16,
  },
  webListContentContainer: {
    paddingHorizontal: 64,
  },
  listEmptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
});
