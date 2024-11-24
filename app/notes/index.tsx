import { FlatList, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import Fontisto from "@expo/vector-icons/Fontisto";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { router } from "expo-router";
import * as SQLite from "expo-sqlite";
import NoteCard from "@/components/NotesCard";

const home = () => {
  const [notes, setNotes] = useState<any[]>([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const db = await SQLite.openDatabaseAsync("databaseName.db");

    const result = await db.getAllAsync("SELECT * FROM notes ORDER BY id DESC");
    setNotes(result);
  };
  return (
    <View className="h-full w-full">
      <SafeAreaView className="px-4 h-full w-full">
        <View className="mt-5 flex flex-row justify-between items-center">
          <TouchableOpacity
            onPress={() => {
              router.push("/profile");
            }}
          >
            <Ionicons name="menu-sharp" size={28} color="black" />
          </TouchableOpacity>
          <Text
            className="text-4xl"
            style={{ fontFamily: "ShipporiMincho_400Regular" }}
          >
            Home
          </Text>
          <Fontisto name="search" size={24} color="black" />
        </View>

        <FlatList
          data={notes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <NoteCard note={item} />}
          className="mt-5"
        />

        <TouchableOpacity
          className="bg-accent-highlight absolute bottom-5 right-5 w-16 h-16 rounded-lg flex items-center justify-center"
          onPress={() => {
            router.push("/notes/create");
          }}
        >
          <SimpleLineIcons name="pencil" size={24} color="white" />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default home;
