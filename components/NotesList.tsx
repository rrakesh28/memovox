import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import * as SQLite from "expo-sqlite";
import { Note } from "@/types/Note";
import NoteCard from "./NotesCard";
import { getWeekDateRange } from "@/utils/getWeekDateRange";

interface NotesListProps {
    weekNumber: number;
    month: number;
    year: number;
}

const NotesList: React.FC<NotesListProps> = ({ weekNumber, month, year }) => {
    const [notes, setNotes] = useState<Note[]>([]);


    useEffect(() => {
        const getNotes = async () => {
            try {
                const { startDate, endDate } = getWeekDateRange(year, month, weekNumber);

                console.log(startDate)
                console.log(endDate)

                const db = await SQLite.openDatabaseAsync("databaseName.db");

                const result: Note[] = await db.getAllAsync(
                    `SELECT * FROM notes WHERE (date BETWEEN ? AND ?) AND month = ? AND year = ?`,
                    [startDate.getDate(), endDate.getDate(), month, year]
                );

                console.log('result')
                console.log(result);

                setNotes(result);
            } catch (error) {
                console.error("Error fetching notes:", error);
            }
        };

        getNotes();
    }, [weekNumber, month, year]);

    return (
        <FlatList
            data={notes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <NoteCard note={item} />}
            className="mt-5"
        />
    );
};

export default NotesList;
