import React from "react";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";

import { ShipporiMincho_400Regular } from "@expo-google-fonts/shippori-mincho";
import { Handlee_400Regular } from "@expo-google-fonts/handlee";
import { setStatusBarStyle, StatusBar } from "expo-status-bar";
import { setupDatabase } from "@/database";
import * as SystemUI from "expo-system-ui";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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
    setTimeout(() => {
      setStatusBarStyle("dark");
      SystemUI.setBackgroundColorAsync("transparent");
    }, 0);
  }, []);

  useEffect(() => {
    const initializeApp = async () => {
      await setupDatabase();
    };
    initializeApp();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <StatusBar translucent={true} />
      <Stack
        initialRouteName="notes"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#D8D4C8" },
          presentation: "transparentModal",
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="user" />
        <Stack.Screen name="notes" />
        <Stack.Screen name="notes/create" />
        <Stack.Screen name="notes/calender" />
        <Stack.Screen name="notes/stats" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="+not-found" />
      </Stack>
    </>
  );
}
