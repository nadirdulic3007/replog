import { ScrollView, StyleSheet, Text } from "react-native";

import { FontSize, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

export default function AboutScreen() {
  const theme = useTheme();

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={[styles.title, { color: theme.text }]}>RepLog</Text>
      <Text style={[styles.text, { color: theme.text }]}>
        RepLog is a personal workout log. Each session is saved with its
        exercises, sets and an optional progress photo, so you can look back
        and see how your training changes over time.
      </Text>
      <Text style={[styles.text, { color: theme.muted }]}>
        Semester project for IT 3003 Cross-Platform Development.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  title: {
    fontSize: FontSize.hero,
    fontWeight: "700",
  },
  text: {
    fontSize: FontSize.body,
    lineHeight: 24,
  },
});
