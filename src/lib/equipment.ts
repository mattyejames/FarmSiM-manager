import { CROPS, getCropInfo } from "./crops";
import type { CropInfo } from "./crops";
import type { Field, RotationEntry, Vehicle } from "./types";
import { dominantCrop } from "./rotationSummary";

/** Fixed category list vehicles/implements are classified into. Free text on `vehicle.category`
 * (not an enum/FK) — these are just the suggestions shown in the picker, matched by name. */
export const EQUIPMENT_CATEGORIES = [
  "Tractor",
  "Plow",
  "Cultivator",
  "Seeder",
  "Planter",
  "Fertilizer spreader/sprayer",
  "Combine + grain header",
  "Potato harvester",
  "Forage harvester + forage header",
  "Weeder",
  "Mulcher",
  "Trailer",
] as const;

export type EquipmentCategory = (typeof EQUIPMENT_CATEGORIES)[number];

const PLANTED_CROPS = new Set(["Potato", "Sugar Beet", "Sugarcane", "Carrots", "Parsnips", "Red Beet", "Corn (Maize)"]);
const COMBINE_CROPS = new Set([
  "Wheat", "Barley", "Oat", "Canola (Oilseed Rape)", "Sunflower", "Soybean",
  "Corn (Maize)", "Sorghum", "Rice", "Long Grain Rice", "Peas", "Green Beans",
]);

/**
 * Rough, hand-maintained mapping from crop to the equipment categories it typically needs —
 * built from the equipment hints already in crops.ts's free-text `note` fields, since CropInfo
 * has no structured equipment data. Not exhaustive: perennials/specialty crops without a
 * matching bundled category (Grapes, Olives, Poplar, Cotton) are approximated with the base
 * set only, rather than force-fit into a category that doesn't really apply.
 */
export function categoriesForCrop(cropName: string): EquipmentCategory[] {
  const info = getCropInfo(cropName);
  if (!info) return [];

  if (cropName === "Grass") {
    return ["Tractor", "Fertilizer spreader/sprayer", "Trailer", "Forage harvester + forage header"];
  }

  const categories = new Set<EquipmentCategory>(["Tractor", "Fertilizer spreader/sprayer", "Trailer"]);

  const isTilledType: CropInfo["growthType"][] = ["annual", "ratoon"];
  if (isTilledType.includes(info.growthType)) {
    categories.add("Plow");
    categories.add("Cultivator");
    categories.add("Weeder");
  }

  if (cropName === "Potato") {
    categories.add("Planter");
    categories.add("Potato harvester");
  } else if (PLANTED_CROPS.has(cropName)) {
    categories.add("Planter");
  } else if (info.growthType === "annual" || info.growthType === "ratoon") {
    categories.add("Seeder");
  }

  if (COMBINE_CROPS.has(cropName)) {
    categories.add("Combine + grain header");
    categories.add("Mulcher");
  }

  return [...categories];
}

export interface CoverageGap {
  category: EquipmentCategory;
  /** Crop names that need this category but no owned vehicle covers it. */
  neededBy: string[];
}

export interface CoverageResult {
  totalCategories: number;
  covered: EquipmentCategory[];
  missing: CoverageGap[];
  percent: number;
}

/** Which equipment categories the current rotation needs, vs. what's covered by owned vehicles. */
export function coverageForRotation(
  vehicles: Vehicle[],
  fields: Field[],
  entries: RotationEntry[],
): CoverageResult {
  const ownedCategories = new Set(vehicles.map((v) => v.category));

  const neededBy = new Map<EquipmentCategory, Set<string>>();
  for (const field of fields) {
    const fieldEntries = entries.filter((e) => e.field_id === field.id);
    const years = [...new Set(fieldEntries.map((e) => e.year))];
    for (const year of years) {
      const crop = dominantCrop(fieldEntries.filter((e) => e.year === year));
      if (!crop) continue;
      for (const category of categoriesForCrop(crop)) {
        const set = neededBy.get(category) ?? new Set<string>();
        set.add(crop);
        neededBy.set(category, set);
      }
    }
  }

  const neededCategories = [...neededBy.keys()];
  const covered = neededCategories.filter((c) => ownedCategories.has(c));
  const missing: CoverageGap[] = neededCategories
    .filter((c) => !ownedCategories.has(c))
    .map((category) => ({ category, neededBy: [...(neededBy.get(category) ?? [])] }));

  return {
    totalCategories: neededCategories.length,
    covered,
    missing,
    percent: neededCategories.length === 0 ? 100 : Math.round((covered.length / neededCategories.length) * 100),
  };
}

/** How many crops (out of the full FS25 list) a category is used by — shown as context in the Vehicles screen. */
export function cropCountForCategory(category: EquipmentCategory): number {
  return CROPS.filter((c) => categoriesForCrop(c.name).includes(category)).length;
}
