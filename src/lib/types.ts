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

/** The player's current in-game year/season — the reference point task tracking compares
 * rotation entries against. Manually advanced by the user; there's no live game to read it from. */
export interface GameState {
  current_year: number;
  current_season: Season;
}
