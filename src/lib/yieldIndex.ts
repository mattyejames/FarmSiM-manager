import { getCropInfo } from "./crops";
import { dominantCrop } from "./rotationSummary";
import type { RotationEntry } from "./types";

/**
 * Rough 0-100 estimate of a field's rotation health — not a real FS25 yield prediction,
 * which depends on far more (fertilizer, lime, weeds, plowing timing, per-map soil) than
 * this app tracks. Starts at 100 and subtracts for two things this app *can* see:
 * consecutive years of the same crop (monoculture pressure), and sowing outside a crop's
 * normal FS25 season. Always label this as an estimate wherever it's shown in the UI.
 */
export function estimateYieldIndex(fieldEntries: RotationEntry[]): number {
  const years = [...new Set(fieldEntries.map((e) => e.year))].sort((a, b) => a - b);

  let score = 100;
  let prevCrop: string | null = null;
  let prevYear: number | null = null;

  for (const year of years) {
    const crop = dominantCrop(fieldEntries.filter((e) => e.year === year));
    if (crop && crop === prevCrop && prevYear === year - 1) {
      score -= 15;
    }
    prevCrop = crop;
    prevYear = year;
  }

  for (const entry of fieldEntries) {
    if (!entry.crop) continue;
    const info = getCropInfo(entry.crop);
    const isReplantingType = info?.growthType === "annual" || info?.growthType === "forage";
    if (info && isReplantingType && !info.sowSeasons.includes(entry.season)) {
      score -= 10;
    }
  }

  return Math.max(0, Math.min(100, score));
}
