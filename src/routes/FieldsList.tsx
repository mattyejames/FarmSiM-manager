import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listFields } from "../lib/queries/fields";
import type { Field } from "../lib/types";

export default function FieldsList() {
  const [fields, setFields] = useState<Field[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listFields().then((f) => {
      setFields(f);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Fields</h1>
        <Link
          to="/fields/new"
          className="rounded-md bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
        >
          + New field
        </Link>
      </div>

      {loading ? (
        <p className="text-stone-500">Loading…</p>
      ) : fields.length === 0 ? (
        <p className="text-stone-500">No fields yet. Add your first field to get started.</p>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {fields.map((field) => (
            <li key={field.id}>
              <Link
                to={`/fields/${field.id}`}
                className="block rounded-lg border border-stone-200 bg-white p-4 shadow-sm transition-colors hover:border-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 dark:border-stone-800 dark:bg-stone-950"
              >
                <p className="font-medium">{field.name}</p>
                <p className="text-sm text-stone-500">
                  {field.size_value} {field.size_unit === "HA" ? "ha" : "ac"}
                  {field.soil_type ? ` · ${field.soil_type}` : ""}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
