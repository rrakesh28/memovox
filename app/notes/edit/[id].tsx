import {
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { debounce } from "lodash";
import { createNote, updateNote } from "@/database";
import { useLocalSearchParams } from "expo-router";
import { Note } from "@/types/Note";
import { getNotesById } from "@/database/notesDb";
import { getDayOfWeek } from "@/utils/getDayOfWeek";
import { months } from "@/utils/monthUtils";
import { getWeekNumberOfMonth } from "@/utils/getWeekNumberOfMonth";

const Edit = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const inputRef = useRef<TextInput>(null);

  const [notes, setNotes] = useState<Note | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      const note = await getNotesById(parseInt(id));
      setNotes(note);
    };
    fetchNotes();
  }, [id]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.setNativeProps({ text: notes });
    }
  }, [notes]);

  const onInputChange = debounce(async (text: string, noteId: number) => {
    if (!noteId) return;

    await updateNote(text, noteId);
  }, 500);

  function handleTextInputChange(
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ) {
    if (!id) return;
    const text = e.nativeEvent.text;
    onInputChange(text, parseInt(id));
  }

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
          <TextInput
            className="h-full text-xl text-gray-700 p-3 "
            placeholder="Enter your notes here..."
            ref={inputRef}
            style={{
              textAlignVertical: "top",
              fontFamily: "Handlee_400Regular",
              fontWeight: "semibold",
            }}
            multiline
            onChange={handleTextInputChange}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Edit;
