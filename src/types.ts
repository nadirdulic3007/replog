import type { ImageSourcePropType } from "react-native";

export type WorkoutType = "push" | "pull" | "legs" | "cardio" | "full body";

export type WorkoutSet = {
  weightKg: number;
  reps: number;
};

export type Exercise = {
  name: string;
  sets: WorkoutSet[];
};

export type Workout = {
  id: string;
  title: string;
  date: string;
  type: WorkoutType;
  durationMin: number;
  exercises: Exercise[];
  notes?: string;
  photo?: ImageSourcePropType;
};
