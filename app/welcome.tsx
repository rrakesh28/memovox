import {
  Image,
  ImageBackground,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { Link, router } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as SecureStore from 'expo-secure-store';

const Welcome = () => {
  const navigateUser = async () => {
    SecureStore.setItem("intro_completed", "true");
    router.replace("/user");
  };

  return (
    <SafeAreaView className="h-full flex justify-between px-8 py-10">
      <View className="mt-12">
        <Text className="text-center text-[43px] font-extrabold font-[SpaceMono]">
          Keep your
        </Text>
        <Text className="text-center text-[43px] font-extrabold font-[SpaceMono]">
          Mind Clear With
        </Text>
        <View className="flex flex-row gap-2 items-center justify-center">
          <Image
            className="w-12 h-12"
            source={require("../assets/images/note_icon.png")}
          />
          <Text className="text-center text-[43px] font-extrabold font-[SpaceMono]">
            MemoVox
          </Text>
        </View>
      </View>

      <View className="flex-1 flex justify-center items-center">
        <View className="h-[330px] w-[250px]">
          <ImageBackground
            source={require("../assets/images/calender.png")}
            className="h-full w-full rounded-[30px] overflow-hidden"
          >
            <Text className="absolute bottom-14 w-full text-center text-base font-medium text-[#7B7B7A]">
              Develop the habit of daily journaling
            </Text>
          </ImageBackground>
        </View>
      </View>

      <Link href="/user" asChild>
        <Pressable
          onPress={navigateUser}
          className="bg-primary-button border rounded-lg py-4"
        >
          <Text className="text-center text-white">Try it now</Text>
        </Pressable>
      </Link>
    </SafeAreaView>
  );
};

export default Welcome;
