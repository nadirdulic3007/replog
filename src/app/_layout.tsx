import { Link, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { FontSize } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

export default function RootLayout() {
  const theme = useTheme();

  return (
    <>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.background },
          headerTintColor: theme.text,
          headerShadowVisible: false,
          headerBackButtonDisplayMode: "minimal",
          contentStyle: { backgroundColor: theme.background },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "RepLog",
            headerRight: () => (
              <Link
                href="/about"
                style={{ color: theme.primary, fontSize: FontSize.body }}
              >
                About
              </Link>
            ),
          }}
        />
        <Stack.Screen name="workout/[id]" options={{ title: "" }} />
        <Stack.Screen name="about" options={{ title: "About RepLog" }} />
        <Stack.Screen name="+not-found" options={{ title: "Not found" }} />
      </Stack>
    </>
  );
}
