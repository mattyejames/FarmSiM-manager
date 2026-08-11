import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { listFields } from "../lib/queries/fields";
import { listRotationEntries } from "../lib/queries/rotation";
import { getGameState } from "../lib/queries/gameState";
import { MONTH_LABELS, seasonForMonth } from "../lib/calendar";
import { getCropInfo } from "../lib/crops";
import { SEASON_LABELS } from "../lib/types";
import type { Field, RotationEntry, Season } from "../lib/types";

interface TimelineRow {
  fieldName: string;
  season: Season;
  cropName: string;
  sowMonths: number[];
  harvestMonths: number[];
}

function cellClass(month: number, row: TimelineRow): string {
  if (row.sowMonths.includes(month)) {
    return "bg-amber-500 dark:bg-amber-400";
  }
  if (row.harvestMonths.includes(month)) {
    return "bg-emerald-600 dark:bg-emerald-500";
  }
  if (seasonForMonth(month) === row.season) {
    return "bg-stone-300 dark:bg-stone-600";
  }
  return "bg-stone-100 dark:bg-stone-800";
}

export default function Timeline() {
  const [fields, setFields] = useState<Field[]>([]);
  const [entries, setEntries] = useState<RotationEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    Promise.all([listFields(), listRotationEntries(), getGameState()]).then(([f, e, gs]) => {
      setFields(f);
      setEntries(e);
      setLoading(false);
      const years = new Set(e.map((entry) => entry.year));
      setYear(years.has(gs.current_year) ? gs.current_year : (e[0]?.year ?? gs.current_year));
    });
  }, []);

  const years = useMemo(() => {
    const set = new Set(entries.map((e) => e.year));
    if (year) set.add(year);
    if (set.size === 0) set.add(1);
    return Array.from(set).sort((a, b) => a - b);
  }, [entries, year]);

  const rows = useMemo<TimelineRow[]>(() => {
    if (!year) return [];
    const fieldNameById = new Map(fields.map((f) => [f.id, f.name]));
    return entries
      .filter((e) => e.year === year && e.crop)
      .map((e) => {
        const info = getCropInfo(e.crop);
        if (!info) return null;
        return {
          fieldName: fieldNameById.get(e.field_id) ?? "Unknown field",
          season: e.season,
          cropName: e.crop as string,
          sowMonths: info.sowMonths,
          harvestMonths: info.harvestMonths,
        };
      })
      .filter((r): r is TimelineRow => r !== null)
      .sort((a, b) => a.fieldName.localeCompare(b.fieldName) || a.season.localeCompare(b.season));
  }, [entries, fields, year]);

  if (loading || year === null) return <p className="text-stone-500">Loading…</p>;

  if (fields.length === 0) {
    return (
      <p className="text-stone-500">
        No fields yet.{" "}
        <Link to="/fields/new" className="text-emerald-600 underline">
          Add a field
        </Link>{" "}
        before planning a rotation.
      </p>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Year timeline</h1>
        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="rounded-md border border-stone-300 px-3 py-2 text-sm dark:border-stone-700 dark:bg-stone-800"
        >
          {years.map((y) => (
            <option key={y} value={y}>
              Year {y}
            </option>
          ))}
        </select>
      </div>

      <p className="mb-4 text-sm text-stone-500">
        Gold cells are a crop's real sow window, green cells its real harvest window (from FS25 Academy
        reference data) — regardless of which season you assigned it to. Grey cells mark the season you
        actually planned; if gold/green markers fall outside the grey band, the crop is planned for the
        wrong season.
      </p>

      {rows.length === 0 ? (
        <p className="text-stone-500">
          Nothing planned for Year {year} yet.{" "}
          <Link to="/rotation" className="text-emerald-600 underline">
            Open the rotation planner →
          </Link>
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-stone-200 dark:border-stone-800">
          <table className="w-full min-w-[42rem] border-collapse text-sm">
            <thead>
              <tr className="border-b border-stone-200 dark:border-stone-800">
                <th className="sticky left-0 bg-stone-100 px-3 py-2 text-left font-medium dark:bg-stone-900">
                  Field / Crop
                </th>
                {MONTH_LABELS.map((label) => (
                  <th
                    key={label}
                    className="border-l border-stone-200 bg-stone-50 px-1 py-2 text-center text-xs font-normal text-stone-500 dark:border-stone-800 dark:bg-stone-950"
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-t border-stone-200 dark:border-stone-800">
                  <td className="sticky left-0 whitespace-nowrap bg-white px-3 py-2 dark:bg-stone-950">
                    <span className="font-medium">{row.fieldName}</span>
                    <span className="text-stone-500"> — {row.cropName}</span>
                    <span className="ml-1 text-xs text-stone-400">({SEASON_LABELS[row.season]})</span>
                  </td>
                  {MONTH_LABELS.map((_, idx) => (
                    <td key={idx} className="border-l border-stone-200 p-1 dark:border-stone-800">
                      <div className={`h-4 rounded-sm ${cellClass(idx + 1, row)}`} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 flex gap-4 text-xs text-stone-500">
        <span className="flex items-center gap-1">
          <span className="h-3 w-3 rounded-sm bg-amber-500 dark:bg-amber-400" /> Sow window
        </span>
        <span className="flex items-center gap-1">
          <span className="h-3 w-3 rounded-sm bg-emerald-600 dark:bg-emerald-500" /> Harvest window
        </span>
        <span className="flex items-center gap-1">
          <span className="h-3 w-3 rounded-sm bg-stone-300 dark:bg-stone-600" /> Assigned season
        </span>
      </div>
    </div>
  );
}
