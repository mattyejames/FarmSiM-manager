import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createField, getField, updateField } from "../lib/queries/fields";
import SoilTypeInput from "../components/SoilTypeInput";
import PageHeader from "../components/ui/PageHeader";
import Button from "../components/ui/Button";
import { INPUT_CLASS } from "../components/ui/inputStyles";
import type { SizeUnit } from "../lib/types";

export default function FieldForm() {
  const { fieldId } = useParams();
  const isEdit = Boolean(fieldId);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
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
        setNumber(field.number !== null ? String(field.number) : "");
        setSizeValue(String(field.size_value));
        setSizeUnit(field.size_unit);
        setSoilType(field.soil_type ?? "");
        setNotes(field.notes ?? "");
      }
      setLoading(false);
    });
  }, [fieldId]);

  async function handleSubmit(e: FormEvent) {
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
    const parsedNumber = number.trim() ? Number(number) : null;
    if (parsedNumber !== null && (!Number.isInteger(parsedNumber) || parsedNumber < 0)) {
      setError("Field number must be a whole number.");
      return;
    }

    setSaving(true);
    const input = {
      name: name.trim(),
      number: parsedNumber,
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

  if (loading) return <p className="p-6 text-text-dim">Loading…</p>;

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title={isEdit ? "Edit field" : "New field"}
        actions={
          <>
            <Button type="button" variant="secondary" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button type="submit" form="field-form" variant="primary" disabled={saving}>
              {saving ? "Saving…" : "Save field"}
            </Button>
          </>
        }
      />

      <div className="flex min-h-0 flex-1 overflow-auto">
        <form id="field-form" onSubmit={handleSubmit} className="flex max-w-[600px] flex-1 flex-col gap-5 p-7">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="font-mono text-[9.5px] tracking-wide text-text-faint">
              FIELD NAME
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. North Ridge"
              className={INPUT_CLASS}
            />
          </div>

          <div className="flex gap-3">
            <div className="flex-1 flex-col gap-1.5">
              <label htmlFor="number" className="font-mono text-[9.5px] tracking-wide text-text-faint">
                FIELD NUMBER — OPTIONAL
              </label>
              <input
                id="number"
                type="number"
                inputMode="numeric"
                min="0"
                step="1"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="e.g. 34"
                className={`${INPUT_CLASS} mt-1.5 font-mono`}
              />
            </div>
          </div>

          <div className="flex items-end gap-3">
            <div className="flex-1">
              <label htmlFor="size" className="mb-1.5 block font-mono text-[9.5px] tracking-wide text-text-faint">
                SIZE
              </label>
              <input
                id="size"
                type="number"
                inputMode="decimal"
                step="any"
                min="0"
                value={sizeValue}
                onChange={(e) => setSizeValue(e.target.value)}
                className={`${INPUT_CLASS} font-mono`}
              />
            </div>
            <div className="flex gap-0.5 rounded-md border border-border bg-surface-4 p-0.5">
              {(["HA", "AC"] as SizeUnit[]).map((unit) => (
                <button
                  key={unit}
                  type="button"
                  onClick={() => setSizeUnit(unit)}
                  className={`rounded px-3.5 py-2 font-mono text-xs font-semibold ${
                    sizeUnit === unit ? "bg-surface-3 text-text" : "text-text-faint"
                  }`}
                >
                  {unit}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="soil" className="font-mono text-[9.5px] tracking-wide text-text-faint">
              SOIL TYPE — FREE TEXT, SUGGESTIONS BELOW
            </label>
            <SoilTypeInput value={soilType} onChange={setSoilType} />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-baseline justify-between">
              <label htmlFor="notes" className="font-mono text-[9.5px] tracking-wide text-text-faint">
                NOTES
              </label>
              <span className="font-mono text-[9.5px] text-text-subtle">{notes.length} / 500</span>
            </div>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value.slice(0, 500))}
              rows={3}
              className={INPUT_CLASS}
            />
          </div>

          {error && (
            <p className="rounded-md border border-danger-border bg-danger-bg px-3 py-2 text-sm text-danger">
              {error}
            </p>
          )}
        </form>

        <div className="w-[300px] flex-none border-l border-border-faint p-6">
          <div className="mb-3 font-mono text-[9.5px] tracking-wide text-text-faint">PREVIEW</div>
          <div className="overflow-hidden rounded-lg border border-border">
            <div className="relative flex h-24 items-center justify-center bg-surface-3 text-text-subtle">
              <span className="font-mono text-[10px] tracking-wide">no map pin yet</span>
            </div>
            <div className="flex flex-col gap-1 px-3.5 py-3">
              <div className="flex items-center gap-2">
                {number.trim() && (
                  <span className="rounded bg-surface-hover px-1.5 py-0.5 font-mono text-[11px] font-semibold text-accent">
                    {number}
                  </span>
                )}
                <span className="text-sm font-semibold text-text">{name || "Field name"}</span>
              </div>
              <span className="font-mono text-[10.5px] text-text-faint">
                {sizeValue || "0"} {sizeUnit}
                {soilType ? ` · ${soilType.toUpperCase()}` : ""}
              </span>
            </div>
          </div>
          <p className="mt-4 text-[12.5px] leading-relaxed text-text-subtle">
            Saving adds this field to the rotation grid with 8 years empty. Place its pin on the{" "}
            <span className="text-text-dim">Map</span> screen once it's saved.
          </p>
        </div>
      </div>
    </div>
  );
}
