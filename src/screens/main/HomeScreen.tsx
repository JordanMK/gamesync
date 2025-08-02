import { StyleSheet, Text, View } from "react-native";
import useAuthStore from "../../stores/authStore";

const HomeScreen = () => {
  const signOut = useAuthStore((s) => s.signOut);

  return (
    <View>
      <Text>Home</Text>
      <Text onPress={signOut}>Sign out</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
