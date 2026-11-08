import { StyleSheet, Text, View } from "react-native";

import { FontSize, Radius, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import type { Workout } from "@/types";

type Props = {
  workouts: Workout[];
};

export function SummaryRow({ workouts }: Props) {
  const theme = useTheme();

  const totalMinutes = workouts.reduce((sum, w) => sum + w.durationMin, 0);
  const totalKg = workouts.reduce(
    (sum, w) =>
      sum +
      w.exercises.reduce(
        (exerciseSum, e) =>
          exerciseSum +
          e.sets.reduce((setSum, s) => setSum + s.weightKg * s.reps, 0),
        0,
      ),
    0,
  );

  const boxes = [
    { value: String(workouts.length), label: "workouts" },
    { value: (totalMinutes / 60).toFixed(1), label: "hours" },
    { value: String(totalKg), label: "kg lifted" },
  ];

  return (
    <View style={styles.row}>
      {boxes.map((box) => (
        <View
          key={box.label}
          style={[
            styles.box,
            { backgroundColor: theme.card, borderColor: theme.border },
          ]}
        >
          <Text style={[styles.value, { color: theme.primary }]}>
            {box.value}
          </Text>
          <Text style={[styles.label, { color: theme.muted }]}>
            {box.label}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: Spacing.sm,
  },
  box: {
    flex: 1,
    alignItems: "center",
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xs,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: Radius.md,
  },
  value: {
    fontSize: FontSize.title,
    fontWeight: "700",
  },
  label: {
    fontSize: FontSize.small,
  },
});
