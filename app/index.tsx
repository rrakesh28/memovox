import { Image, StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    const navigateUser = async () => {
      try {
        const introCompleted = await AsyncStorage.getItem("intro_completed");
        const userName = await AsyncStorage.getItem("userName");

        if (introCompleted !== "true") {
          router.replace("/welcome");
          return;
        }

        if (!userName) {
          router.replace("/user");
          return;
        }

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
