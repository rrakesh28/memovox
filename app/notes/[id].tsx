import {
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { debounce } from "lodash";
import { createNote, updateNote } from "@/database";
import { router, useLocalSearchParams } from "expo-router";
import { Note } from "@/types/Note";
import { getNotesById } from "@/database/notesDb";
import { months } from "@/utils/monthUtils";
import { getWeekNumberOfMonth } from "@/utils/getWeekNumberOfMonth";
import { getDayOfWeek } from "@/utils/getDayOfWeek";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

const ViewNotes = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [notes, setNotes] = useState<Note | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      const note = await getNotesById(parseInt(id));
      console.log(note);
      setNotes(note);
    };
    fetchNotes();
  }, [id]);
  return (
    <View className="h-full w-full">
      <SafeAreaView className="px-4 h-full w-full">
        <View className="flex flex-row justify-between items-start mt-5">
          <View className="flex flex-col justify-center items-center">
            {notes && (
              <Text
                className="text-3xl"
                style={{ fontFamily: "ShipporiMincho_400Regular" }}
              >
                {getDayOfWeek(notes?.date, notes?.month, notes?.year)}
              </Text>
            )}
            <Text
              className="text-3xl"
              style={{ fontFamily: "ShipporiMincho_400Regular" }}
            >
              {notes?.date}
            </Text>
            <Text
              className="text-3xl"
              style={{ fontFamily: "ShipporiMincho_400Regular" }}
            >
              {months[notes?.month ?? 0]}
            </Text>
          </View>
          {notes && (
            <Text
              className="font-semibold"
              style={{ fontFamily: "ShipporiMincho_400Regular" }}
            >
              WEEK{" "}
              {getWeekNumberOfMonth(notes!.date, notes!.month, notes!.year)}
            </Text>
          )}
        </View>
        <View className="mt-24 mb-4 pb-[100px]">
          <Text style={{ fontFamily: "Handlee_400Regular", fontSize: 22 }}>
            {notes?.notes}
          </Text>
        </View>

        <TouchableOpacity
          className="bg-accent-highlight absolute bottom-5 right-5 w-16 h-16 rounded-lg flex items-center justify-center"
          onPress={() => {
            router.push(`/notes/edit/${notes?.id}`);
          }}
        >
          <SimpleLineIcons name="pencil" size={24} color="white" />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default ViewNotes;
