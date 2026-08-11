import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteField, getField } from "../lib/queries/fields";
import { listRotationEntriesForField } from "../lib/queries/rotation";
import { SEASON_LABELS } from "../lib/types";
import type { Field, RotationEntry } from "../lib/types";
import { NO_CROP_LABEL } from "../lib/crops";

export default function FieldDetail() {
  const { fieldId } = useParams();
  const navigate = useNavigate();
  const [field, setField] = useState<Field | null>(null);
  const [entries, setEntries] = useState<RotationEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!fieldId) return;
    Promise.all([getField(fieldId), listRotationEntriesForField(fieldId)]).then(
      ([f, rotationEntries]) => {
        setField(f);
        setEntries(rotationEntries);
        setLoading(false);
      },
    );
  }, [fieldId]);

  async function handleDelete() {
    if (!fieldId) return;
    if (!confirm("Delete this field and its rotation plan? This cannot be undone.")) return;
    await deleteField(fieldId);
    navigate("/fields");
  }

  if (loading) return <p className="text-stone-500">Loading…</p>;
  if (!field) return <p className="text-stone-500">Field not found.</p>;

  return (
    <div>
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{field.name}</h1>
          <p className="text-stone-500">
            {field.size_value} {field.size_unit === "HA" ? "hectares" : "acres"}
            {field.soil_type ? ` · ${field.soil_type} soil` : ""}
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            to={`/fields/${field.id}/edit`}
            className="rounded-md border border-stone-300 px-3 py-2 text-sm font-medium hover:bg-stone-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 dark:border-stone-700 dark:hover:bg-stone-800"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="rounded-md border border-red-300 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 dark:border-red-900 dark:hover:bg-red-950"
          >
            Delete
          </button>
        </div>
      </div>

      {field.notes && <p className="mb-6 text-stone-700 dark:text-stone-300">{field.notes}</p>}

      <h2 className="mb-2 text-lg font-semibold">Rotation plan</h2>
      {entries.length === 0 ? (
        <p className="text-stone-500">
          No rotation entries yet.{" "}
          <Link to="/rotation" className="text-emerald-600 underline">
            Plan this field's rotation
          </Link>
          .
        </p>
      ) : (
        <ul className="divide-y divide-stone-200 rounded-lg border border-stone-200 dark:divide-stone-800 dark:border-stone-800">
          {entries.map((entry) => (
            <li key={entry.id} className="flex justify-between px-4 py-2">
              <span>
                Year {entry.year} · {SEASON_LABELS[entry.season]}
              </span>
              <span className="text-stone-600 dark:text-stone-300">
                {entry.crop ?? NO_CROP_LABEL}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
