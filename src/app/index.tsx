import { ScrollView, StyleSheet, View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { SummaryRow } from "@/components/SummaryRow";
import { WorkoutCard } from "@/components/WorkoutCard";
import { Spacing } from "@/constants/theme";
import { workouts } from "@/data/workouts";

export default function Index() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const columns = width >= 900 ? 3 : width >= 600 ? 2 : 1;
  const cardWidth =
    (width - 2 * Spacing.md - (columns - 1) * Spacing.md) / columns;

  return (
    <ScrollView
      contentContainerStyle={[
        styles.content,
        { paddingBottom: Spacing.md + insets.bottom },
      ]}
    >
      <SummaryRow workouts={workouts} />

      <View style={styles.grid}>
        {workouts.map((workout) => (
          <WorkoutCard
            key={workout.id}
            workout={workout}
            style={{ width: cardWidth }}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: Spacing.md,
    gap: Spacing.md,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.md,
  },
});
