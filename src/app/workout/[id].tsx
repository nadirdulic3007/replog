import { Stack, useLocalSearchParams, useRouter } from "expo-router";

import { EmptyState } from "@/components/EmptyState";
import { WorkoutDetails } from "@/components/WorkoutDetails";
import { getWorkout } from "@/data/api";

export default function WorkoutDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const workout = getWorkout(id);

  function backToList() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  }

  if (!workout) {
    return (
      <EmptyState
        title="Workout not found"
        message={`There is no workout with id ${id}.`}
      />
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: workout.title }} />
      <WorkoutDetails workout={workout} onBack={backToList} />
    </>
  );
}
