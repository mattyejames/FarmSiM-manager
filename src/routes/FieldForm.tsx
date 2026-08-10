import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createField, getField, updateField } from "../lib/queries/fields";
import SoilTypeInput from "../components/SoilTypeInput";
import type { SizeUnit } from "../lib/types";

export default function FieldForm() {
  const { fieldId } = useParams();
  const isEdit = Boolean(fieldId);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [sizeValue, setSizeValue] = useState("");
  const [sizeUnit, setSizeUnit] = useState<SizeUnit>("HA");
  const [soilType, setSoilType] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!fieldId) return;
    getField(fieldId).then((field) => {
      if (field) {
        setName(field.name);
        setSizeValue(String(field.size_value));
        setSizeUnit(field.size_unit);
        setSoilType(field.soil_type ?? "");
        setNotes(field.notes ?? "");
      }
      setLoading(false);
    });
  }, [fieldId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const parsedSize = Number(sizeValue);
    if (!name.trim()) {
      setError("Field name is required.");
      return;
    }
    if (!Number.isFinite(parsedSize) || parsedSize <= 0) {
      setError("Size must be a positive number.");
      return;
    }

    setSaving(true);
    const input = {
      name: name.trim(),
      size_value: parsedSize,
      size_unit: sizeUnit,
      soil_type: soilType.trim() || null,
      notes: notes.trim() || null,
    };

    try {
      if (isEdit && fieldId) {
        await updateField(fieldId, input);
        navigate(`/fields/${fieldId}`);
      } else {
        const id = await createField(input);
        navigate(`/fields/${id}`);
      }
    } catch (err) {
      setError(String(err));
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="text-stone-500">Loading…</p>;
  }

  return (
    <div className="max-w-lg">
      <h1 className="mb-4 text-2xl font-semibold">{isEdit ? "Edit field" : "New field"}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. North Field"
            className="w-full rounded-md border border-stone-300 px-3 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-500 dark:border-stone-700 dark:bg-stone-800"
          />
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <label htmlFor="size" className="mb-1 block text-sm font-medium">
              Size
            </label>
            <input
              id="size"
              type="number"
              inputMode="decimal"
              step="any"
              min="0"
              value={sizeValue}
              onChange={(e) => setSizeValue(e.target.value)}
              className="w-full rounded-md border border-stone-300 px-3 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-500 dark:border-stone-700 dark:bg-stone-800"
            />
          </div>
          <div>
            <label htmlFor="unit" className="mb-1 block text-sm font-medium">
              Unit
            </label>
            <select
              id="unit"
              value={sizeUnit}
              onChange={(e) => setSizeUnit(e.target.value as SizeUnit)}
              className="rounded-md border border-stone-300 px-3 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-500 dark:border-stone-700 dark:bg-stone-800"
            >
              <option value="HA">Hectares</option>
              <option value="AC">Acres</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="soil" className="mb-1 block text-sm font-medium">
            Soil type
          </label>
          <SoilTypeInput value={soilType} onChange={setSoilType} />
        </div>

        <div>
          <label htmlFor="notes" className="mb-1 block text-sm font-medium">
            Notes
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full rounded-md border border-stone-300 px-3 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-500 dark:border-stone-700 dark:bg-stone-800"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save"}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-md border border-stone-300 px-4 py-2 font-medium hover:bg-stone-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 dark:border-stone-700 dark:hover:bg-stone-800"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
