export type SizeUnit = "HA" | "AC";

export type Season = "SPRING" | "SUMMER" | "AUTUMN" | "WINTER";

export const SEASONS: Season[] = ["SPRING", "SUMMER", "AUTUMN", "WINTER"];

export const SEASON_LABELS: Record<Season, string> = {
  SPRING: "Spring",
  SUMMER: "Summer",
  AUTUMN: "Autumn",
  WINTER: "Winter",
};

export interface Field {
  id: string;
  save_id: string;
  name: string;
  /** The in-game field number, e.g. from the player's own map. User-entered, optional. */
  number: number | null;
  size_value: number;
  size_unit: SizeUnit;
  soil_type: string | null;
  notes: string | null;
  /** Pin position on the active map image, as a percentage (0-100) of its width/height. */
  map_x: number | null;
  map_y: number | null;
  created_at: string;
  updated_at: string;
}

export interface FieldInput {
  name: string;
  number: number | null;
  size_value: number;
  size_unit: SizeUnit;
  soil_type: string | null;
  notes: string | null;
}

export interface RotationEntry {
  id: string;
  field_id: string;
  year: number;
  season: Season;
  crop: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface RotationEntryInput {
  field_id: string;
  year: number;
  season: Season;
  crop: string | null;
  notes: string | null;
}

/** A vehicle/implement the player owns in-game. category is free text matched against the
 * `machine` strings in crops.ts operations, so the app can tell which required equipment
 * for a crop the player already has. */
export interface Vehicle {
  id: string;
  save_id: string;
  name: string;
  category: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface VehicleInput {
  name: string;
  category: string;
  notes: string | null;
}

/** The player's current in-game year/month — the reference point task tracking and the
 * timeline compare rotation entries against. Manually advanced by the user; there's no live
 * game to read it from. Month-level (1-12) since crop reference data is month-precise. */
export interface GameState {
  save_id: string;
  current_year: number;
  current_month: number;
}

/** Keys for the map images bundled with the app; 'custom' means map_selection.custom_image
 * (a user-dropped data: URL) is the active image instead of a bundled one. */
export type MapKey = "riverbend-springs" | "kinlaig" | "hutan-pantai" | "zielonka" | "custom";

export const BUNDLED_MAP_LABELS: Record<Exclude<MapKey, "custom">, string> = {
  "riverbend-springs": "Riverbend Springs",
  kinlaig: "Kinlaig",
  "hutan-pantai": "Hutan Pantai",
  zielonka: "Zielonka",
};

/** A named container for one farm/savegame — every field, vehicle and game_state row is
 * scoped to exactly one save via save_id. Locked to one map for its lifetime; changing that
 * map (see changeSaveMap) clears the save's fields/rotations/vehicles/pins rather than
 * leaving data that no longer corresponds to real field geography. */
export interface Save {
  id: string;
  name: string;
  map_key: MapKey;
  /** A user-dropped image as a data: URL; only meaningful when map_key === 'custom'. */
  custom_image: string | null;
  /** Optional label for a custom map; ignored for bundled maps (BUNDLED_MAP_LABELS covers those). */
  custom_map_name: string | null;
  /** DLC slugs the player has installed, matching docs/reference/fs25/dlc/*.md filenames.
   * Informational today; earmarked for DLC-aware crop/equipment coverage (see DLC_CATALOGUE). */
  dlc_owned: string[];
  created_at: string;
  updated_at: string;
}

export interface SaveInput {
  name: string;
  map_key: MapKey;
  custom_image: string | null;
  custom_map_name: string | null;
  dlc_owned: string[];
}
