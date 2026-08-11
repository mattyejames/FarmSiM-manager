import { v4 as uuidv4 } from "uuid";
import { getDb } from "../db";
import type { Field, FieldInput } from "../types";

export async function listFields(): Promise<Field[]> {
  const db = await getDb();
  return db.select<Field[]>("SELECT * FROM field ORDER BY name COLLATE NOCASE");
}

export async function getField(id: string): Promise<Field | null> {
  const db = await getDb();
  const rows = await db.select<Field[]>("SELECT * FROM field WHERE id = $1", [id]);
  return rows[0] ?? null;
}

export async function createField(input: FieldInput): Promise<string> {
  const db = await getDb();
  const id = uuidv4();
  await db.execute(
    `INSERT INTO field (id, name, number, size_value, size_unit, soil_type, notes)
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [id, input.name, input.number, input.size_value, input.size_unit, input.soil_type, input.notes],
  );
  return id;
}

export async function updateField(id: string, input: FieldInput): Promise<void> {
  const db = await getDb();
  await db.execute(
    `UPDATE field
     SET name = $1, number = $2, size_value = $3, size_unit = $4, soil_type = $5, notes = $6, updated_at = datetime('now')
     WHERE id = $7`,
    [input.name, input.number, input.size_value, input.size_unit, input.soil_type, input.notes, id],
  );
}

export async function deleteField(id: string): Promise<void> {
  const db = await getDb();
  await db.execute("DELETE FROM field WHERE id = $1", [id]);
}

/** Sets (or clears, with x=y=null) a field's pin position on the active map image, as a
 * percentage of the image's width/height. Split out from updateField so the Map screen's
 * click-to-place interaction doesn't need a full FieldInput round-trip. */
export async function updateFieldPin(id: string, x: number | null, y: number | null): Promise<void> {
  const db = await getDb();
  await db.execute(
    `UPDATE field SET map_x = $1, map_y = $2, updated_at = datetime('now') WHERE id = $3`,
    [x, y, id],
  );
}
