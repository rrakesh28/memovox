import * as SQLite from "expo-sqlite";

export async function migrateDbIfNeeded(db: SQLite.SQLiteDatabase) {
  const DATABASE_VERSION = 1;
  let result = await db.getFirstAsync<{ user_version: number }>(
    "PRAGMA user_version"
  );

  let currentDbVersion = result?.user_version ?? 0;

  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }
  if (currentDbVersion === 0) {
    const result = await db.execAsync(`
PRAGMA journal_mode = 'wal';
CREATE TABLE chats (
  id INTEGER PRIMARY KEY NOT NULL, 
  title TEXT NOT NULL
);

 CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        notes TEXT,
        date INTEGER,
        month INTEGER,
        year INTEGER,
        created_at STRING
      );
`);

    currentDbVersion = 1;
  }

  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}
