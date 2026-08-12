import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { listFields } from "../lib/queries/fields";
import { listRotationEntries } from "../lib/queries/rotation";
import { useGameState } from "../lib/gameStateContext";
import { MONTH_LABELS, seasonForMonth } from "../lib/calendar";
import { getCropInfo } from "../lib/crops";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";
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
  if (row.sowMonths.includes(month)) return "bg-warn";
  if (row.harvestMonths.includes(month)) return "bg-accent";
  if (seasonForMonth(month) === row.season) return "bg-surface-hover";
  return "bg-surface-3";
}

export default function Timeline() {
  const { gameState } = useGameState();
  const [fields, setFields] = useState<Field[]>([]);
  const [entries, setEntries] = useState<RotationEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    Promise.all([listFields(), listRotationEntries()]).then(([f, e]) => {
      setFields(f);
      setEntries(e);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (year !== null || !gameState) return;
    const years = new Set(entries.map((entry) => entry.year));
    setYear(years.has(gameState.current_year) ? gameState.current_year : (entries[0]?.year ?? gameState.current_year));
  }, [entries, gameState, year]);

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

  if (loading || year === null) return <p className="p-6 text-text-dim">Loading…</p>;

  if (fields.length === 0) {
    return (
      <div className="flex h-full flex-col">
        <PageHeader title="Timeline" />
        <div className="flex flex-1 items-center justify-center">
          <p className="text-text-dim">
            No fields yet.{" "}
            <Link to="/fields/new" className="text-accent underline">
              Add a field
            </Link>{" "}
            before planning a rotation.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="Timeline"
        subtitle={`YEAR ${year}`}
        actions={
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="rounded-md border border-border bg-surface-4 px-2.5 py-1.5 text-[12.5px] text-text focus-visible:border-accent focus-visible:outline-none"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                Year {y}
              </option>
            ))}
          </select>
        }
      />

      <div className="min-h-0 flex-1 overflow-auto p-6">
        <p className="mb-4 text-[12.5px] leading-relaxed text-text-dimmer">
          Amber cells are a crop's real sow window, green cells its real harvest window (from the FS25 Academy
          reference data) — regardless of which season you assigned it to. Dim cells mark the season you actually
          planned; if amber/green markers fall outside that band, the crop is planned for the wrong season.
        </p>

        {rows.length === 0 ? (
          <p className="text-[12.5px] text-text-dim">
            Nothing planned for Year {year} yet.{" "}
            <Link to="/rotation" className="text-accent underline">
              Open the rotation planner →
            </Link>
          </p>
        ) : (
          <Card className="overflow-x-auto">
            <table className="w-full min-w-[42rem] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border-faint bg-surface-3">
                  <th className="sticky left-0 bg-surface-3 px-3.5 py-2 text-left font-mono text-[9.5px] tracking-wide text-text-subtle">
                    FIELD / CROP
                  </th>
                  {MONTH_LABELS.map((label) => (
                    <th
                      key={label}
                      className="border-l border-border-faint px-1 py-2 text-center font-mono text-[9.5px] text-text-subtle"
                    >
                      {label.toUpperCase()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className="border-t border-border-faint">
                    <td className="sticky left-0 whitespace-nowrap bg-surface-2 px-3.5 py-2">
                      <span className="font-medium text-text">{row.fieldName}</span>
                      <span className="text-text-faint"> — {row.cropName}</span>
                      <span className="ml-1 font-mono text-[10px] text-text-subtle">
                        ({SEASON_LABELS[row.season]})
                      </span>
                    </td>
                    {MONTH_LABELS.map((_, idx) => (
                      <td key={idx} className="border-l border-border-faint p-1">
                        <div className={`h-4 rounded-sm ${cellClass(idx + 1, row)}`} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}

        <div className="mt-4 flex gap-4 font-mono text-[10px] tracking-wide text-text-faint">
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm bg-warn" /> SOW WINDOW
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm bg-accent" /> HARVEST WINDOW
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm bg-surface-hover" /> ASSIGNED SEASON
          </span>
        </div>
      </div>
    </div>
  );
}
