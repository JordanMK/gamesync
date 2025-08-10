import { Image, StyleSheet, Text, View } from "react-native";
import { Event } from "../../types/eventSchema";

type Props = {
  event: Event;
};

const EventCard = ({ event }: Props) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: event.eventLogo?.url }}
        resizeMode="cover"
        style={styles.image}
      />
      <Text numberOfLines={1} style={styles.eventName}>
        {event.name}
      </Text>
      <Text style={styles.eventDate}>{event.startTime?.toLocaleString()}</Text>
    </View>
  );
};

export default EventCard;

const styles = StyleSheet.create({
  container: {
    width: 330,
  },
  image: {
    height: 200,
    borderRadius: 14,
    marginBottom: 4,
  },
  eventName: {
    fontSize: 16,
    marginBottom: 2,
  },
  eventDate: {
    color: "#3e515b",
  },
});
