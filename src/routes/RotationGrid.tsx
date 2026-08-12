import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { listFields } from "../lib/queries/fields";
import { listRotationEntries, upsertRotationEntry } from "../lib/queries/rotation";
import RotationCell from "../components/RotationCell";
import PageHeader from "../components/ui/PageHeader";
import Button from "../components/ui/Button";
import { dominantCrop } from "../lib/rotationSummary";
import { useGameState } from "../lib/gameStateContext";
import { seasonForMonth } from "../lib/calendar";
import { SEASONS, SEASON_LABELS } from "../lib/types";
import type { Field, RotationEntry, Season } from "../lib/types";
import { NO_CROP_LABEL } from "../lib/crops";

function entryKey(fieldId: string, year: number, season: Season) {
  return `${fieldId}_${year}_${season}`;
}

export default function RotationGrid() {
  const { gameState } = useGameState();
  const [fields, setFields] = useState<Field[]>([]);
  const [entries, setEntries] = useState<RotationEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [maxYear, setMaxYear] = useState(1);
  const [selected, setSelected] = useState<{ field: Field; year: number } | null>(null);

  async function refresh() {
    const [f, e] = await Promise.all([listFields(), listRotationEntries()]);
    setFields(f);
    setEntries(e);
    const highestPlannedYear = e.reduce((max, entry) => Math.max(max, entry.year), 1);
    setMaxYear((current) => Math.max(current, highestPlannedYear));
    setLoading(false);
  }

  useEffect(() => {
    refresh();
  }, []);

  const entryMap = useMemo(() => {
    const map = new Map<string, RotationEntry>();
    for (const entry of entries) map.set(entryKey(entry.field_id, entry.year, entry.season), entry);
    return map;
  }, [entries]);

  const years = useMemo(() => Array.from({ length: maxYear }, (_, i) => i + 1), [maxYear]);

  const rows = useMemo(
    () =>
      fields.map((field) => {
        const fieldEntries = entries.filter((e) => e.field_id === field.id);
        let prevCrop: string | null = null;
        const cells = years.map((year) => {
          const yearEntries = fieldEntries.filter((e) => e.year === year);
          const crop = dominantCrop(yearEntries);
          const repeatWarning = crop !== null && crop === prevCrop;
          prevCrop = crop;
          return { year, crop, repeatWarning, seasons: SEASONS.map((s) => Boolean(yearEntries.find((e) => e.season === s)?.crop)) };
        });
        return { field, cells };
      }),
    [fields, entries, years],
  );

  const warningCount = rows.reduce((sum, r) => sum + r.cells.filter((c) => c.repeatWarning).length, 0);

  async function handleSave(season: Season, crop: string | null, notes: string | null) {
    if (!selected) return;
    await upsertRotationEntry({ field_id: selected.field.id, year: selected.year, season, crop, notes });
    await refresh();
  }

  if (loading) return <p className="p-6 text-text-dim">Loading…</p>;

  if (fields.length === 0) {
    return (
      <div className="p-6">
        <p className="text-text-dim">
          No fields yet.{" "}
          <Link to="/fields/new" className="text-accent underline">
            Add a field
          </Link>{" "}
          before planning a rotation.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="Rotation"
        subtitle={`YEAR 1 – ${maxYear}`}
        actions={
          <>
            {warningCount > 0 && (
              <span className="rounded-md border border-warn-border px-2.5 py-1.5 text-[12.5px] text-warn-muted">
                Warnings {warningCount}
              </span>
            )}
            <Button variant="secondary" onClick={() => setMaxYear((y) => y + 1)}>
              + Add year
            </Button>
          </>
        }
      />

      <div className="min-h-0 flex-1 overflow-auto p-6">
        <div className="overflow-hidden rounded-lg border border-border">
          <div
            className="grid border-b border-border bg-surface-3"
            style={{ gridTemplateColumns: `196px repeat(${years.length}, minmax(84px, 1fr))` }}
          >
            <div className="px-3.5 py-2 font-mono text-[9.5px] tracking-wide text-text-subtle">FIELD</div>
            {years.map((year) => (
              <div
                key={year}
                className="border-l border-border py-2 text-center font-mono text-[9.5px] tracking-wide text-text-subtle"
              >
                YR {year}
              </div>
            ))}
          </div>

          {rows.map(({ field, cells }) => (
            <div
              key={field.id}
              className="grid border-b border-border-faint last:border-b-0"
              style={{ gridTemplateColumns: `196px repeat(${years.length}, minmax(84px, 1fr))` }}
            >
              <div className="flex items-center gap-2 px-3.5 py-2">
                {field.number !== null && (
                  <span className="rounded bg-surface-3 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-accent">
                    {field.number}
                  </span>
                )}
                <div className="flex min-w-0 flex-col">
                  <span className="truncate text-[12.5px] font-semibold text-text">{field.name}</span>
                  <span className="font-mono text-[9.5px] text-text-subtle">
                    {field.size_value} {field.size_unit} {field.soil_type ? `· ${field.soil_type}` : ""}
                  </span>
                </div>
              </div>
              {cells.map((cell) => (
                <button
                  key={cell.year}
                  type="button"
                  onClick={() => setSelected({ field, year: cell.year })}
                  className="flex min-h-[46px] flex-col items-center justify-center gap-1 border-l border-border-faint p-1 text-center hover:bg-surface-hover"
                >
                  <span className={`text-[11.5px] leading-tight ${cell.crop ? "font-medium text-text-muted" : "text-text-ghost"}`}>
                    {cell.crop ?? NO_CROP_LABEL}
                    {cell.repeatWarning && " ⚠"}
                  </span>
                  <span className="flex gap-0.5">
                    {cell.seasons.map((filled, i) => (
                      <span
                        key={i}
                        className={`h-[5px] w-[5px] rounded-[1px] ${filled ? "bg-accent" : "bg-surface-hover"}`}
                      />
                    ))}
                  </span>
                </button>
              ))}
            </div>
          ))}

          <div className="flex items-center gap-4 bg-surface-3 px-3.5 py-2.5 font-mono text-[9.5px] tracking-wide text-text-subtle">
            <span>SEASON DOTS: {SEASONS.map((s) => SEASON_LABELS[s].slice(0, 3).toUpperCase()).join(" ")}</span>
            <span className="flex items-center gap-1.5 text-text-dimmer">
              <span className="h-[5px] w-[5px] rounded-[1px] bg-accent" /> assigned
            </span>
            <span className="flex items-center gap-1.5 text-text-dimmer">
              <span className="h-[5px] w-[5px] rounded-[1px] bg-surface-hover" /> empty
            </span>
            <span className="ml-auto text-text-subtle">Click any cell to edit that year's seasons</span>
          </div>
        </div>
      </div>

      {selected && (
        <RotationCell
          fieldName={selected.field.name}
          fieldNumber={selected.field.number}
          sizeLabel={`${selected.field.size_value} ${selected.field.size_unit}${
            selected.field.soil_type ? ` · ${selected.field.soil_type.toUpperCase()}` : ""
          }`}
          year={selected.year}
          initialSeason={gameState ? seasonForMonth(gameState.current_month) : "SPRING"}
          entriesBySeason={Object.fromEntries(
            SEASONS.map((s) => [s, entryMap.get(entryKey(selected.field.id, selected.year, s))]),
          )}
          onSave={handleSave}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
