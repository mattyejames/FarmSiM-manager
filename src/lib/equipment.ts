import { CROPS, EQUIPMENT_CATEGORIES, getCropInfo } from "./crops";
import { dominantCrop } from "./rotationSummary";
import type { Field, RotationEntry, Vehicle } from "./types";

export interface EquipmentCheck {
  machine: string;
  owned: boolean;
}

export function ownedCategorySet(vehicles: Vehicle[]): Set<string> {
  return new Set(vehicles.map((v) => v.category));
}

/** Checks a crop's required machine categories against what the player owns. */
export function checkEquipment(machines: string[], owned: Set<string>): EquipmentCheck[] {
  return machines.map((machine) => ({ machine, owned: owned.has(machine) }));
}

/** Every machine category a crop's full field-operation sequence needs, deduped. */
export function categoriesForCrop(cropName: string): string[] {
  const info = getCropInfo(cropName);
  if (!info) return [];
  return Array.from(new Set(info.operations.map((op) => op.machine).filter((m): m is string => Boolean(m))));
}

export interface CoverageGap {
  category: string;
  /** Crop names that need this category but no owned vehicle covers it. */
  neededBy: string[];
}

export interface CoverageResult {
  totalCategories: number;
  covered: string[];
  missing: CoverageGap[];
  percent: number;
}

/** Which equipment categories the current rotation needs (via each field's dominant crop for
 * the year), vs. what's covered by owned vehicles. Categories themselves come from
 * EQUIPMENT_CATEGORIES (crops.ts, derived from real per-crop operations), not a guess. */
export function coverageForRotation(
  vehicles: Vehicle[],
  fields: Field[],
  entries: RotationEntry[],
): CoverageResult {
  const owned = ownedCategorySet(vehicles);

  const neededBy = new Map<string, Set<string>>();
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
  const covered = neededCategories.filter((c) => owned.has(c));
  const missing: CoverageGap[] = neededCategories
    .filter((c) => !owned.has(c))
    .map((category) => ({ category, neededBy: [...(neededBy.get(category) ?? [])] }));

  return {
    totalCategories: neededCategories.length,
    covered,
    missing,
    percent: neededCategories.length === 0 ? 100 : Math.round((covered.length / neededCategories.length) * 100),
  };
}

/** How many crops (out of the full FS25 list) a category is used by — shown as context in the Vehicles screen. */
export function cropCountForCategory(category: string): number {
  return CROPS.filter((c) => categoriesForCrop(c.name).includes(category)).length;
}

export { EQUIPMENT_CATEGORIES };
