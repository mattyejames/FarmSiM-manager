import { useState } from "react";
import Card from "./ui/Card";
import Button from "./ui/Button";
import MapPicker from "./MapPicker";
import { INPUT_CLASS } from "./ui/inputStyles";
import { createSave } from "../lib/queries/saves";
import { DLC_CATALOGUE } from "../lib/dlc";
import { BUNDLED_MAP_LABELS } from "../lib/maps";
import type { MapKey } from "../lib/types";

interface Props {
  existingNames: string[];
  onCreated: (saveId: string) => void;
  onCancel: () => void;
}

interface WizardState {
  name: string;
  hasDlc: boolean | null;
  dlcSlugs: string[];
  mapKey: MapKey | null;
  customImage: string | null;
  customMapName: string;
}

const INITIAL_STATE: WizardState = {
  name: "",
  hasDlc: null,
  dlcSlugs: [],
  mapKey: null,
  customImage: null,
  customMapName: "",
};

const STEP_TITLES = ["Name & DLC", "Map", "Review"];

/** Three steps, nothing written to the database until "Create save" on the last one — Back
 * never discards what's already been entered. Step 2 (the map picker) is the same component
 * Settings' "change map" flow will reuse for an existing save. */
export default function SaveWizard({ existingNames, onCreated, onCancel }: Props) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [state, setState] = useState<WizardState>(INITIAL_STATE);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  function patch(partial: Partial<WizardState>) {
    setState((s) => ({ ...s, ...partial }));
  }

  function toggleDlc(slug: string) {
    setState((s) => ({
      ...s,
      dlcSlugs: s.dlcSlugs.includes(slug) ? s.dlcSlugs.filter((d) => d !== slug) : [...s.dlcSlugs, slug],
    }));
  }

  function validateStep1(): string | null {
    if (!state.name.trim()) return "Give this save a name.";
    if (existingNames.includes(state.name.trim())) return "You already have a save called that.";
    if (state.hasDlc === null) return "Let us know if you have any DLC installed.";
    return null;
  }

  function validateStep2(): string | null {
    if (!state.mapKey) return "Pick a bundled map or upload your own.";
    if (state.mapKey === "custom" && !state.customImage) return "That file doesn't look like an image.";
    return null;
  }

  function handleNext() {
    const err = step === 1 ? validateStep1() : validateStep2();
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    setStep((s) => (s === 1 ? 2 : 3));
  }

  function handleBack() {
    setError(null);
    setStep((s) => (s === 3 ? 2 : 1));
  }

  async function handleCreate() {
    if (!state.mapKey) return;
    setCreating(true);
    const id = await createSave({
      name: state.name.trim(),
      map_key: state.mapKey,
      custom_image: state.mapKey === "custom" ? state.customImage : null,
      custom_map_name: state.mapKey === "custom" ? state.customMapName.trim() || null : null,
      dlc_owned: state.hasDlc ? state.dlcSlugs : [],
    });
    onCreated(id);
  }

  const mapLabel =
    state.mapKey === "custom"
      ? state.customMapName.trim() || "Custom map"
      : state.mapKey
        ? BUNDLED_MAP_LABELS[state.mapKey]
        : "—";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" role="dialog" aria-modal="true">
      <Card className="flex w-full max-w-md flex-col shadow-2xl">
        <div className="flex flex-col gap-2.5 border-b border-border-faint px-[18px] pb-3.5 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[15px] font-semibold text-text">New save</h2>
            <button type="button" onClick={onCancel} className="text-text-faint hover:text-text-dim" aria-label="Cancel">
              ✕
            </button>
          </div>
          <div className="flex items-center gap-1.5">
            {STEP_TITLES.map((title, i) => {
              const n = (i + 1) as 1 | 2 | 3;
              const done = n < step;
              const active = n === step;
              return (
                <div key={title} className="flex items-center gap-1.5">
                  {i > 0 && <div className="h-px w-4 bg-border-strong" />}
                  <div
                    className={`flex items-center gap-1.5 font-mono text-[10px] tracking-wide ${
                      active ? "text-text" : done ? "text-text-dimmer" : "text-text-subtle"
                    }`}
                  >
                    <span
                      className={`flex h-[18px] w-[18px] items-center justify-center rounded-full border text-[10px] ${
                        done
                          ? "border-accent bg-accent text-accent-ink"
                          : active
                            ? "border-accent text-accent"
                            : "border-border-strong"
                      }`}
                    >
                      {done ? "✓" : n}
                    </span>
                    {title}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-3.5 px-[18px] py-4">
          {step === 1 && (
            <>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="save-name" className="font-mono text-[9.5px] tracking-wide text-text-faint">
                  SAVE NAME
                </label>
                <input
                  id="save-name"
                  value={state.name}
                  onChange={(e) => patch({ name: e.target.value })}
                  placeholder="e.g. Riverbend Co-op"
                  className={INPUT_CLASS}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[9.5px] tracking-wide text-text-faint">
                  DO YOU HAVE ANY DLC INSTALLED?
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => patch({ hasDlc: true })}
                    className={`flex-1 rounded-md border py-2 text-[12.5px] font-semibold ${
                      state.hasDlc === true
                        ? "border-accent bg-accent text-accent-ink"
                        : "border-border text-text-dim hover:bg-surface-hover"
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => patch({ hasDlc: false, dlcSlugs: [] })}
                    className={`flex-1 rounded-md border py-2 text-[12.5px] font-semibold ${
                      state.hasDlc === false
                        ? "border-accent bg-accent text-accent-ink"
                        : "border-border text-text-dim hover:bg-surface-hover"
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>
              {state.hasDlc && (
                <div className="flex max-h-[160px] flex-col overflow-y-auto rounded-md border border-border bg-surface-4">
                  {DLC_CATALOGUE.map((dlc) => (
                    <label
                      key={dlc.slug}
                      className="flex items-center gap-2 border-b border-border-faint px-2.5 py-1.5 text-[11.5px] text-text-dim last:border-b-0"
                    >
                      <input
                        type="checkbox"
                        checked={state.dlcSlugs.includes(dlc.slug)}
                        onChange={() => toggleDlc(dlc.slug)}
                        className="h-3 w-3 accent-accent"
                      />
                      {dlc.name}
                      {dlc.free && <span className="ml-auto font-mono text-[9px] text-accent">FREE</span>}
                    </label>
                  ))}
                </div>
              )}
            </>
          )}

          {step === 2 && (
            <>
              <p className="text-[11.5px] text-text-faint">
                Every field, pin and rotation you enter will be plotted against this image.
              </p>
              <MapPicker
                value={{ mapKey: state.mapKey, customImage: state.customImage, customMapName: state.customMapName }}
                onChange={(v) => patch({ mapKey: v.mapKey, customImage: v.customImage, customMapName: v.customMapName })}
              />
            </>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-2.5">
              <div className="flex justify-between border-b border-border-faint pb-2.5">
                <span className="font-mono text-[9.5px] tracking-wide text-text-faint">NAME</span>
                <span className="text-[12.5px] text-text">{state.name}</span>
              </div>
              <div className="flex justify-between border-b border-border-faint pb-2.5">
                <span className="font-mono text-[9.5px] tracking-wide text-text-faint">DLC</span>
                <span className="text-[12.5px] text-text">
                  {state.hasDlc ? `${state.dlcSlugs.length} selected` : "None"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono text-[9.5px] tracking-wide text-text-faint">MAP</span>
                <span className="text-[12.5px] text-text">{mapLabel}</span>
              </div>
            </div>
          )}

          {error && (
            <p className="rounded-md border border-danger-border bg-danger-bg px-3 py-2 text-[12.5px] text-danger">
              {error}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-border-faint px-[18px] py-3.5">
          <Button type="button" variant="secondary" onClick={step === 1 ? onCancel : handleBack}>
            {step === 1 ? "Cancel" : "Back"}
          </Button>
          {step < 3 ? (
            <Button type="button" variant="primary" onClick={handleNext}>
              Next: {STEP_TITLES[step]} →
            </Button>
          ) : (
            <Button type="button" variant="primary" onClick={handleCreate} disabled={creating}>
              {creating ? "Creating…" : "Create save"}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
