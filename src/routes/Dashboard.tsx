import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listFields } from "../lib/queries/fields";
import { listRotationEntries } from "../lib/queries/rotation";
import type { Field, RotationEntry } from "../lib/types";
import { NO_CROP_LABEL } from "../lib/crops";

export default function Dashboard() {
  const [fields, setFields] = useState<Field[]>([]);
  const [entries, setEntries] = useState<RotationEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([listFields(), listRotationEntries()]).then(([f, e]) => {
      setFields(f);
      setEntries(e);
      setLoading(false);
    });
  }, []);

  if (loading) return <p className="text-stone-500">Loading…</p>;

  const plannedYears = new Set(entries.map((e) => e.year)).size;

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">Dashboard</h1>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-950">
          <p className="text-sm text-stone-500">Fields</p>
          <p className="text-2xl font-semibold">{fields.length}</p>
        </div>
        <div className="rounded-lg border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-950">
          <p className="text-sm text-stone-500">Rotation entries planned</p>
          <p className="text-2xl font-semibold">{entries.length}</p>
        </div>
        <div className="rounded-lg border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-950">
          <p className="text-sm text-stone-500">Years planned</p>
          <p className="text-2xl font-semibold">{plannedYears}</p>
        </div>
      </div>

      {fields.length === 0 ? (
        <p className="text-stone-500">
          Get started by{" "}
          <Link to="/fields/new" className="text-emerald-600 underline">
            adding your first field
          </Link>
          .
        </p>
      ) : (
        <>
          <h2 className="mb-2 text-lg font-semibold">Year 1 at a glance</h2>
          <ul className="divide-y divide-stone-200 rounded-lg border border-stone-200 dark:divide-stone-800 dark:border-stone-800">
            {fields.map((field) => {
              const year1Crops = entries
                .filter((e) => e.field_id === field.id && e.year === 1 && e.crop)
                .map((e) => e.crop);
              return (
                <li key={field.id} className="flex justify-between px-4 py-2">
                  <Link to={`/fields/${field.id}`} className="hover:underline">
                    {field.name}
                  </Link>
                  <span className="text-stone-600 dark:text-stone-300">
                    {year1Crops.length > 0 ? year1Crops.join(", ") : NO_CROP_LABEL}
                  </span>
                </li>
              );
            })}
          </ul>
          <p className="mt-3">
            <Link to="/rotation" className="text-emerald-600 underline">
              Open the full rotation planner →
            </Link>
          </p>
        </>
      )}
    </div>
  );
}
