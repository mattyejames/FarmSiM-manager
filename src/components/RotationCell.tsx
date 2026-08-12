import { useState } from "react";
import CropPicker from "./CropPicker";
import Card from "./ui/Card";
import Button from "./ui/Button";
import { INPUT_CLASS } from "./ui/inputStyles";
import { SEASONS, SEASON_LABELS } from "../lib/types";
import type { RotationEntry, Season } from "../lib/types";
import { getCropInfo, formatMonthRange } from "../lib/crops";

interface Props {
  fieldName: string;
  fieldNumber: number | null;
  sizeLabel: string;
  year: number;
  initialSeason: Season;
  entriesBySeason: Partial<Record<Season, RotationEntry>>;
  onSave: (season: Season, crop: string | null, notes: string | null) => Promise<void>;
  onClose: () => void;
}

/** Edits a field's rotation for a whole year at once — season tabs switch which season's
 * crop/notes are being edited, matching the redesigned grid's "years as columns" view (the
 * underlying data is still per-season, saved one season at a time on "Save"). */
export default function RotationCell({
  fieldName,
  fieldNumber,
  sizeLabel,
  year,
  initialSeason,
  entriesBySeason,
  onSave,
  onClose,
}: Props) {
  const [season, setSeason] = useState<Season>(initialSeason);
  const [drafts, setDrafts] = useState<Record<Season, { crop: string | null; notes: string }>>(() => {
    const initial = {} as Record<Season, { crop: string | null; notes: string }>;
    for (const s of SEASONS) {
      initial[s] = { crop: entriesBySeason[s]?.crop ?? null, notes: entriesBySeason[s]?.notes ?? "" };
    }
    return initial;
  });
  const [saving, setSaving] = useState(false);

  const draft = drafts[season];
  const cropInfo = getCropInfo(draft.crop);
  const isReplantingType = cropInfo?.growthType === "annual" || cropInfo?.growthType === "forage";
  const offSeason = isReplantingType && !cropInfo?.sowSeasons.includes(season);
  const sowMonthLabel = cropInfo ? formatMonthRange(cropInfo.sowMonths) : "";

  function patchDraft(patch: Partial<{ crop: string | null; notes: string }>) {
    setDrafts((prev) => ({ ...prev, [season]: { ...prev[season], ...patch } }));
  }

  async function handleSave() {
    setSaving(true);
    await onSave(season, draft.crop, draft.notes.trim() || null);
    setSaving(false);
  }

  async function handleClear() {
    setSaving(true);
    await onSave(season, null, null);
    setSaving(false);
    patchDraft({ crop: null, notes: "" });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <Card className="w-full max-w-sm shadow-2xl" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <div className="flex flex-col gap-1 border-b border-border-faint px-[18px] pb-3.5 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {fieldNumber !== null && (
                <span className="rounded bg-surface-hover px-1.5 py-0.5 font-mono text-[11px] font-semibold text-accent">
                  {fieldNumber}
                </span>
              )}
              <h2 className="text-[15px] font-semibold text-text">{fieldName}</h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-text-faint hover:text-text-dim"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
          <p className="font-mono text-[10.5px] tracking-wide text-text-faint">
            YEAR {year} · {SEASON_LABELS[season].toUpperCase()} · {sizeLabel}
          </p>
        </div>

        <div className="flex flex-col gap-3.5 px-[18px] py-4">
          <div className="flex gap-0.5 rounded-md border border-border bg-surface-4 p-0.5">
            {SEASONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSeason(s)}
                className={`flex-1 rounded py-1.5 text-center text-[11.5px] transition-colors ${
                  s === season ? "bg-surface-3 font-semibold text-text" : "text-text-dimmer hover:text-text-dim"
                }`}
              >
                {SEASON_LABELS[s]}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[9.5px] tracking-wide text-text-faint">CROP</label>
            <CropPicker value={draft.crop} onChange={(crop) => patchDraft({ crop })} />
          </div>

          {cropInfo && (
            <div className="flex flex-col gap-1.5 text-sm">
              <p className="font-mono text-[10px] text-text-faint">
                SOW {formatMonthRange(cropInfo.sowMonths).toUpperCase()} · HARVEST{" "}
                {formatMonthRange(cropInfo.harvestMonths).toUpperCase()}
              </p>
              {offSeason && (
                <p className="rounded-md border border-warn-border bg-warn-bg px-3 py-2 text-[12.5px] leading-snug text-text-muted">
                  ⚠ {cropInfo.name} is normally sown {sowMonthLabel} — sowing in {SEASON_LABELS[season]} may
                  reduce yield or fail to mature.
                  {cropInfo.confidence === "low" &&
                    " Season data for this crop is unconfirmed — treat as a rough guide."}
                </p>
              )}
              {cropInfo.growthType === "perennial" && (
                <p className="rounded-md border border-info-border bg-info-bg px-3 py-2 text-[12.5px] leading-snug text-text-muted">
                  Perennial — plant once, then it regrows each year without replanting.
                </p>
              )}
              {cropInfo.growthType === "ratoon" && (
                <p className="rounded-md border border-info-border bg-info-bg px-3 py-2 text-[12.5px] leading-snug text-text-muted">
                  Regrows after harvest without replanting, but will need replowing after a few cycles.
                </p>
              )}
              {cropInfo.note && <p className="text-[12.5px] text-text-faint">{cropInfo.note}</p>}
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label htmlFor="cell-notes" className="font-mono text-[9.5px] tracking-wide text-text-faint">
              NOTES
            </label>
            <textarea
              id="cell-notes"
              value={draft.notes}
              onChange={(e) => patchDraft({ notes: e.target.value })}
              rows={2}
              placeholder="Optional — e.g. “lime first”"
              className={INPUT_CLASS}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 border-t border-border-faint px-[18px] py-3.5">
          <button
            type="button"
            onClick={handleClear}
            className="text-[12.5px] text-text-subtle hover:text-text-dim"
          >
            Clear cell
          </button>
          <div className="ml-auto flex gap-2">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="button" variant="primary" onClick={handleSave} disabled={saving}>
              {saving ? "Saving…" : "Save"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
