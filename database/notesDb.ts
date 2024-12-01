import { Note } from "@/types/Note";
import * as SQLite from "expo-sqlite";

export const fetchAllNotes = async (): Promise<Note[]> => {
  try {
    const db = await SQLite.openDatabaseAsync("databaseName.db");

    const result: Note[] = await db.getAllAsync(
      "SELECT * FROM notes ORDER BY id DESC"
    );

    return result;
  } catch (e) {
    console.error("Error fetching notes:", e);
    return [];
  }
};

export const fetchNotesByDate = async (
  currentDay: number,
  currentMonth: number,
  currentYear: number
): Promise<Note[]> => {
  try {
    const db = await SQLite.openDatabaseAsync("databaseName.db");

    const result: Note[] = await db.getAllAsync(
      "SELECT * FROM notes WHERE date = ? AND month = ? AND year = ?",
      [currentDay, currentMonth, currentYear]
    );

    return result;
  } catch (e) {
    console.error("Error fetching notes:", e);
    return [];
  }
};

export const createNote = async (): Promise<number | null> => {
  try {
    const db = await SQLite.openDatabaseAsync("databaseName.db");

    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const timestamp = date.toISOString();

    const result = await db.runAsync(
      "INSERT INTO notes (notes, date, month, year, created_at) VALUES (?, ?, ?, ?, ?)",
      ["New Note", day, month, year, timestamp]
    );

    return result.lastInsertRowId;
  } catch (e) {
    console.error("Error creating note:", e);
    return null;
  }
};

export const updateNote = async (text: string, noteId: number) => {
  try {
    const db = await SQLite.openDatabaseAsync("databaseName.db");

    await db.runAsync("UPDATE notes SET notes = ? WHERE id = ?", [
      text,
      noteId,
    ]);
  } catch (error) {
    console.error("Error updating note:", error);
  }
};

export const getNotesById = async (id: number): Promise<Note | null> => {
  const db = await SQLite.openDatabaseAsync("databaseName.db");

  const result = await db.getFirstAsync<Note>(
    `SELECT * FROM notes WHERE id = ?`,
    [id]
  );
  return result;
};

export const getNotesInDateRange = async (
  startDate: Date,
  endDate: Date,
  month: number,
  year: number
) => {
  const db = await SQLite.openDatabaseAsync("databaseName.db");

  const result = await db.getAllAsync(
    `SELECT * FROM notes WHERE (date BETWEEN ? AND ?) AND month = ? AND year = ?`,
    [startDate.getDate(), endDate.getDate(), month, year]
  );

  return result;
};

export const getMostRecentDate = async (): Promise<Note | undefined> => {
  const db = await SQLite.openDatabaseAsync("databaseName.db");

  const result = await db.getFirstAsync<Note>(`
        SELECT * FROM notes 
        ORDER BY year DESC, month DESC, date DESC 
        LIMIT 1
    `);

  return result ? result : undefined;
};

interface CountResult {
  count: number;
}

export const getNotesCount = async (): Promise<number> => {
  const db = await SQLite.openDatabaseAsync("databaseName.db");

  const result = await db.getFirstAsync<CountResult>(
    "SELECT count(id) AS count FROM notes"
  );

  if (result === null) {
    return 0;
  }

  return result.count;
};

export const getDatesByMonth = async (month: number): Promise<number[]> => {
  const db = await SQLite.openDatabaseAsync("databaseName.db");

  const result = await db.getAllAsync("SELECT date FROM notes WHERE month=?", [
    month,
  ]);

  if (result === null) {
    return [];
  }

  const dates = result.map((row: any) => row.date);

  return dates;
};

export const clearData = async () => {
  const db = await SQLite.openDatabaseAsync("databaseName.db");

  await db.getFirstAsync("DELETE FROM notes");
};
