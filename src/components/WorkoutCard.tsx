import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import type { Workout } from "@/types";

type Props = {
  workout: Workout;
};

export function WorkoutCard({ workout }: Props) {
  return (
    <Pressable
      onPress={() => console.log("Open", workout.id)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      {workout.photo ? (
        <Image source={workout.photo} style={styles.photo} />
      ) : null}
      <View style={styles.body}>
        <Text style={styles.title}>{workout.title}</Text>
        <Text>
          {workout.date} · {workout.durationMin} min · {workout.type}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    overflow: "hidden",
  },
  pressed: {
    opacity: 0.7,
  },
  photo: {
    width: "100%",
    height: 160,
  },
  body: {
    padding: 12,
    gap: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
