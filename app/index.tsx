import { Image, StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import * as SecureStore from 'expo-secure-store';

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    const navigateUser = async () => {
      try {
        // Wait for the results of SecureStore.getItem
        const introCompleted = await SecureStore.getItemAsync("intro_completed");
        const userName = await SecureStore.getItemAsync("userName");

        if (introCompleted !== "true") {
          // If intro is not completed, navigate to welcome
          router.replace("/welcome");
          return;
        }

        if (!userName) {
          // If userName is not set, navigate to user setup page
          router.replace("/user");
          return;
        }

        // If both conditions are met, navigate to notes page
        router.replace("/notes");
      } catch (e) {
        console.error("Error during navigation:", e);
      }
    };

    navigateUser();
  }, [router]);

  return (

    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        style={styles.noteIcon}
        source={require("../assets/images/note_icon.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  noteIcon: {
    width: 100,
    height: 100,
    objectFit: "contain",
  },
});
export default Index;
