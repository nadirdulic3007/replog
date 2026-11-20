import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { FontSize, Radius, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import type { Workout } from "@/types";
import { formatDate } from "@/utils/format";

type Props = {
  workout: Workout;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  onLongPress?: () => void;
};

export function WorkoutCard({ workout, style, onPress, onLongPress }: Props) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      accessibilityRole="button"
      accessibilityLabel={`${workout.title}, ${formatDate(workout.date)}, ${workout.durationMin} minutes, ${workout.type}, ${workout.exercises.length} exercises`}
      accessibilityHint="Opens the workout. Long press to delete."
      android_ripple={{ color: theme.border }}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: theme.card, borderColor: theme.border },
        pressed && styles.pressed,
        style,
      ]}
    >
      {workout.photo ? (
        <View style={styles.photoFrame}>
          <Image source={workout.photo} style={styles.photo} />
          <Text
            style={[
              styles.badge,
              { backgroundColor: theme.primary, color: theme.onPrimary },
            ]}
          >
            {workout.type}
          </Text>
        </View>
      ) : null}
      <View style={styles.body}>
        <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>
          {workout.title}
        </Text>
        <Text style={[styles.details, { color: theme.muted }]}>
          {formatDate(workout.date)} · {workout.durationMin} min ·{" "}
          {workout.exercises.length} exercises
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: Radius.md,
    overflow: "hidden",
  },
  pressed: {
    opacity: 0.7,
  },
  photoFrame: {
    width: "100%",
    aspectRatio: 16 / 9,
  },
  photo: {
    width: "100%",
    height: "100%",
  },
  badge: {
    position: "absolute",
    top: Spacing.sm,
    right: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.pill,
    overflow: "hidden",
    fontSize: FontSize.small,
    fontWeight: "600",
  },
  body: {
    padding: Spacing.md,
    gap: Spacing.xs,
  },
  title: {
    fontSize: FontSize.title,
    fontWeight: "700",
  },
  details: {
    fontSize: FontSize.small,
  },
});
