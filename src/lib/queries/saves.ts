import { v4 as uuidv4 } from "uuid";
import { getDb } from "../db";
import { createGameState } from "./gameState";
import type { MapKey, Save, SaveInput } from "../types";

/** The one save that exists until the save picker/wizard (Phase 3) can create more —
 * migration 007 backfills every pre-existing row onto this id. Callers that don't yet have
 * a real active-save context (most of the app, for now) pass this explicitly; it goes away
 * once SaveProvider/saveContext.tsx lands. */
export const DEFAULT_SAVE_ID = "00000000-0000-0000-0000-000000000000";

interface SaveRow {
  id: string;
  name: string;
  map_key: MapKey;
  custom_image: string | null;
  custom_map_name: string | null;
  dlc_owned: string;
  created_at: string;
  updated_at: string;
}

function fromRow(row: SaveRow): Save {
  return { ...row, dlc_owned: JSON.parse(row.dlc_owned) as string[] };
}

export async function listSaves(): Promise<Save[]> {
  const db = await getDb();
  const rows = await db.select<SaveRow[]>("SELECT * FROM save ORDER BY updated_at DESC");
  return rows.map(fromRow);
}

export async function getSave(id: string): Promise<Save | null> {
  const db = await getDb();
  const rows = await db.select<SaveRow[]>("SELECT * FROM save WHERE id = $1", [id]);
  return rows[0] ? fromRow(rows[0]) : null;
}

export async function createSave(input: SaveInput): Promise<string> {
  const db = await getDb();
  const id = uuidv4();
  await db.execute(
    `INSERT INTO save (id, name, map_key, custom_image, custom_map_name, dlc_owned)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [id, input.name, input.map_key, input.custom_image, input.custom_map_name, JSON.stringify(input.dlc_owned)],
  );
  await createGameState(id);
  return id;
}

export async function renameSave(id: string, name: string): Promise<void> {
  const db = await getDb();
  await db.execute(`UPDATE save SET name = $1, updated_at = datetime('now') WHERE id = $2`, [name, id]);
}

export async function setSaveDlc(id: string, dlcSlugs: string[]): Promise<void> {
  const db = await getDb();
  await db.execute(`UPDATE save SET dlc_owned = $1, updated_at = datetime('now') WHERE id = $2`, [
    JSON.stringify(dlcSlugs),
    id,
  ]);
}

/** Changes a save's map and clears everything positioned/entered against the old one — every
 * field (and its cascaded rotation entries, and pins) plus every vehicle — since none of that
 * data corresponds to a different map's real field geography. Callers must confirm this with
 * the user first (see the Settings "change map" warning dialog); this function does not ask. */
export async function changeSaveMap(
  id: string,
  mapKey: MapKey,
  customImage: string | null,
  customMapName: string | null,
): Promise<void> {
  const db = await getDb();
  await db.execute("DELETE FROM field WHERE save_id = $1", [id]);
  await db.execute("DELETE FROM vehicle WHERE save_id = $1", [id]);
  await db.execute(
    `UPDATE save SET map_key = $1, custom_image = $2, custom_map_name = $3, updated_at = datetime('now')
     WHERE id = $4`,
    [mapKey, mapKey === "custom" ? customImage : null, customMapName, id],
  );
}

/** Permanently deletes a save and everything in it — field/vehicle/game_state rows cascade
 * via their save_id foreign key. Callers must confirm this with the user first (see the
 * Settings "delete save" warning dialog); this function does not ask. */
export async function deleteSave(id: string): Promise<void> {
  const db = await getDb();
  await db.execute("DELETE FROM save WHERE id = $1", [id]);
}
