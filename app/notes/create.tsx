import {
  Button,
  KeyboardAvoidingView,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SQLite from "expo-sqlite";

import { debounce } from "lodash";

const create = () => {
  const [noteId, setNoteId] = useState<number | null>(null);
  const [note, setNote] = useState<string>("");

  const date = new Date();

  const dayOfWeek = date.toLocaleString("en-US", { weekday: "long" });

  const day = date.getDate();

  const month = date.toLocaleString("en-US", { month: "long" });

  const startDate = new Date(date.getFullYear(), 0, 1);
  const daysInYear = Math.floor(
    (date.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)
  );
  const weekNumber = Math.ceil((daysInYear + 1) / 7);

  useEffect(() => {
    const createNote = async () => {
      const db = await SQLite.openDatabaseAsync("databaseName.db");
      const timestamp = new Date().toISOString();

      const result = await db.runAsync(
        "INSERT INTO notes (notes, created_at, updated_at) VALUES (?, ?, ?)",
        ["New Note", timestamp, timestamp]
      );

      const newNoteId = result.lastInsertRowId;
      setNoteId(newNoteId);
    };

    createNote();
  }, []);

  const onInputChange = debounce(async (text: string, noteId: number) => {
    if (!noteId) return;

    const updatedTimestamp = new Date().toISOString();

    try {
      const db = await SQLite.openDatabaseAsync("databaseName.db");

      await db.runAsync(
        "UPDATE notes SET notes = ?, updated_at = ? WHERE id = ?",
        [text, updatedTimestamp, noteId]
      );
    } catch (error) {
      console.error("Error updating note:", error);
    }
  }, 500);

  function handleTextInputChange(
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ) {
    if (!noteId) return;
    const text = e.nativeEvent.text;
    onInputChange(text, noteId);
  }

  return (
    <View className="h-full w-full">
      <SafeAreaView className="px-4 h-full w-full">
        <View className="flex flex-row justify-between items-start mt-5">
          <View className="flex flex-col justify-center items-center">
            <Text
              className="text-3xl"
              style={{ fontFamily: "ShipporiMincho_400Regular" }}
            >
              {dayOfWeek}
            </Text>
            <Text
              className="text-3xl"
              style={{ fontFamily: "ShipporiMincho_400Regular" }}
            >
              {day}
            </Text>
            <Text
              className="text-3xl"
              style={{ fontFamily: "ShipporiMincho_400Regular" }}
            >
              {month}
            </Text>
          </View>
          <Text
            className="font-semibold"
            style={{ fontFamily: "ShipporiMincho_400Regular" }}
          >
            WEEK {weekNumber}
          </Text>
        </View>
        <View className="mt-24 mb-4 pb-[80px]">
          <TextInput
            className="h-full text-xl text-gray-700 p-3 "
            placeholder="Enter your notes here..."
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

export default create;
