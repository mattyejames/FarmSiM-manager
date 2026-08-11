import type { Season } from "./types";

export const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/** January=index 0 ... December=index 11, mapped onto the app's 4-season model. */
const SEASON_BY_MONTH: Season[] = [
  "WINTER",
  "WINTER",
  "SPRING",
  "SPRING",
  "SPRING",
  "SUMMER",
  "SUMMER",
  "SUMMER",
  "AUTUMN",
  "AUTUMN",
  "AUTUMN",
  "WINTER",
];

export function seasonForMonth(month: number): Season {
  return SEASON_BY_MONTH[month - 1];
}

export function seasonsFromMonths(months: number[]): Season[] {
  const seen = new Set<Season>();
  const ordered: Season[] = [];
  for (const month of months) {
    const season = seasonForMonth(month);
    if (!seen.has(season)) {
      seen.add(season);
      ordered.push(season);
    }
  }
  return ordered;
}

export function monthLabel(month: number): string {
  return MONTH_LABELS[month - 1];
}

/** Formats a set of month numbers (1-12) as a compact range string, e.g. "Sep–Oct". */
export function formatMonthRange(months: number[]): string {
  if (months.length === 0) return "";
  if (months.length === 12) return "year-round";
  const sorted = [...months].sort((a, b) => a - b);
  const first = sorted[0];
  const last = sorted[sorted.length - 1];
  if (first === last) return monthLabel(first);
  return `${monthLabel(first)}–${monthLabel(last)}`;
}

/** Advances (or rewinds) a year/month pair by one month, rolling the year over at the edges. */
export function shiftMonth(
  state: { current_year: number; current_month: number },
  direction: 1 | -1,
): { current_year: number; current_month: number } {
  const next = state.current_month + direction;
  if (next < 1) {
    return { current_year: Math.max(1, state.current_year - 1), current_month: 12 };
  }
  if (next > 12) {
    return { current_year: state.current_year + 1, current_month: 1 };
  }
  return { current_year: state.current_year, current_month: next };
}
