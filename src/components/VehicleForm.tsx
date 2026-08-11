import { useState } from "react";
import type { FormEvent } from "react";
import Card from "./ui/Card";
import Button from "./ui/Button";
import { INPUT_CLASS } from "./ui/inputStyles";
import { EQUIPMENT_CATEGORIES } from "../lib/equipment";
import type { Vehicle } from "../lib/types";

interface Props {
  vehicle: Vehicle | null;
  onSave: (input: { name: string; category: string; notes: string | null }) => Promise<void>;
  onDelete?: () => void;
  onClose: () => void;
}

/** Add/edit vehicle modal — category is free text with suggestions, same pattern as SoilTypeInput. */
export default function VehicleForm({ vehicle, onSave, onDelete, onClose }: Props) {
  const [name, setName] = useState(vehicle?.name ?? "");
  const [category, setCategory] = useState(vehicle?.category ?? "");
  const [notes, setNotes] = useState(vehicle?.notes ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!name.trim()) {
      setError("Name is required.");
      return;
    }
    if (!category.trim()) {
      setError("Category is required.");
      return;
    }
    setSaving(true);
    try {
      await onSave({ name: name.trim(), category: category.trim(), notes: notes.trim() || null });
    } catch (err) {
      setError(String(err));
      setSaving(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <Card className="w-full max-w-[420px] shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-between border-b border-border-faint px-[18px] py-3.5">
            <h2 className="text-[14.5px] font-semibold text-text">{vehicle ? "Edit vehicle" : "Add a vehicle"}</h2>
            <button type="button" onClick={onClose} className="text-text-faint hover:text-text-dim" aria-label="Close">
              ✕
            </button>
          </div>

          <div className="flex flex-col gap-3.5 px-[18px] py-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="vehicle-name" className="font-mono text-[9.5px] tracking-wide text-text-faint">
                NAME
              </label>
              <input
                id="vehicle-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Krone BiG X 780"
                className={INPUT_CLASS}
                autoFocus
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="vehicle-category" className="font-mono text-[9.5px] tracking-wide text-text-faint">
                EQUIPMENT CATEGORY
              </label>
              <input
                id="vehicle-category"
                list="equipment-category-suggestions"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Forage harvester + forage header"
                className={INPUT_CLASS}
              />
              <datalist id="equipment-category-suggestions">
                {EQUIPMENT_CATEGORIES.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="vehicle-notes" className="font-mono text-[9.5px] tracking-wide text-text-faint">
                NOTES — OPTIONAL
              </label>
              <textarea
                id="vehicle-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                placeholder="e.g. leased until Year 6"
                className={INPUT_CLASS}
              />
            </div>

            {error && (
              <p className="rounded-md border border-danger-border bg-danger-bg px-3 py-2 text-sm text-danger">
                {error}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 border-t border-border-faint px-[18px] py-3.5">
            {vehicle && onDelete && (
              <Button type="button" variant="danger" onClick={onDelete}>
                Delete
              </Button>
            )}
            <div className="ml-auto flex gap-2">
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={saving}>
                {saving ? "Saving…" : vehicle ? "Save vehicle" : "Add vehicle"}
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}
