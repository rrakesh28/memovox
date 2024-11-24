import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const User = () => {
  const [name, setName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleTextChange = (input: string) => {
    setName(input);
  };

  const submit = async () => {
    if (!name.trim()) {
      setErrorMessage("Enter a valid name");
      return;
    }
    try {
      await AsyncStorage.setItem("userName", name);
      setErrorMessage("");
      router.replace("/notes");
    } catch (error) {
      console.error("Error saving name:", error);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/images/bg.png")}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Welcome to MemoVox</Text>
          <Text
            style={{ fontSize: 14, textAlign: "center", fontWeight: "400" }}
          >
            Start your journey now — Share your thoughts, organize your ideas,
            and capture inspiration like never before.
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter text"
            value={name}
            onChangeText={handleTextChange}
          />
          <Text style={{ color: "red", fontSize: 14, fontWeight: "400" }}>
            {errorMessage}
          </Text>
        </View>
        <Pressable onPress={submit} style={styles.button}>
          <Text
            style={{ fontSize: 26, textAlign: "center", fontWeight: "bold" }}
          >
            Submit
          </Text>
        </Pressable>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    height: "100%",
    width: "100%",
  },
  container: {
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  headingContainer: {
    width: "auto",
    marginTop: 50,
  },
  heading: {
    fontSize: 43,
    fontWeight: 900,
    textAlign: "center",
    fontFamily: "SpaceMono",
  },
  noteIcon: {
    width: 50,
    height: 50,
    objectFit: "contain",
    position: "relative",
  },
  inputContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 60,
    borderColor: "#ccc",
    borderWidth: 1,
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#EBEBEA",
    borderColor: "#DEDFDB",
    borderRadius: 30,
    paddingVertical: 12,
  },
});

export default User;
