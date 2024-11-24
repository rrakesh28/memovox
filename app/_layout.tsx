import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";

import { useColorScheme } from "@/hooks/useColorScheme";
import { ShipporiMincho_400Regular } from "@expo-google-fonts/shippori-mincho";
import { Handlee_400Regular } from "@expo-google-fonts/handlee";
import * as SQLite from "expo-sqlite";
import * as SystemUI from "expo-system-ui";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    ShipporiMincho_400Regular,
    Handlee_400Regular,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    const setupDatabase = async () => {
      const db = await SQLite.openDatabaseAsync("databaseName.db");

      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS notes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          notes TEXT,
          created_at TEXT,
          updated_at TEXT
        );
      `);
    };

    const setBackgroundColor = async () => {
      await SystemUI.setBackgroundColorAsync("#D8D4C8");
    };

    setupDatabase();
    setBackgroundColor();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <Stack
      initialRouteName="notes"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#D8D4C8" },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="user" />
      <Stack.Screen name="notes" />
      <Stack.Screen name="notes/create" />
      <Stack.Screen name="notes/calender" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
