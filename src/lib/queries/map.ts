import { getDb } from "../db";
import type { MapKey, MapSelection } from "../types";

export async function getMapSelection(): Promise<MapSelection> {
  const db = await getDb();
  const rows = await db.select<MapSelection[]>(
    "SELECT map_key, custom_image FROM map_selection WHERE id = 1",
  );
  return rows[0] ?? { map_key: "riverbend-springs", custom_image: null };
}

export async function setMapSelection(mapKey: MapKey, customImage: string | null): Promise<void> {
  const db = await getDb();
  await db.execute(
    "UPDATE map_selection SET map_key = $1, custom_image = $2 WHERE id = 1",
    [mapKey, customImage],
  );
}
