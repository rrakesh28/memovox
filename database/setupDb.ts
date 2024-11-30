import * as SQLite from 'expo-sqlite';

export const setupDatabase = async () => {
  try {
    const db = await SQLite.openDatabaseAsync("databaseName.db");

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        notes TEXT,
        date INTEGER,
        month INTEGER,
        year INTEGER,
        created_at STRING
      );
    `);

    console.log("Database setup completed!");
  } catch (e) {
    console.error("Error setting up database:", e);
  }
};
