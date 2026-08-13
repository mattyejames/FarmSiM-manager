import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSave } from "../lib/saveContext";
import { renameSave, setSaveDlc, changeSaveMap, deleteSave } from "../lib/queries/saves";
import { listFields } from "../lib/queries/fields";
import { listVehicles } from "../lib/queries/vehicles";
import { listRotationEntries } from "../lib/queries/rotation";
import MapPicker from "../components/MapPicker";
import type { MapPickerValue } from "../components/MapPicker";
import ConfirmDialog from "../components/ConfirmDialog";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { INPUT_CLASS } from "../components/ui/inputStyles";
import { activeMapImage, mapLabel } from "../lib/maps";
import { DLC_CATALOGUE } from "../lib/dlc";

interface Counts {
  fields: number;
  pins: number;
  rotationEntries: number;
  vehicles: number;
}

export default function SaveSettings() {
  const navigate = useNavigate();
  const { saveId, save, refreshSave } = useSave();

  const [name, setName] = useState("");
  const [savingName, setSavingName] = useState(false);

  const [hasDlc, setHasDlc] = useState<boolean | null>(null);
  const [dlcSlugs, setDlcSlugs] = useState<string[]>([]);
  const [savingDlc, setSavingDlc] = useState(false);

  const [mapDraft, setMapDraft] = useState<MapPickerValue | null>(null);
  const [pendingMap, setPendingMap] = useState<MapPickerValue | null>(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [counts, setCounts] = useState<Counts>({ fields: 0, pins: 0, rotationEntries: 0, vehicles: 0 });

  useEffect(() => {
    if (!save) return;
    setName(save.name);
    setHasDlc(save.dlc_owned.length > 0);
    setDlcSlugs(save.dlc_owned);
  }, [save]);

  async function refreshCounts() {
    const [fields, vehicles, entries] = await Promise.all([
      listFields(saveId),
      listVehicles(saveId),
      listRotationEntries(saveId),
    ]);
    setCounts({
      fields: fields.length,
      pins: fields.filter((f) => f.map_x !== null && f.map_y !== null).length,
      rotationEntries: entries.length,
      vehicles: vehicles.length,
    });
  }

  useEffect(() => {
    refreshCounts();
  }, [saveId]);

  async function handleSaveName() {
    if (!name.trim()) return;
    setSavingName(true);
    await renameSave(saveId, name.trim());
    await refreshSave();
    setSavingName(false);
  }

  async function handleSaveDlc() {
    setSavingDlc(true);
    await setSaveDlc(saveId, hasDlc ? dlcSlugs : []);
    await refreshSave();
    setSavingDlc(false);
  }

  function toggleDlc(slug: string) {
    setDlcSlugs((prev) => (prev.includes(slug) ? prev.filter((d) => d !== slug) : [...prev, slug]));
  }

  function openMapPicker() {
    if (!save) return;
    setMapDraft({ mapKey: save.map_key, customImage: save.custom_image, customMapName: save.custom_map_name ?? "" });
  }

  function applyMapDraft() {
    if (!mapDraft?.mapKey || !save) return;
    const unchanged =
      mapDraft.mapKey === save.map_key &&
      (mapDraft.mapKey !== "custom" || mapDraft.customImage === save.custom_image);
    setMapDraft(null);
    if (unchanged) return;
    setPendingMap(mapDraft);
  }

  async function confirmMapChange() {
    if (!pendingMap?.mapKey) return;
    await changeSaveMap(saveId, pendingMap.mapKey, pendingMap.customImage, pendingMap.customMapName.trim() || null);
    setPendingMap(null);
    await Promise.all([refreshSave(), refreshCounts()]);
  }

  async function confirmDelete() {
    await deleteSave(saveId);
    navigate("/");
  }

  if (!save) return <p className="p-6 text-text-dim">Loading…</p>;

  return (
    <div className="flex h-full flex-col">
      <PageHeader title="Settings" subtitle={save.name.toUpperCase()} />

      <div className="min-h-0 flex-1 overflow-auto p-6">
        <div className="flex max-w-[560px] flex-col gap-3.5">
          <Card className="p-4">
            <h4 className="mb-0.5 text-[12.5px] font-semibold text-text">Save name</h4>
            <p className="mb-3 text-[11.5px] text-text-faint">
              Shown on the home screen and throughout this save.
            </p>
            <div className="flex items-center gap-2">
              <input value={name} onChange={(e) => setName(e.target.value)} className={INPUT_CLASS} />
              <Button type="button" variant="secondary" onClick={handleSaveName} disabled={savingName}>
                {savingName ? "Saving…" : "Save"}
              </Button>
            </div>
          </Card>

          <Card className="p-4">
            <h4 className="mb-0.5 text-[12.5px] font-semibold text-text">Map</h4>
            <p className="mb-3 text-[11.5px] text-text-faint">
              Changing this clears every field, pin, rotation entry and vehicle in this save.
            </p>
            {mapDraft ? (
              <div className="flex flex-col gap-3">
                <MapPicker value={mapDraft} onChange={setMapDraft} />
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="secondary" onClick={() => setMapDraft(null)}>
                    Cancel
                  </Button>
                  <Button type="button" variant="primary" onClick={applyMapDraft}>
                    Apply
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <div
                  className="h-10 w-14 flex-none rounded-md border border-border-faint bg-surface-3 bg-cover bg-center"
                  style={{ backgroundImage: `url(${activeMapImage(save) ?? ""})` }}
                />
                <div className="flex-1">
                  <div className="text-[12.5px] text-text">{mapLabel(save)}</div>
                  <div className="text-[10.5px] text-text-faint">
                    {save.map_key === "custom" ? "Custom map" : "Bundled map"}
                  </div>
                </div>
                <Button type="button" variant="danger" onClick={openMapPicker}>
                  Change map…
                </Button>
              </div>
            )}
          </Card>

          <Card className="p-4">
            <h4 className="mb-0.5 text-[12.5px] font-semibold text-text">DLC</h4>
            <p className="mb-3 text-[11.5px] text-text-faint">
              Informational for now — future crop/equipment coverage will read this list.
            </p>
            <div className="mb-2.5 flex items-center gap-2">
              <span className="text-[11.5px] text-text-dim">Any DLC installed?</span>
              <div className="ml-auto flex gap-1.5">
                <button
                  type="button"
                  onClick={() => setHasDlc(true)}
                  className={`rounded-md border px-3 py-1 text-[11.5px] font-semibold ${
                    hasDlc === true ? "border-accent bg-accent text-accent-ink" : "border-border text-text-dim"
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setHasDlc(false);
                    setDlcSlugs([]);
                  }}
                  className={`rounded-md border px-3 py-1 text-[11.5px] font-semibold ${
                    hasDlc === false ? "border-accent bg-accent text-accent-ink" : "border-border text-text-dim"
                  }`}
                >
                  No
                </button>
              </div>
            </div>
            {hasDlc && (
              <div className="mb-3 flex max-h-[160px] flex-col overflow-y-auto rounded-md border border-border bg-surface-4">
                {DLC_CATALOGUE.map((dlc) => (
                  <label
                    key={dlc.slug}
                    className="flex items-center gap-2 border-b border-border-faint px-2.5 py-1.5 text-[11.5px] text-text-dim last:border-b-0"
                  >
                    <input
                      type="checkbox"
                      checked={dlcSlugs.includes(dlc.slug)}
                      onChange={() => toggleDlc(dlc.slug)}
                      className="h-3 w-3 accent-accent"
                    />
                    {dlc.name}
                    {dlc.free && <span className="ml-auto font-mono text-[9px] text-accent">FREE</span>}
                  </label>
                ))}
              </div>
            )}
            <div className="flex justify-end">
              <Button type="button" variant="secondary" onClick={handleSaveDlc} disabled={savingDlc}>
                {savingDlc ? "Saving…" : "Save"}
              </Button>
            </div>
          </Card>

          <Card className="border-danger-border bg-danger-bg p-4">
            <h4 className="mb-0.5 text-[12.5px] font-semibold text-danger">Delete this save</h4>
            <p className="mb-3 text-[11.5px] text-danger opacity-85">
              Permanently removes this save and everything in it. Cannot be undone.
            </p>
            <Button type="button" variant="danger" onClick={() => setDeleteOpen(true)}>
              Delete save…
            </Button>
          </Card>
        </div>
      </div>

      {pendingMap?.mapKey && (
        <ConfirmDialog
          title="Change this save's map?"
          body={
            <>
              <p className="mb-2">
                <strong className="text-text">
                  {mapLabel(save)} → {mapLabel({ map_key: pendingMap.mapKey, custom_image: pendingMap.customImage, custom_map_name: pendingMap.customMapName })}.
                </strong>{" "}
                Fields, pins and rotation plans are only meaningful against the map they were entered on.
                Continuing will clear, for this save:
              </p>
              <ul className="list-disc pl-4">
                <li>{counts.pins} field pins</li>
                <li>
                  {counts.fields} fields and {counts.rotationEntries} rotation entries
                </li>
                <li>{counts.vehicles} vehicle records</li>
              </ul>
              <p className="mt-2 text-text-faint">
                This can't be undone — it's the same as starting this save over.
              </p>
            </>
          }
          confirmLabel="Clear data & switch map"
          onConfirm={confirmMapChange}
          onCancel={() => setPendingMap(null)}
        />
      )}

      {deleteOpen && (
        <ConfirmDialog
          title={`Delete "${save.name}"?`}
          body={
            <p>
              This permanently deletes <strong className="text-text">{save.name}</strong> and everything in it —{" "}
              {counts.fields} fields, {counts.rotationEntries} rotation entries, {counts.vehicles} vehicles, and its
              map pins. This can't be undone.
            </p>
          }
          confirmLabel="Delete save"
          confirmText={save.name}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteOpen(false)}
        />
      )}
    </div>
  );
}
