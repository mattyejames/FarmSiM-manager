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
  name: string;
  size_value: number;
  size_unit: SizeUnit;
  soil_type: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface FieldInput {
  name: string;
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
  current_year: number;
  current_month: number;
}
