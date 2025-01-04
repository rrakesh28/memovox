import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Linking, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Tile from "@/components/Tile";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Share } from "react-native";
import { Alert } from "react-native";
import { clearData } from "@/database/notesDb";
import { useSQLiteContext } from "expo-sqlite";
import * as SecureStore from 'expo-secure-store';


const Profile = () => {
  const [name, setName] = useState<String>("");

  const db = useSQLiteContext();

  useEffect(() => {
    getName();
  }, []);

  const getName = () => {
    try {
      const nameItem = SecureStore.getItem("userName");
      setName(nameItem ?? "Guest");
    } catch (error) {
      console.error("Error saving name:", error);
    }
  };

  const referFriends = async (): Promise<void> => {
    try {
      const result = await Share.share({
        message: `🌟 Check out this awesome note-taking app! 📝\n\n
        "Memovox" is designed to help you organize your thoughts and ideas quickly and easily. Whether you're taking quick notes, saving important information, or just organizing your life, Memovox has you covered! 📱\n\n
        Try it out now: https://github.com/rrakesh28/memovox\n\n
        Download it today and improve your productivity! 🔥`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log(`Shared with activity type: ${result.activityType}`);
        } else {
          console.log("Shared successfully!");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Share dismissed");
      }
    } catch (error: any) {
      Alert.alert("Error", `An error occurred while sharing: ${error.message}`);
    }
  };

  return (
    <View>
      <SafeAreaView className="px-4">
        <View className="mt-5 flex flex-row justify-between items-center">
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
          >
            <MaterialIcons name="arrow-back-ios" size={18} color="black" />
          </TouchableOpacity>
          <Text
            className="text-4xl"
            style={{ fontFamily: "ShipporiMincho_400Regular" }}
          >
            Profile
          </Text>
          <View></View>
        </View>

        <View className="mt-10">
          <View className="flex flex-row items-center gap-4">
            <Image
              source={{ uri: "https://picsum.photos/seed/696/3000/2000" }}
              className="h-16 w-16 rounded-full border-black border-2"
            />
            <View>
              <Text className="font-semibold text-lg">{name}</Text>
              <Text>Take a deep breath, and let your words flow.</Text>
            </View>
          </View>
          <View className="mt-10 px-6 flex flex-col gap-6 space-y-6">
            <Tile
              icon={<Feather name="user" size={24} color="black" />}
              title="Account Settings*"
              onPress={() => { }}
            />
            <Tile
              icon={<Feather name="upload-cloud" size={24} color="black" />}
              title="Backup and Restore*"
              onPress={() => { }}
            />
            <Tile
              icon={<Ionicons name="flash-outline" size={24} color="black" />}
              title="Journal Stats"
              onPress={() => {
                router.push("/notes/stats");
              }}
            />
            <Tile
              icon={<Feather name="calendar" size={24} color="black" />}
              title="Calender"
              onPress={() => {
                router.push("/notes/calender");
              }}
            />
            <Tile
              icon={<Feather name="users" size={24} color="black" />}
              title="Refer Friends"
              onPress={referFriends}
            />
            <Tile
              icon={<Feather name="briefcase" size={24} color="black" />}
              title="Data Storage*"
              onPress={() => { }}
            />
            <Tile
              icon={<Feather name="trash" size={24} color="black" />}
              title="Clear Data"
              onPress={async () => {
                await clearData(db);
              }}
            />
            <Tile
              icon={<Feather name="key" size={24} color="black" />}
              title="Privacy Policy*"
              onPress={() => { }}
            />
            <Tile
              icon={<Feather name="coffee" size={24} color="black" />}
              title="Support Me"
              onPress={() => {
                Linking.openURL(
                  "https://buymeacoffee.com/rebbavarapurakesh"
                ).catch((err) => console.error("Failed to open URL", err));
              }}
            />
            <Tile
              icon={<Feather name="github" size={24} color="black" />}
              title="GitHub"
              onPress={() => {
                Linking.openURL("https://www.github.com/rrakesh28").catch(
                  (err) => console.error("Failed to open URL", err)
                );
              }}
            />
            <Tile
              icon={<MaterialIcons name="history" size={24} color="black" />}
              title="ChangeLog*"
              onPress={() => { }}
            />
            <Tile
              icon={
                <MaterialCommunityIcons
                  name="code-tags"
                  size={24}
                  color="black"
                />
              }
              title="Version 1.0.0"
              onPress={() => { }}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Profile;
