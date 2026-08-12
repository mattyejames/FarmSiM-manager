import { SEASONS } from "./types";
import type { RotationEntry } from "./types";

/**
 * The "one crop per year" summary the redesigned rotation grid and yield estimate use: the
 * first season (Spring→Winter order) with a crop set among the given entries, or null if
 * none do. The underlying data is still per-season — this is a display/estimate simplification,
 * not a schema change.
 */
export function dominantCrop(yearEntries: RotationEntry[]): string | null {
  for (const season of SEASONS) {
    const entry = yearEntries.find((e) => e.season === season);
    if (entry?.crop) return entry.crop;
  }
  return null;
}
