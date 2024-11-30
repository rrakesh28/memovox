import {
  ImageBackground,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
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
    <SafeAreaView className="h-full flex justify-between px-8 py-10">
      <View className="mt-12">
        <Text className="text-center text-[43px] font-extrabold font-[SpaceMono]">
          Welcome to MemoVox
        </Text>
        <Text className="text-center text-sm font-medium mt-2">
          Start your journey now — Share your thoughts, organize your ideas, and
          capture inspiration like never before.
        </Text>
      </View>
      <View className="flex-1 flex justify-center items-center">
        <TextInput
          className="h-15 w-full px-3 mb-5 rounded-md border py-4"
          placeholder="Enter your name"
          value={name}
          onChangeText={handleTextChange}
        />
        <Text className="text-red-500 text-sm font-medium">{errorMessage}</Text>
      </View>
      <Pressable
        onPress={submit}
        className="bg-primary-button border rounded-lg py-4"
      >
        <Text className="text-center text-white">Submit</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default User;
