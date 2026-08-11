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
    `INSERT INTO field (id, name, size_value, size_unit, soil_type, notes)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [id, input.name, input.size_value, input.size_unit, input.soil_type, input.notes],
  );
  return id;
}

export async function updateField(id: string, input: FieldInput): Promise<void> {
  const db = await getDb();
  await db.execute(
    `UPDATE field
     SET name = $1, size_value = $2, size_unit = $3, soil_type = $4, notes = $5, updated_at = datetime('now')
     WHERE id = $6`,
    [input.name, input.size_value, input.size_unit, input.soil_type, input.notes, id],
  );
}

export async function deleteField(id: string): Promise<void> {
  const db = await getDb();
  await db.execute("DELETE FROM field WHERE id = $1", [id]);
}
