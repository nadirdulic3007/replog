import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { EmptyState } from "@/components/EmptyState";
import { FilterChip } from "@/components/FilterChip";
import { SummaryRow } from "@/components/SummaryRow";
import { WorkoutCard } from "@/components/WorkoutCard";
import { FontSize, Radius, Spacing } from "@/constants/theme";
import { fetchWorkouts } from "@/data/api";
import { useTheme } from "@/hooks/use-theme";
import type { Workout, WorkoutType } from "@/types";

type Status = "loading" | "error" | "ready";
type Filter = "all" | WorkoutType;
type Sort = "newest" | "longest";

const FILTERS: Filter[] = ["all", "push", "pull", "legs", "cardio", "full body"];
const SORTS: { value: Sort; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "longest", label: "Longest" },
];

function Separator() {
  return <View style={{ height: Spacing.md }} />;
}

export default function Index() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [attempt, setAttempt] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort>("newest");

  useEffect(() => {
    let ignore = false;

    fetchWorkouts()
      .then((data) => {
        if (!ignore) {
          setWorkouts(data);
          setStatus("ready");
        }
      })
      .catch(() => {
        if (!ignore) setStatus("error");
      });

    return () => {
      ignore = true;
    };
  }, [attempt]);

  function retry() {
    setStatus("loading");
    setAttempt((a) => a + 1);
  }

  async function refresh() {
    setRefreshing(true);
    try {
      setWorkouts(await fetchWorkouts());
    } catch {
      Alert.alert("Could not refresh", "Pull down to try again.");
    } finally {
      setRefreshing(false);
    }
  }

  function confirmDelete(workout: Workout) {
    Alert.alert(
      "Delete workout?",
      `"${workout.title}" from ${workout.date} will be removed.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () =>
            setWorkouts((list) => list.filter((w) => w.id !== workout.id)),
        },
      ],
    );
  }

  const columns = width >= 900 ? 3 : width >= 600 ? 2 : 1;
  const cardWidth =
    (width - 2 * Spacing.md - (columns - 1) * Spacing.md) / columns;

  const filtered =
    filter === "all" ? workouts : workouts.filter((w) => w.type === filter);
  const visible = [...filtered].sort((a, b) =>
    sort === "newest"
      ? b.date.localeCompare(a.date)
      : b.durationMin - a.durationMin,
  );

  if (status === "loading") {
    return (
      <View style={styles.centre}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  if (status === "error") {
    return (
      <View style={styles.centre}>
        <Text style={[styles.errorText, { color: theme.text }]}>
          Could not load workouts
        </Text>
        <Pressable
          onPress={retry}
          accessibilityRole="button"
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: theme.primary },
            pressed && styles.pressed,
          ]}
        >
          <Text style={[styles.buttonText, { color: theme.onPrimary }]}>
            Try again
          </Text>
        </Pressable>
      </View>
    );
  }

  const empty =
    workouts.length === 0
      ? { title: "No workouts yet", message: "Your workouts will appear here." }
      : { title: `No ${filter} workouts`, message: "Choose another type." };

  return (
    <FlatList
      key={columns}
      data={visible}
      keyExtractor={(workout) => workout.id}
      numColumns={columns}
      columnWrapperStyle={columns > 1 ? { gap: Spacing.md } : undefined}
      renderItem={({ item }) => (
        <WorkoutCard
          workout={item}
          style={{ width: cardWidth }}
          onLongPress={() => confirmDelete(item)}
        />
      )}
      ListHeaderComponent={
        <View style={styles.header}>
          <SummaryRow workouts={workouts} />
          <View style={styles.chips}>
            {FILTERS.map((value) => (
              <FilterChip
                key={value}
                label={value === "all" ? "All" : value}
                selected={filter === value}
                onPress={() => setFilter(value)}
              />
            ))}
          </View>
          <View style={styles.chips}>
            {SORTS.map((option) => (
              <FilterChip
                key={option.value}
                label={option.label}
                selected={sort === option.value}
                onPress={() => setSort(option.value)}
              />
            ))}
          </View>
        </View>
      }
      ListHeaderComponentStyle={{ marginBottom: Spacing.md }}
      ListEmptyComponent={
        <EmptyState title={empty.title} message={empty.message} />
      }
      ItemSeparatorComponent={Separator}
      contentContainerStyle={[
        styles.content,
        { paddingBottom: Spacing.md + insets.bottom },
      ]}
      refreshing={refreshing}
      onRefresh={refresh}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    padding: Spacing.md,
  },
  header: {
    gap: Spacing.sm,
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
  centre: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.md,
    padding: Spacing.lg,
  },
  errorText: {
    fontSize: FontSize.body,
    fontWeight: "600",
  },
  button: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.md,
  },
  buttonText: {
    fontSize: FontSize.body,
    fontWeight: "600",
  },
  pressed: {
    opacity: 0.7,
  },
});
