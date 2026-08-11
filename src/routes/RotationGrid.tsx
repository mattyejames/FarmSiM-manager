import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { listFields } from "../lib/queries/fields";
import { listRotationEntries, upsertRotationEntry } from "../lib/queries/rotation";
import RotationCell from "../components/RotationCell";
import { SEASONS, SEASON_LABELS } from "../lib/types";
import type { Field, RotationEntry, Season } from "../lib/types";
import { NO_CROP_LABEL } from "../lib/crops";

function entryKey(fieldId: string, year: number, season: Season) {
  return `${fieldId}_${year}_${season}`;
}

export default function RotationGrid() {
  const [fields, setFields] = useState<Field[]>([]);
  const [entries, setEntries] = useState<RotationEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [maxYear, setMaxYear] = useState(1);
  const [selected, setSelected] = useState<{ field: Field; year: number; season: Season } | null>(
    null,
  );

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
    for (const entry of entries) {
      map.set(entryKey(entry.field_id, entry.year, entry.season), entry);
    }
    return map;
  }, [entries]);

  const years = useMemo(() => Array.from({ length: maxYear }, (_, i) => i + 1), [maxYear]);

  async function handleSave(crop: string | null, notes: string | null) {
    if (!selected) return;
    await upsertRotationEntry({
      field_id: selected.field.id,
      year: selected.year,
      season: selected.season,
      crop,
      notes,
    });
    setSelected(null);
    await refresh();
  }

  if (loading) return <p className="text-stone-500">Loading…</p>;

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
        <h1 className="text-2xl font-semibold">Rotation planner</h1>
        <button
          onClick={() => setMaxYear((y) => y + 1)}
          className="rounded-md border border-stone-300 px-3 py-2 text-sm font-medium hover:bg-stone-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 dark:border-stone-700 dark:hover:bg-stone-800"
        >
          + Add year
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-stone-200 dark:border-stone-800">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="sticky left-0 bg-stone-100 px-3 py-2 text-left font-medium dark:bg-stone-900">
                Field
              </th>
              {years.map((year) => (
                <th
                  key={year}
                  colSpan={SEASONS.length}
                  className="border-l border-stone-200 bg-stone-100 px-3 py-2 text-center font-medium dark:border-stone-800 dark:bg-stone-900"
                >
                  Year {year}
                </th>
              ))}
            </tr>
            <tr>
              <th className="sticky left-0 bg-stone-100 px-3 py-1 dark:bg-stone-900" />
              {years.map((year) =>
                SEASONS.map((season) => (
                  <th
                    key={`${year}-${season}`}
                    className="border-l border-stone-200 bg-stone-50 px-2 py-1 text-center text-xs font-normal text-stone-500 dark:border-stone-800 dark:bg-stone-950"
                  >
                    {SEASON_LABELS[season]}
                  </th>
                )),
              )}
            </tr>
          </thead>
          <tbody>
            {fields.map((field) => (
              <tr key={field.id} className="border-t border-stone-200 dark:border-stone-800">
                <td className="sticky left-0 whitespace-nowrap bg-white px-3 py-2 font-medium dark:bg-stone-950">
                  {field.name}
                </td>
                {years.map((year) =>
                  SEASONS.map((season) => {
                    const entry = entryMap.get(entryKey(field.id, year, season));
                    return (
                      <td
                        key={`${year}-${season}`}
                        className="border-l border-stone-200 p-1 dark:border-stone-800"
                      >
                        <button
                          onClick={() => setSelected({ field, year, season })}
                          className="min-h-[44px] w-full min-w-[96px] rounded-md px-2 py-2 text-left text-xs hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 dark:hover:bg-emerald-950"
                        >
                          {entry?.crop ? (
                            <span className="font-medium text-emerald-700 dark:text-emerald-400">
                              {entry.crop}
                            </span>
                          ) : (
                            <span className="text-stone-400">{NO_CROP_LABEL}</span>
                          )}
                        </button>
                      </td>
                    );
                  }),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <RotationCell
          fieldName={selected.field.name}
          year={selected.year}
          season={selected.season}
          initialCrop={entryMap.get(entryKey(selected.field.id, selected.year, selected.season))?.crop ?? null}
          initialNotes={
            entryMap.get(entryKey(selected.field.id, selected.year, selected.season))?.notes ?? null
          }
          onSave={handleSave}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
