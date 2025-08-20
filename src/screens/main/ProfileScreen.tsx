import { Image, Platform, StyleSheet, Text, View } from "react-native";
import { useUser } from "../../queries/useUser";
import { useGameLists } from "../../queries/useGameLists";
import useAuthStore from "../../stores/authStore";
import Button from "../../components/Button";
import { useThemeStore } from "../../stores/themeStore";

const ProfileScreen = () => {
  const { data: user, isLoading, error } = useUser();
  const { data: gameLists, isLoading: gameListsLoading } = useGameLists();
  const signOut = useAuthStore((s) => s.signOut);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const containerStyle =
    Platform.OS === "web" ? styles.webContainer : styles.container;

  if (isLoading || error || !user || gameListsLoading || !gameLists) {
    return (
      <View>
        <Text>userLoading: {isLoading.toString()}</Text>
        <Text>userError: {error?.message}</Text>
      </View>
    );
  }

  return (
    <View style={containerStyle}>
      <View style={styles.detailsContainer}>
        <Image
          source={{
            uri: `https://api.dicebear.com/9.x/bottts/png?seed=${user.username}`,
          }}
          alt="avatar"
          style={styles.image}
        />
        <View style={styles.details}>
          <Text style={styles.username}>{user.username}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
      </View>
      <View style={styles.buttons}>
        <Button label="Change theme" onPress={toggleTheme} />
        <Button label="Sign out" onPress={signOut} />
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  webContainer: {
    flex: 1,
    paddingHorizontal: 32,
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  details: {},
  image: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 100,
    width: 130,
    height: 130,
    marginRight: 24,
  },
  buttons: {
    gap: 12,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
  },
  email: {
    fontSize: 16,
  },
});
