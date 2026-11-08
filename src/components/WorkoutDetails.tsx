import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

import type { Workout } from "@/types";

type Props = {
  workout: Workout;
};

export function WorkoutDetails({ workout }: Props) {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      {workout.photo ? (
        <Image source={workout.photo} style={styles.photo} />
      ) : null}

      <Text style={styles.title}>{workout.title}</Text>
      <Text>Date: {workout.date}</Text>
      <Text>Type: {workout.type}</Text>
      <Text>Duration: {workout.durationMin} min</Text>

      <Text style={styles.heading}>Exercises</Text>
      {workout.exercises.length === 0 ? (
        <Text>No exercises logged.</Text>
      ) : (
        workout.exercises.map((exercise) => (
          <View key={exercise.name} style={styles.exercise}>
            <Text style={styles.exerciseName}>{exercise.name}</Text>
            {exercise.sets.map((set, index) => (
              <Text key={index}>
                Set {index + 1}: {set.weightKg} kg × {set.reps}
              </Text>
            ))}
          </View>
        ))
      )}

      {workout.notes ? (
        <>
          <Text style={styles.heading}>Notes</Text>
          <Text>{workout.notes}</Text>
        </>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    gap: 6,
  },
  photo: {
    width: "100%",
    height: 220,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 12,
  },
  exercise: {
    gap: 2,
    marginTop: 4,
  },
  exerciseName: {
    fontWeight: "600",
  },
});
