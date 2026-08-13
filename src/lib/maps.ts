import hutanPantai from "../assets/maps/hutan-pantai.jpg";
import kinlaig from "../assets/maps/kinlaig.jpg";
import riverbendSprings from "../assets/maps/riverbend-springs.jpg";
import zielonka from "../assets/maps/zielonka.jpg";
import { BUNDLED_MAP_LABELS } from "./types";
import type { MapKey } from "./types";

/** Imported as ES modules (not raw public/ paths) so Vite rewrites the URLs correctly
 * under the relative base the packaged Tauri build needs (see vite.config.ts). */
export const BUNDLED_MAP_IMAGES: Record<Exclude<MapKey, "custom">, string> = {
  "riverbend-springs": riverbendSprings,
  kinlaig,
  "hutan-pantai": hutanPantai,
  zielonka,
};

export const BUNDLED_MAP_KEYS = Object.keys(BUNDLED_MAP_IMAGES) as Exclude<MapKey, "custom">[];

export { BUNDLED_MAP_LABELS };

/** The map-identifying fields every caller has, whether it's a full Save row or wizard/
 * MapPicker draft state — custom_map_name is optional since draft state doesn't always have
 * one yet. */
interface MapSource {
  map_key: MapKey;
  custom_image: string | null;
  custom_map_name?: string | null;
}

/** The map's image source — a bundled asset, or the user's own dropped image. */
export function activeMapImage(source: MapSource): string | null {
  if (source.map_key === "custom") return source.custom_image;
  return BUNDLED_MAP_IMAGES[source.map_key];
}

export function mapLabel(source: MapSource): string {
  if (source.map_key === "custom") return source.custom_map_name?.trim() || "Custom map";
  return BUNDLED_MAP_LABELS[source.map_key];
}
