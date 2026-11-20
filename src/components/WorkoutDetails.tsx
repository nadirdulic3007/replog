import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { FontSize, Radius, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import type { Workout } from "@/types";
import { formatDate } from "@/utils/format";

type Props = {
  workout: Workout;
  onBack: () => void;
};

export function WorkoutDetails({ workout, onBack }: Props) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const stats = [
    { value: `${workout.durationMin} min`, label: "duration" },
    { value: workout.type, label: "type" },
    { value: formatDate(workout.date), label: "date" },
  ];

  return (
    <ScrollView
      contentContainerStyle={[
        styles.scroll,
        { paddingBottom: Spacing.lg + insets.bottom },
      ]}
    >
      <View style={styles.content}>
        {workout.photo ? (
          <View style={styles.photoFrame}>
            <Image source={workout.photo} style={styles.photo} />
          </View>
        ) : null}

        <Text style={[styles.title, { color: theme.text }]}>
          {workout.title}
        </Text>

        <View style={styles.stats}>
          {stats.map((stat) => (
            <View
              key={stat.label}
              style={[
                styles.stat,
                { backgroundColor: theme.card, borderColor: theme.border },
              ]}
            >
              <Text style={[styles.statValue, { color: theme.primary }]}>
                {stat.value}
              </Text>
              <Text style={[styles.statLabel, { color: theme.muted }]}>
                {stat.label}
              </Text>
            </View>
          ))}
        </View>

        <Text style={[styles.heading, { color: theme.text }]}>Exercises</Text>
        {workout.exercises.length === 0 ? (
          <Text style={[styles.body, { color: theme.muted }]}>
            No exercises logged.
          </Text>
        ) : (
          workout.exercises.map((exercise) => (
            <View key={exercise.name} style={styles.exercise}>
              <Text style={[styles.exerciseName, { color: theme.text }]}>
                {exercise.name}
              </Text>
              {exercise.sets.map((set, index) => (
                <View
                  key={index}
                  style={[styles.row, { borderColor: theme.border }]}
                >
                  <Text style={[styles.body, { color: theme.muted }]}>
                    Set {index + 1}
                  </Text>
                  <Text style={[styles.value, { color: theme.text }]}>
                    {set.weightKg} kg × {set.reps}
                  </Text>
                </View>
              ))}
            </View>
          ))
        )}

        <Text style={[styles.heading, { color: theme.text }]}>Notes</Text>
        <Text
          style={[
            styles.body,
            { color: workout.notes ? theme.text : theme.muted },
          ]}
        >
          {workout.notes ?? "No notes for this workout."}
        </Text>

        <Pressable
          onPress={onBack}
          accessibilityRole="button"
          style={({ pressed }) => [
            styles.button,
            { borderColor: theme.primary },
            pressed && styles.pressed,
          ]}
        >
          <Text style={[styles.buttonText, { color: theme.primary }]}>
            Back to the list
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    padding: Spacing.md,
  },
  content: {
    width: "100%",
    maxWidth: 600,
    alignSelf: "center",
    gap: Spacing.sm,
  },
  photoFrame: {
    width: "100%",
    aspectRatio: 16 / 9,
    marginBottom: Spacing.sm,
  },
  photo: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: FontSize.hero,
    fontWeight: "700",
  },
  stats: {
    flexDirection: "row",
    gap: Spacing.sm,
  },
  stat: {
    flex: 1,
    alignItems: "center",
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xs,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: Radius.md,
  },
  statValue: {
    fontSize: FontSize.body,
    fontWeight: "700",
    textAlign: "center",
  },
  statLabel: {
    fontSize: FontSize.small,
  },
  heading: {
    fontSize: FontSize.title,
    fontWeight: "700",
    marginTop: Spacing.md,
  },
  exercise: {
    gap: Spacing.xs,
  },
  exerciseName: {
    fontSize: FontSize.body,
    fontWeight: "600",
    marginTop: Spacing.sm,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: Spacing.md,
    paddingVertical: Spacing.xs,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  body: {
    fontSize: FontSize.body,
  },
  value: {
    flexShrink: 1,
    fontSize: FontSize.body,
    textAlign: "right",
  },
  button: {
    marginTop: Spacing.lg,
    alignItems: "center",
    paddingVertical: Spacing.sm,
    borderWidth: 1,
    borderRadius: Radius.pill,
  },
  buttonText: {
    fontSize: FontSize.body,
    fontWeight: "600",
  },
  pressed: {
    opacity: 0.7,
  },
});
