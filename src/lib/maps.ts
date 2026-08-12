import hutanPantai from "../assets/maps/hutan-pantai.jpg";
import kinlaig from "../assets/maps/kinlaig.jpg";
import riverbendSprings from "../assets/maps/riverbend-springs.jpg";
import zielonka from "../assets/maps/zielonka.jpg";
import { BUNDLED_MAP_LABELS } from "./types";
import type { MapKey, MapSelection } from "./types";

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

/** The active map's image source — a bundled asset, or the user's own dropped image. */
export function activeMapImage(selection: MapSelection): string | null {
  if (selection.map_key === "custom") return selection.custom_image;
  return BUNDLED_MAP_IMAGES[selection.map_key];
}

export function mapLabel(selection: MapSelection): string {
  if (selection.map_key === "custom") return "Custom map";
  return BUNDLED_MAP_LABELS[selection.map_key];
}
