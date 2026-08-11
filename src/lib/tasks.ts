import { getCropInfo } from "./crops";
import type { Field, RotationEntry, Season } from "./types";

export type TaskKind = "sow" | "harvest" | "unplanned";

export interface Task {
  kind: TaskKind;
  fieldId: string;
  fieldName: string;
  year: number;
  season: Season;
  crop?: string;
}

function entryKey(fieldId: string, year: number, season: Season) {
  return `${fieldId}_${year}_${season}`;
}

/**
 * Derives a season's task list purely from already-planned rotation entries plus each
 * crop's reference season data — there's no live game to poll, so "due" just means "this
 * entry's crop and season line up with FS25's normal sow/harvest window."
 */
export function tasksForSeason(
  fields: Field[],
  entries: RotationEntry[],
  year: number,
  season: Season,
): Task[] {
  const entryMap = new Map<string, RotationEntry>();
  for (const entry of entries) {
    entryMap.set(entryKey(entry.field_id, entry.year, entry.season), entry);
  }

  const tasks: Task[] = [];
  for (const field of fields) {
    const entry = entryMap.get(entryKey(field.id, year, season));
    const cropName = entry?.crop ?? null;

    if (!cropName) {
      tasks.push({ kind: "unplanned", fieldId: field.id, fieldName: field.name, year, season });
      continue;
    }

    const info = getCropInfo(cropName);
    if (!info) continue;

    const isReplantingType = info.growthType === "annual" || info.growthType === "forage";
    if (isReplantingType && info.sowSeasons.includes(season)) {
      tasks.push({ kind: "sow", fieldId: field.id, fieldName: field.name, year, season, crop: cropName });
    }
    if (info.harvestSeasons.includes(season)) {
      tasks.push({ kind: "harvest", fieldId: field.id, fieldName: field.name, year, season, crop: cropName });
    }
  }
  return tasks;
}

export function describeTask(task: Task): string {
  switch (task.kind) {
    case "sow":
      return `Sow ${task.crop} in ${task.fieldName}`;
    case "harvest":
      return `Harvest ${task.crop} in ${task.fieldName}`;
    case "unplanned":
      return `No crop planned yet for ${task.fieldName}`;
  }
}
