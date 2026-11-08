import type { Workout } from "@/types";

export const workouts: Workout[] = [
  {
    id: "w6",
    title: "Push day",
    date: "2026-11-06",
    type: "push",
    durationMin: 62,
    exercises: [
      {
        name: "Bench press",
        sets: [
          { weightKg: 60, reps: 8 },
          { weightKg: 65, reps: 6 },
          { weightKg: 65, reps: 6 },
        ],
      },
      {
        name: "Overhead press",
        sets: [
          { weightKg: 35, reps: 8 },
          { weightKg: 35, reps: 7 },
        ],
      },
    ],
    notes: "Felt strong, added 5 kg on the bench.",
    photo: require("@/assets/images/workouts/bench-press.jpg"),
  },
  {
    id: "w5",
    title: "Leg day",
    date: "2026-11-04",
    type: "legs",
    durationMin: 75,
    exercises: [
      {
        name: "Squat",
        sets: [
          { weightKg: 80, reps: 8 },
          { weightKg: 85, reps: 6 },
          { weightKg: 85, reps: 6 },
        ],
      },
      {
        name: "Romanian deadlift",
        sets: [
          { weightKg: 70, reps: 10 },
          { weightKg: 70, reps: 10 },
        ],
      },
    ],
    photo: require("@/assets/images/workouts/squat.jpg"),
  },
  {
    id: "w4",
    title: "Pull day",
    date: "2026-11-02",
    type: "pull",
    durationMin: 58,
    exercises: [
      {
        name: "Pull-ups",
        sets: [
          { weightKg: 0, reps: 8 },
          { weightKg: 0, reps: 7 },
          { weightKg: 0, reps: 6 },
        ],
      },
      {
        name: "Barbell row",
        sets: [
          { weightKg: 55, reps: 8 },
          { weightKg: 55, reps: 8 },
        ],
      },
    ],
    notes: "Grip gave out on the last pull-up set.",
    photo: require("@/assets/images/workouts/pull-ups.jpg"),
  },
  {
    id: "w3",
    title: "Easy run",
    date: "2026-10-31",
    type: "cardio",
    durationMin: 35,
    exercises: [],
    notes: "5 km, easy pace.",
    photo: require("@/assets/images/workouts/running.jpg"),
  },
  {
    id: "w2",
    title: "Push day",
    date: "2026-10-29",
    type: "push",
    durationMin: 60,
    exercises: [
      {
        name: "Bench press",
        sets: [
          { weightKg: 55, reps: 8 },
          { weightKg: 60, reps: 6 },
          { weightKg: 60, reps: 6 },
        ],
      },
      {
        name: "Dips",
        sets: [
          { weightKg: 0, reps: 10 },
          { weightKg: 0, reps: 9 },
        ],
      },
    ],
    photo: require("@/assets/images/workouts/dips.jpg"),
  },
  {
    id: "w1",
    title: "Full body",
    date: "2026-10-27",
    type: "full body",
    durationMin: 70,
    exercises: [
      {
        name: "Deadlift",
        sets: [
          { weightKg: 90, reps: 5 },
          { weightKg: 100, reps: 3 },
        ],
      },
      {
        name: "Push-ups",
        sets: [
          { weightKg: 0, reps: 20 },
          { weightKg: 0, reps: 18 },
        ],
      },
    ],
    photo: require("@/assets/images/workouts/deadlift.jpg"),
  },
];
