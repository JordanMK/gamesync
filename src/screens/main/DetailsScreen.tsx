import { StaticScreenProps } from "@react-navigation/native";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Title } from "../../components/Title";
import { FlashList } from "@shopify/flash-list";
import GameList from "../../components/games/GameList";
import EventList from "../../components/events/EventList";
import { useGame } from "../../queries/useGames";
import Button from "../../components/Button";
import {
  useAddGameToList,
  useGameLists,
  useRemoveGameFromList,
} from "../../queries/useGameLists";
import BottomSheetModal, {
  BottomSheetModalRef,
} from "../../components/BottomSheetModal";
import { useRef, useState } from "react";
import ToggleButton from "../../components/ToggleButton";
import Icon from "../../components/Icon";
import GameDetailSkeleton from "../../components/games/GameDetailSkeleton";

type Props = StaticScreenProps<{
  id: number;
}>;

const DetailsScreen = ({ route }: Props) => {
  const { data: game, isLoading, error } = useGame(route.params.id);

  const {
    data: gameLists,
    isLoading: gameListsLoading,
    error: gameListsError,
  } = useGameLists();

  const { mutate, isPending, error: mutateError } = useAddGameToList();
  const { mutate: removeMutate, error: removeMutateError } =
    useRemoveGameFromList();

  const bottomSheetRef = useRef<BottomSheetModalRef>(null);
  const [selectedList, setSelectedList] = useState<number | null>(null);
  const containerStyle =
    Platform.OS === "web" ? styles.webContainer : styles.container;

  if (isLoading || gameListsLoading) {
    return <GameDetailSkeleton />;
  }

  if (error || gameListsError) {
    if (error) {
      return (
        <View>
          <Text>gameError: {error.message}</Text>
        </View>
      );
    } else if (gameListsError) {
      return (
        <View>
          <Text>gameListError: {gameListsError.message}</Text>
        </View>
      );
    }

    return (
      <View>
        <Text>"Something went wrong"</Text>
      </View>
    );
  }

  if (!game || !gameLists) {
    if (!game) {
      return (
        <View>
          <Text>No game data</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text>No list data</Text>
        </View>
      );
    }
  }

  const gameGenres = game.genres.map((genre) => genre.name).join(", ");
  const gamePlatforms = game.platforms
    .map((platform) => platform.alternativeName ?? platform.name)
    .join(", ");
  const listWithGame = gameLists.find((list) =>
    list.games.find((g) => g.id === game.id),
  );

  gameLists.sort((a, b) => a.id - b.id);

  const openBottomSheet = () => {
    if (listWithGame) {
      setSelectedList(listWithGame.id);
    }
    bottomSheetRef.current?.present();
  };

  const handleAddToList = () => {
    const playingList = gameLists.find((list) => list.id === selectedList);
    if (listWithGame) {
      handleRemoveFromList();
    }
    mutate({ id: playingList!.id, game });
    if (!mutateError) {
      bottomSheetRef.current?.close();
    }
  };

  const handleRemoveFromList = () => {
    removeMutate({ id: listWithGame!.id, game });
    if (removeMutateError) {
      console.log(mutateError);
    }
  };

  return (
    <ScrollView style={containerStyle}>
      <View style={styles.mainContainer}>
        <View style={styles.headerTop}>
          <Image source={{ uri: game.cover?.url }} style={styles.gameImage} />
          <View style={styles.headerRight}>
            <Title variant="h2" style={styles.gameTitle} numberOfLines={3}>
              {game.name}
            </Title>
            <Text>{gameGenres}</Text>
            <Text>{gamePlatforms}</Text>
          </View>
        </View>
        {listWithGame ? (
          <View style={styles.buttonContainer}>
            <Button
              label="Remove from list"
              onPress={handleRemoveFromList}
              containerStyle={styles.outlinedButton}
              backgroundColor="transparent"
            />
            <Button
              label={listWithGame.name}
              onPress={openBottomSheet}
              containerStyle={styles.button}
            />
          </View>
        ) : (
          <>
            {isPending && <Text>Loading...</Text>}
            <Button label="Add to list" onPress={openBottomSheet} />
            {mutateError && <Text>{mutateError.message}</Text>}
          </>
        )}
        <View>
          <FlashList
            data={game.screenshots}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item.url }}
                resizeMode="stretch"
                style={styles.gameScreenshot}
              />
            )}
            style={styles.screenshots}
            contentContainerStyle={styles.screenshotListContainer}
            ItemSeparatorComponent={() => (
              <View style={styles.screenshotListSeperator} />
            )}
            showsHorizontalScrollIndicator={false}
            snapToAlignment="start"
            snapToInterval={
              styles.gameScreenshot.width + styles.screenshotListSeperator.width
            }
            horizontal
          />
        </View>
        <View style={styles.summaryContainer}>
          <Title variant="h2">Summary</Title>
          <Text>{game.summary}</Text>
        </View>
        {game.similarGames.length > 0 && (
          <View>
            <GameList
              title="Similar games"
              horizontal
              query={{ where: [`id = (${game.similarGames.join(",")});`] }}
            />
          </View>
        )}
        <View style={{ marginBottom: 40 }}>
          <EventList
            title="Events featured in"
            query={{
              where: [`games = (${game.id});`],
              sort: { field: "start_time", order: "desc" },
            }}
          />
        </View>
      </View>
      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={["60%", "80%"]}
        onChange={(index) => {
          const isClosed = index === -1;
          if (isClosed) {
            setSelectedList(null);
          }
        }}
      >
        <View style={styles.bottomSheetContainer}>
          <Title style={styles.bottomSheetTitle} variant="h3">
            Add to list
          </Title>
          {gameLists.map((list) => (
            <ToggleButton
              key={list.id}
              label={list.name}
              leadingIcon={<Icon name="plus" />}
              isActive={selectedList === list.id}
              onPress={() => {
                if (selectedList === list.id) {
                  setSelectedList(null);
                } else {
                  setSelectedList(list.id);
                }
              }}
            />
          ))}
          <Button
            label="Save"
            onPress={handleAddToList}
            disabled={!selectedList}
          />
        </View>
      </BottomSheetModal>
    </ScrollView>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  webContainer: {
    flex: 1,
    paddingHorizontal: 32,
  },
  headerTop: {
    flexDirection: "row",
    gap: 16,
  },
  headerRight: {
    flex: 1,
    gap: 8,
  },
  mainContainer: {
    gap: 32,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    flex: 1,
  },
  bottomSheetContainer: {
    width: "100%",
    gap: 20,
  },
  bottomSheetTitle: {
    textAlign: "center",
  },
  outlinedButton: {
    borderWidth: 1,
    width: "50%",
  },
  gameImage: {
    width: 124,
    height: 170,
    borderRadius: 8,
  },
  gameTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  screenshots: {
    marginHorizontal: -16,
    flex: 1,
  },
  screenshotListContainer: {
    paddingHorizontal: 16,
  },
  screenshotListSeperator: {
    width: 12,
  },
  gameScreenshot: {
    width: 300,
    height: 168,
    borderRadius: 16,
  },
  summaryContainer: {
    gap: 8,
  },
});
