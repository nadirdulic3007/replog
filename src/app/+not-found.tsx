import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { FontSize, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

export default function NotFoundScreen() {
  const theme = useTheme();

  return (
    <View style={styles.box}>
      <Text style={[styles.title, { color: theme.text }]}>
        This page does not exist
      </Text>
      <Text style={[styles.message, { color: theme.muted }]}>
        The address may be wrong or the workout may have been removed.
      </Text>
      <Link
        href="/"
        replace
        style={[styles.link, { color: theme.primary }]}
      >
        Go to your workouts
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    padding: Spacing.lg,
  },
  title: {
    fontSize: FontSize.title,
    fontWeight: "700",
    textAlign: "center",
  },
  message: {
    fontSize: FontSize.body,
    textAlign: "center",
  },
  link: {
    fontSize: FontSize.body,
    fontWeight: "600",
    marginTop: Spacing.sm,
  },
});
