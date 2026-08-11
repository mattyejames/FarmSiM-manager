import { v4 as uuidv4 } from "uuid";
import { getDb } from "../db";
import type { RotationEntry, RotationEntryInput } from "../types";

export async function listRotationEntries(): Promise<RotationEntry[]> {
  const db = await getDb();
  return db.select<RotationEntry[]>("SELECT * FROM rotation_entry");
}

export async function listRotationEntriesForField(fieldId: string): Promise<RotationEntry[]> {
  const db = await getDb();
  return db.select<RotationEntry[]>(
    "SELECT * FROM rotation_entry WHERE field_id = $1 ORDER BY year, season",
    [fieldId],
  );
}

/** Creates the (field, year, season) entry, or updates it in place if it already exists. */
export async function upsertRotationEntry(input: RotationEntryInput): Promise<void> {
  const db = await getDb();
  const existing = await db.select<{ id: string }[]>(
    "SELECT id FROM rotation_entry WHERE field_id = $1 AND year = $2 AND season = $3",
    [input.field_id, input.year, input.season],
  );

  if (existing[0]) {
    await db.execute(
      `UPDATE rotation_entry
       SET crop = $1, notes = $2, updated_at = datetime('now')
       WHERE id = $3`,
      [input.crop, input.notes, existing[0].id],
    );
  } else {
    await db.execute(
      `INSERT INTO rotation_entry (id, field_id, year, season, crop, notes)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [uuidv4(), input.field_id, input.year, input.season, input.crop, input.notes],
    );
  }
}

export async function deleteRotationEntry(id: string): Promise<void> {
  const db = await getDb();
  await db.execute("DELETE FROM rotation_entry WHERE id = $1", [id]);
}
