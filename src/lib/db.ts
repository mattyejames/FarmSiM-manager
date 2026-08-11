import Database from "@tauri-apps/plugin-sql";

let dbPromise: Promise<Database> | null = null;

/** Lazily opens the local SQLite database (migrations run automatically on first load). */
export function getDb(): Promise<Database> {
  if (!dbPromise) {
    dbPromise = Database.load("sqlite:farmsim.db");
  }
  return dbPromise;
}
