import { getCropInfo } from "./crops";
import { seasonForMonth } from "./calendar";
import type { Field, RotationEntry, Season } from "./types";

export type TaskKind = "sow" | "harvest" | "unplanned";

export interface Task {
  kind: TaskKind;
  fieldId: string;
  fieldName: string;
  year: number;
  month: number;
  crop?: string;
  /** Every machine category this crop's full field-operation sequence needs, deduped. */
  machines?: string[];
}

function entryKey(fieldId: string, year: number, season: Season) {
  return `${fieldId}_${year}_${season}`;
}

/**
 * Derives a month's task list purely from already-planned rotation entries plus each crop's
 * reference sow/harvest month data — there's no live game to poll, so "due" just means "this
 * entry's crop and month line up with the sow/harvest window in the FS Academy source."
 *
 * Only sow/harvest are month-precise in the underlying crop data; intermediate operations
 * (fertilizing, weeding, liming) aren't, so they're surfaced as an aggregate equipment list
 * rather than pinned to a specific month.
 */
export function tasksForMonth(
  fields: Field[],
  entries: RotationEntry[],
  year: number,
  month: number,
): Task[] {
  const season = seasonForMonth(month);
  const entryMap = new Map<string, RotationEntry>();
  for (const entry of entries) {
    entryMap.set(entryKey(entry.field_id, entry.year, entry.season), entry);
  }

  const tasks: Task[] = [];
  for (const field of fields) {
    const entry = entryMap.get(entryKey(field.id, year, season));
    const cropName = entry?.crop ?? null;

    if (!cropName) {
      tasks.push({ kind: "unplanned", fieldId: field.id, fieldName: field.name, year, month });
      continue;
    }

    const info = getCropInfo(cropName);
    if (!info) continue;

    const machines = Array.from(
      new Set(info.operations.map((op) => op.machine).filter((m): m is string => Boolean(m))),
    );

    const isReplantingType = info.growthType === "annual" || info.growthType === "forage";
    if (isReplantingType && info.sowMonths.includes(month)) {
      tasks.push({ kind: "sow", fieldId: field.id, fieldName: field.name, year, month, crop: cropName, machines });
    }
    if (info.harvestMonths.includes(month)) {
      tasks.push({ kind: "harvest", fieldId: field.id, fieldName: field.name, year, month, crop: cropName, machines });
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
