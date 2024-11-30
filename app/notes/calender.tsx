import CalendarComponent from "@/components/CalenderComponent";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import NoteCard from "@/components/NotesCard";
import WeekButtonGrid from "@/components/WeekButtonGrid";
import { Note } from "@/types/Note";
import MonthButtonGrid from "@/components/MonthButtonGrid";
import { fetchNotesByDate } from "@/database/notesDb";

const Calender = () => {
  const { year, month, day } = useMemo(() => {
    const today = new Date();
    return {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate(),
    };
  }, []);

  const [notes, setNotes] = useState<Note[]>([]);

  const [currentYear, setCurrentYear] = useState<number>(year);
  const [currentMonth, setCurrentMonth] = useState<number>(month);
  const [currentDay, setCurrentDay] = useState<number>(day);

  const [isYearSelection, setIsYearSelection] = useState<boolean>(false);
  const [isMonthSelection, setIsMonthSelection] = useState<boolean>(false);

  const handleDayPress = useCallback((date: any) => {
    console.log(date);
    setCurrentDay(date.day);
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [currentDay]);

  const fetchNotes = async () => {
    try {
      const notes: Note[] = await fetchNotesByDate(currentDay, currentMonth - 1, currentYear)
      setNotes(notes);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ScrollView className="flex-1 p-4">
      <View className="mt-5 flex flex-row justify-between items-center">
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
        >
          <MaterialIcons name="arrow-back-ios" size={18} color="black" />
        </TouchableOpacity>
      </View>
      <CalendarComponent
        currentYear={currentYear}
        setCurrentYear={setCurrentYear}
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
        currentDay={currentDay}
        setCurrentDay={setCurrentDay}
        isYearSelection={isYearSelection}
        setIsYearSelection={setIsYearSelection}
        isMonthSelection={isMonthSelection}
        setIsMonthSelection={setIsMonthSelection}
        onDayPress={handleDayPress}
      />

      {isYearSelection && (
        <MonthButtonGrid isYearSelection={isYearSelection} year={currentYear} />
      )}

      {isMonthSelection && (
        <WeekButtonGrid
          currentMonth={currentMonth - 1}
          currentYear={currentYear}
        />
      )}

      {!isYearSelection && !isMonthSelection && (
        <View className="pb-5">
          <FlatList
            data={notes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <NoteCard note={item} />}
            className="mt-5"
            scrollEnabled={false}
          />
        </View>
      )}

      {!isYearSelection && !isMonthSelection && notes.length === 0 && (
        <View className="mt-5">
          <Text>No notes available for the selected day.</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default Calender;
