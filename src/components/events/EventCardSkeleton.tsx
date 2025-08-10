import { StyleSheet } from "react-native";
import SkeletonPlaceholder from "expo-skeleton-placeholder";

const EventCardSkeleton = () => {
  const { image, eventName, eventDate } = styles;
  return (
    <SkeletonPlaceholder
      backgroundColor="rgba(255, 255, 255, 0.3)"
      highlightColor="rgba(255, 255, 255, 0.4)"
    >
      <SkeletonPlaceholder.Item
        style={image}
        width={image.width}
        height={image.height}
        borderRadius={image.borderRadius}
      />
      <SkeletonPlaceholder.Item
        style={eventName}
        height={20}
        borderRadius={eventName.borderRadius}
      />
      <SkeletonPlaceholder.Item
        style={eventDate}
        height={20}
        borderRadius={eventDate.borderRadius}
      />
    </SkeletonPlaceholder>
  );
};

export default EventCardSkeleton;

const styles = StyleSheet.create({
  image: {
    width: 330,
    height: 200,
    borderRadius: 24,
    marginBottom: 4,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  eventName: {
    fontSize: 16,
    marginBottom: 2,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  eventDate: {
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
});
