import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listSaves } from "../lib/queries/saves";
import { listFields } from "../lib/queries/fields";
import { listVehicles } from "../lib/queries/vehicles";
import { activeMapImage, mapLabel } from "../lib/maps";
import SaveWizard from "../components/SaveWizard";
import type { Save } from "../lib/types";

interface SaveWithCounts extends Save {
  fieldCount: number;
  vehicleCount: number;
}

/** The app's landing screen — every save gets one click into its own scoped instance of the
 * rest of the app (/s/:saveId/*). Deliberately spare chrome (no sidebar, no month stepper):
 * its only job is "pick a save or start one." */
export default function SavesHome() {
  const navigate = useNavigate();
  const [saves, setSaves] = useState<SaveWithCounts[]>([]);
  const [loading, setLoading] = useState(true);
  const [showWizard, setShowWizard] = useState(false);

  async function refresh() {
    const rows = await listSaves();
    const withCounts = await Promise.all(
      rows.map(async (save) => {
        const [fields, vehicles] = await Promise.all([listFields(save.id), listVehicles(save.id)]);
        return { ...save, fieldCount: fields.length, vehicleCount: vehicles.length };
      }),
    );
    setSaves(withCounts);
    setLoading(false);
  }

  useEffect(() => {
    refresh();
  }, []);

  if (loading) return <p className="p-6 text-text-dim">Loading…</p>;

  return (
    <div className="flex h-screen flex-col bg-surface-1 text-text">
      <div className="flex items-center gap-2.5 border-b border-border-faint bg-surface-4 px-6 py-3.5">
        <div className="flex h-[22px] w-[22px] items-center justify-center rounded bg-accent">
          <div className="h-2 w-2 rotate-45 rounded-[1px] bg-surface-0" />
        </div>
        <div className="text-[14.5px] font-semibold tracking-tight text-text">FarmSiM Manager</div>
      </div>

      <div className="min-h-0 flex-1 overflow-auto p-8">
        <div className="mx-auto max-w-[900px]">
          <div className="mb-5 flex items-baseline justify-between">
            <h1 className="text-[19px] font-semibold text-text">Your saves</h1>
            <span className="font-mono text-[10px] tracking-wide text-text-faint">
              {saves.length} {saves.length === 1 ? "SAVE" : "SAVES"} · STORED LOCALLY IN FARMSIM.DB
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {saves.map((save) => {
              const image = activeMapImage(save);
              return (
                <button
                  key={save.id}
                  type="button"
                  onClick={() => navigate(`/s/${save.id}`)}
                  className="flex flex-col gap-2.5 rounded-lg border border-border bg-surface-2 p-3.5 text-left hover:border-border-strong"
                >
                  <div
                    className="h-[70px] rounded-md border border-border-faint bg-surface-3 bg-cover bg-center"
                    style={image ? { backgroundImage: `url(${image})` } : undefined}
                  />
                  <div className="text-[13px] font-semibold text-text">{save.name}</div>
                  <div className="flex items-center gap-2.5 font-mono text-[9.5px] tracking-wide text-text-faint">
                    <span>{mapLabel(save).toUpperCase()}</span>
                    <span>{save.fieldCount} FIELDS</span>
                    <span>{save.vehicleCount} VEHICLES</span>
                  </div>
                  {save.dlc_owned.length > 0 && (
                    <span className="inline-flex w-fit items-center rounded bg-accent-bg px-1.5 py-0.5 font-mono text-[10px] font-semibold text-accent">
                      {save.dlc_owned.length} DLC
                    </span>
                  )}
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => setShowWizard(true)}
              className="flex min-h-[152px] flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-border-strong text-center text-[12px] text-text-faint hover:border-accent hover:text-accent"
            >
              <span className="text-xl text-text-subtle">+</span>
              New save
            </button>
          </div>
        </div>
      </div>

      {showWizard && (
        <SaveWizard
          existingNames={saves.map((s) => s.name)}
          onCreated={(id) => navigate(`/s/${id}`)}
          onCancel={() => setShowWizard(false)}
        />
      )}
    </div>
  );
}
