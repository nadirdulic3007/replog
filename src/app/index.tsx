import { ScrollView, StyleSheet, Text } from "react-native";

import { WorkoutCard } from "@/components/WorkoutCard";
import { workouts } from "@/data/workouts";

export default function Index() {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text>{workouts.length} workouts</Text>

      {workouts.map((workout) => (
        <WorkoutCard key={workout.id} workout={workout} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    gap: 12,
  },
});
