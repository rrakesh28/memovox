import { Note } from "@/types/Note";
import { SQLiteDatabase } from "expo-sqlite";

export const fetchAllNotes = async (db: SQLiteDatabase): Promise<Note[]> => {
  try {
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
  db: SQLiteDatabase,
  currentDay: number,
  currentMonth: number,
  currentYear: number
): Promise<Note[]> => {
  try {

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

export const createNote = async (db: SQLiteDatabase): Promise<Note | null> => {
  try {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const timestamp = date.toISOString();

    const result = await db.runAsync(
      "INSERT INTO notes (notes, date, month, year, created_at) VALUES (?, ?, ?, ?, ?)",
      ["New Note", day, month, year, timestamp]
    );

    const newNote: Note = {
      id: result.lastInsertRowId,
      notes: "New Note",
      date: day,
      month: month,
      year: year,
      created_at: timestamp,
    };

    return newNote;
  } catch (e) {
    console.error("Error creating note:", e);
    return null;
  }
};


export const updateNote = async (db: SQLiteDatabase, text: string, noteId: number) => {
  try {

    await db.runAsync("UPDATE notes SET notes = ? WHERE id = ?", [
      text,
      noteId,
    ]);
  } catch (error) {
    console.error("Error updating note:", error);
  }
};

export const getNotesById = async (db: SQLiteDatabase, id: number): Promise<Note | null> => {

  const result = await db.getFirstAsync<Note>(
    `SELECT * FROM notes WHERE id = ?`,
    [id]
  );
  return result;
};

export const getNotesInDateRange = async (
  db: SQLiteDatabase,
  startDate: Date,
  endDate: Date,
  month: number,
  year: number
) => {

  const result = await db.getAllAsync(
    `SELECT * FROM notes WHERE (date BETWEEN ? AND ?) AND month = ? AND year = ?`,
    [startDate.getDate(), endDate.getDate(), month, year]
  );

  return result;
};

export const getMostRecentDate = async (db: SQLiteDatabase): Promise<Note | undefined> => {

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

export const getNotesCount = async (db: SQLiteDatabase): Promise<number> => {

  const result = await db.getFirstAsync<CountResult>(
    "SELECT count(id) AS count FROM notes"
  );

  if (result === null) {
    return 0;
  }

  return result.count;
};

export const getDatesByMonth = async (db: SQLiteDatabase, month: number): Promise<number[]> => {

  const result = await db.getAllAsync("SELECT date FROM notes WHERE month=?", [
    month,
  ]);

  if (result === null) {
    return [];
  }

  const dates = result.map((row: any) => row.date);

  return dates;
};

export const clearData = async (db: SQLiteDatabase) => {
  await db.getFirstAsync("DELETE FROM notes");
};
