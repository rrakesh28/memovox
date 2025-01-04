import { migrateDbIfNeeded } from './setupDb';
import { createNote, fetchAllNotes, updateNote } from './notesDb';

export { migrateDbIfNeeded, createNote, fetchAllNotes, updateNote };
