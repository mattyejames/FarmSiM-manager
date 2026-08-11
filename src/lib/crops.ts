import type { Season } from "./types";

export type CropGrowthType = "annual" | "perennial" | "ratoon" | "forage";

/** How well-corroborated a crop's season data is across FS25 wiki/community sources. */
export type CropDataConfidence = "high" | "medium" | "low";

export interface CropInfo {
  name: string;
  growthType: CropGrowthType;
  /** Seasons this crop is normally sown in (default FS25 Seasonal Growth timing). */
  sowSeasons: Season[];
  /** Seasons this crop is normally ready to harvest in. */
  harvestSeasons: Season[];
  /** Extra agronomic detail worth surfacing to the player (equipment, paddy, etc). */
  note?: string;
  confidence: CropDataConfidence;
}

const ALL_SEASONS: Season[] = ["SPRING", "SUMMER", "AUTUMN", "WINTER"];

/**
 * Reference data for FS25 base-game crops: typical sow/harvest seasons under default
 * Seasonal Growth settings, growth behavior, and any special handling. Hand-maintained
 * against the FS25 wiki — not exhaustive or authoritative, since exact windows can shift
 * with fertilization, map, and per-save calendar settings. Confidence reflects how well
 * sources agreed; treat "low"/"medium" entries as a rough guide, not a hard rule.
 */
export const CROPS: CropInfo[] = [
  {
    name: "Wheat",
    growthType: "annual",
    sowSeasons: ["AUTUMN"],
    harvestSeasons: ["SUMMER"],
    note: "Overwinters after autumn sowing; harvested the following summer.",
    confidence: "high",
  },
  {
    name: "Barley",
    growthType: "annual",
    sowSeasons: ["AUTUMN"],
    harvestSeasons: ["SUMMER"],
    note: "Overwinters after autumn sowing; harvested the following summer.",
    confidence: "medium",
  },
  {
    name: "Oat",
    growthType: "annual",
    sowSeasons: ["SPRING"],
    harvestSeasons: ["SUMMER"],
    confidence: "high",
  },
  {
    name: "Canola (Oilseed Rape)",
    growthType: "annual",
    sowSeasons: ["AUTUMN"],
    harvestSeasons: ["SUMMER"],
    note: "Overwinters after autumn sowing. Sources disagree on the exact sow window.",
    confidence: "medium",
  },
  {
    name: "Sunflower",
    growthType: "annual",
    sowSeasons: ["SPRING"],
    harvestSeasons: ["AUTUMN"],
    note: "Combine needs a dedicated sunflower header.",
    confidence: "high",
  },
  {
    name: "Soybean",
    growthType: "annual",
    sowSeasons: ["SPRING"],
    harvestSeasons: ["AUTUMN"],
    confidence: "high",
  },
  {
    name: "Corn (Maize)",
    growthType: "annual",
    sowSeasons: ["SPRING"],
    harvestSeasons: ["AUTUMN"],
    note: "Combine needs a dedicated corn header.",
    confidence: "high",
  },
  {
    name: "Potato",
    growthType: "annual",
    sowSeasons: ["SPRING"],
    harvestSeasons: ["SUMMER", "AUTUMN"],
    note: "Needs a dedicated potato planter and harvester.",
    confidence: "high",
  },
  {
    name: "Sugar Beet",
    growthType: "annual",
    sowSeasons: ["SPRING"],
    harvestSeasons: ["AUTUMN"],
    note: "Needs a dedicated root harvester.",
    confidence: "high",
  },
  {
    name: "Sugarcane",
    growthType: "ratoon",
    sowSeasons: ["SPRING"],
    harvestSeasons: ["AUTUMN"],
    note: "Regrows after harvest without replanting for about 3 harvests, then needs replowing.",
    confidence: "medium",
  },
  {
    name: "Cotton",
    growthType: "annual",
    sowSeasons: ["WINTER", "SPRING"],
    harvestSeasons: ["AUTUMN"],
    note: "Needs a dedicated module-building cotton harvester. Season data is disputed across sources.",
    confidence: "low",
  },
  {
    name: "Grapes",
    growthType: "perennial",
    sowSeasons: ["SPRING", "SUMMER"],
    harvestSeasons: ["AUTUMN"],
    note: "Planted once via the build menu, then regrows each year — no replanting. Planting window is disputed across sources.",
    confidence: "low",
  },
  {
    name: "Olives",
    growthType: "perennial",
    sowSeasons: ["SPRING", "SUMMER"],
    harvestSeasons: ["AUTUMN"],
    note: "Planted once via the build menu, then regrows each year. Needs a dedicated olive harvester.",
    confidence: "low",
  },
  {
    name: "Poplar",
    growthType: "perennial",
    sowSeasons: ["SPRING", "SUMMER"],
    harvestSeasons: ALL_SEASONS,
    note: "Planted once with a forestry planter; harvestable any time once mature. Maturation time is disputed across sources.",
    confidence: "low",
  },
  {
    name: "Sorghum",
    growthType: "annual",
    sowSeasons: ["SPRING"],
    harvestSeasons: ["SUMMER", "AUTUMN"],
    confidence: "medium",
  },
  {
    name: "Rice",
    growthType: "annual",
    sowSeasons: ["SPRING"],
    harvestSeasons: ["SUMMER"],
    note: "Requires a flooded rice paddy flooded before sowing, plus a dedicated seeder.",
    confidence: "medium",
  },
  {
    name: "Long Grain Rice",
    growthType: "annual",
    sowSeasons: ["SPRING"],
    harvestSeasons: ["AUTUMN"],
    note: "Dry-sown, then the paddy is flooded after sowing (unlike regular Rice).",
    confidence: "medium",
  },
  {
    name: "Spinach",
    growthType: "annual",
    sowSeasons: ["SPRING"],
    harvestSeasons: ["SUMMER"],
    note: "Gives two harvests per sowing.",
    confidence: "medium",
  },
  {
    name: "Peas",
    growthType: "annual",
    sowSeasons: ["SPRING"],
    harvestSeasons: ["SUMMER"],
    confidence: "medium",
  },
  {
    name: "Green Beans",
    growthType: "annual",
    sowSeasons: ["SPRING", "SUMMER"],
    harvestSeasons: ["SUMMER", "AUTUMN"],
    note: "Season data is sparse and conflicting across sources.",
    confidence: "low",
  },
  {
    name: "Red Beet",
    growthType: "annual",
    sowSeasons: ["SPRING"],
    harvestSeasons: ["SUMMER", "AUTUMN"],
    confidence: "medium",
  },
  {
    name: "Carrots",
    growthType: "annual",
    sowSeasons: ["SPRING", "SUMMER"],
    harvestSeasons: ["SUMMER", "AUTUMN"],
    confidence: "medium",
  },
  {
    name: "Parsnips",
    growthType: "annual",
    sowSeasons: ["SPRING"],
    harvestSeasons: ["SUMMER", "AUTUMN"],
    confidence: "medium",
  },
  {
    name: "Grass",
    growthType: "forage",
    sowSeasons: ["SPRING", "SUMMER", "AUTUMN"],
    harvestSeasons: ["SPRING", "SUMMER", "AUTUMN"],
    note: "Multi-cut forage — mowed repeatedly through the growing season rather than replanted each cycle. Dormant in winter.",
    confidence: "medium",
  },
];

export const CROP_NAMES = CROPS.map((c) => c.name);

export type Crop = (typeof CROP_NAMES)[number];

export function getCropInfo(name: string | null): CropInfo | undefined {
  if (!name) return undefined;
  return CROPS.find((c) => c.name === name);
}

/** Sentinel used in selects for "no crop planned" — stored as null in the DB. */
export const NO_CROP_LABEL = "Fallow / No Crop";
