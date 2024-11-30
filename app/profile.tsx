import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Tile from "@/components/Tile";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
  const [name, setName] = useState<String>("");

  useEffect(() => {
    getName();
  }, []);

  const getName = async () => {
    try {
      const nameItem = await AsyncStorage.getItem("userName");
      setName(nameItem ?? "Guest");
    } catch (error) {
      console.error("Error saving name:", error);
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
              title="Account Settings"
              onPress={() => {}}
            />
            <Tile
              icon={<Feather name="upload-cloud" size={24} color="black" />}
              title="Backup and Restore"
              onPress={() => {}}
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
              onPress={() => {}}
            />
            <Tile
              icon={<Feather name="briefcase" size={24} color="black" />}
              title="Data Storage"
              onPress={() => {}}
            />
            <Tile
              icon={<Feather name="trash" size={24} color="black" />}
              title="Clear Data"
              onPress={() => {}}
            />
            <Tile
              icon={<Feather name="key" size={24} color="black" />}
              title="Privacy Policy"
              onPress={() => {}}
            />
            <Tile
              icon={<Feather name="coffee" size={24} color="black" />}
              title="Support Me"
              onPress={() => {}}
            />
            <Tile
              icon={<Feather name="github" size={24} color="black" />}
              title="GitHub"
              onPress={() => {}}
            />
            <Tile
              icon={<MaterialIcons name="history" size={24} color="black" />}
              title="ChangeLog"
              onPress={() => {}}
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
              onPress={() => {}}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Profile;
