import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

import { FontSize, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import type { Workout } from "@/types";

type Props = {
  workout: Workout;
};

export function WorkoutDetails({ workout }: Props) {
  const theme = useTheme();

  const rows = [
    { label: "Date", value: workout.date },
    { label: "Type", value: workout.type },
    { label: "Duration", value: `${workout.durationMin} min` },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.content}>
        {workout.photo ? (
          <View style={styles.photoFrame}>
            <Image source={workout.photo} style={styles.photo} />
          </View>
        ) : null}

        <Text style={[styles.title, { color: theme.text }]}>
          {workout.title}
        </Text>

        {rows.map((row) => (
          <View
            key={row.label}
            style={[styles.row, { borderColor: theme.border }]}
          >
            <Text style={[styles.label, { color: theme.muted }]}>
              {row.label}
            </Text>
            <Text style={[styles.value, { color: theme.text }]}>
              {row.value}
            </Text>
          </View>
        ))}

        <Text style={[styles.heading, { color: theme.text }]}>Exercises</Text>
        {workout.exercises.length === 0 ? (
          <Text style={{ color: theme.muted }}>No exercises logged.</Text>
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
                  <Text style={[styles.label, { color: theme.muted }]}>
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

        {workout.notes ? (
          <>
            <Text style={[styles.heading, { color: theme.text }]}>Notes</Text>
            <Text style={[styles.notes, { color: theme.text }]}>
              {workout.notes}
            </Text>
          </>
        ) : null}
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: Spacing.md,
    paddingVertical: Spacing.xs,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  label: {
    fontSize: FontSize.body,
  },
  value: {
    flexShrink: 1,
    fontSize: FontSize.body,
    textAlign: "right",
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
  notes: {
    fontSize: FontSize.body,
  },
});
