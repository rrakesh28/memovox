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
import { useSQLiteContext } from "expo-sqlite";
import { useLocalSearchParams } from "expo-router";
import { Note } from "@/types/Note";
import { getDayOfWeek } from "@/utils/getDayOfWeek";
import { months } from "@/utils/monthUtils";
import { getWeekNumberOfMonth } from "@/utils/getWeekNumberOfMonth";
import { getNotesById } from "@/database/notesDb";

const NotePage = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const db = useSQLiteContext();

    const [noteId, setNoteId] = useState<number | null>(null);
    const [notes, setNotes] = useState<Note | null>(null);

    const noteRef = useRef<TextInput>(null);



    useEffect(() => {
        const fetchOrCreateNote = async () => {
            try {
                if (id) {
                    setNoteId(parseInt(id));
                    const note = await getNotesById(db, parseInt(id));
                    setNotes(note);
                    if (noteRef.current) {
                        noteRef.current.setNativeProps({ text: note?.notes || "Default Note" });
                    }

                } else {
                    const newNote = await createNote(db);
                    if (newNote == null) return;

                    setNoteId(newNote.id);
                    setNotes(newNote);
                    console.log("New note ID:", newNote.id);
                }
            } catch (e) {
                console.error("Error creating note:", e);
            }
        };

        fetchOrCreateNote();
    }, [id, db]);


    const onInputChange = debounce(async (text: string, noteId: number) => {
        if (!noteId) return;

        await updateNote(db, text, noteId);
    }, 500);

    function handleTextInputChange(
        e: NativeSyntheticEvent<TextInputChangeEventData>,
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
                            {getWeekNumberOfMonth(notes?.date, notes?.month, notes?.year)}
                        </Text>
                    )}
                </View>
                <View className="mt-24 mb-4 pb-[100px]">
                    <TextInput
                        ref={noteRef}
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

export default NotePage;
