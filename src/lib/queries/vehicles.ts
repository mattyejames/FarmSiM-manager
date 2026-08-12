import { v4 as uuidv4 } from "uuid";
import { getDb } from "../db";
import type { Vehicle, VehicleInput } from "../types";

export async function listVehicles(saveId: string): Promise<Vehicle[]> {
  const db = await getDb();
  return db.select<Vehicle[]>("SELECT * FROM vehicle WHERE save_id = $1 ORDER BY name COLLATE NOCASE", [saveId]);
}

export async function getVehicle(id: string): Promise<Vehicle | null> {
  const db = await getDb();
  const rows = await db.select<Vehicle[]>("SELECT * FROM vehicle WHERE id = $1", [id]);
  return rows[0] ?? null;
}

export async function createVehicle(saveId: string, input: VehicleInput): Promise<string> {
  const db = await getDb();
  const id = uuidv4();
  await db.execute(
    `INSERT INTO vehicle (id, save_id, name, category, notes)
     VALUES ($1, $2, $3, $4, $5)`,
    [id, saveId, input.name, input.category, input.notes],
  );
  return id;
}

export async function updateVehicle(id: string, input: VehicleInput): Promise<void> {
  const db = await getDb();
  await db.execute(
    `UPDATE vehicle
     SET name = $1, category = $2, notes = $3, updated_at = datetime('now')
     WHERE id = $4`,
    [input.name, input.category, input.notes, id],
  );
}

export async function deleteVehicle(id: string): Promise<void> {
  const db = await getDb();
  await db.execute("DELETE FROM vehicle WHERE id = $1", [id]);
}
