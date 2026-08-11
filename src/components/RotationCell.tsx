import { useState } from "react";
import CropPicker from "./CropPicker";
import { SEASON_LABELS } from "../lib/types";
import type { Season } from "../lib/types";

interface Props {
  fieldName: string;
  year: number;
  season: Season;
  initialCrop: string | null;
  initialNotes: string | null;
  onSave: (crop: string | null, notes: string | null) => Promise<void>;
  onClose: () => void;
}

export default function RotationCell({
  fieldName,
  year,
  season,
  initialCrop,
  initialNotes,
  onSave,
  onClose,
}: Props) {
  const [crop, setCrop] = useState(initialCrop);
  const [notes, setNotes] = useState(initialNotes ?? "");
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    await onSave(crop, notes.trim() || null);
    setSaving(false);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-lg bg-white p-5 shadow-xl dark:bg-stone-900"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-1 text-lg font-semibold">{fieldName}</h2>
        <p className="mb-4 text-sm text-stone-500">
          Year {year} · {SEASON_LABELS[season]}
        </p>

        <label htmlFor="crop" className="mb-1 block text-sm font-medium">
          Crop
        </label>
        <CropPicker value={crop} onChange={setCrop} />

        <label htmlFor="cell-notes" className="mb-1 mt-4 block text-sm font-medium">
          Notes
        </label>
        <textarea
          id="cell-notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
          className="w-full rounded-md border border-stone-300 px-3 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-500 dark:border-stone-700 dark:bg-stone-800"
        />

        <div className="mt-5 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-stone-300 px-4 py-2 font-medium hover:bg-stone-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 dark:border-stone-700 dark:hover:bg-stone-800"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="rounded-md bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
