import { useEffect, useMemo, useRef, useState } from "react";
import type { ChangeEvent, MouseEvent } from "react";
import { Link } from "react-router-dom";
import { listFields, updateFieldPin } from "../lib/queries/fields";
import { listRotationEntries } from "../lib/queries/rotation";
import { getMapSelection, setMapSelection } from "../lib/queries/map";
import { useSave } from "../lib/saveContext";
import { activeMapImage, mapLabel, BUNDLED_MAP_KEYS, BUNDLED_MAP_LABELS } from "../lib/maps";
import { dominantCrop } from "../lib/rotationSummary";
import { useGameState } from "../lib/gameStateContext";
import PageHeader from "../components/ui/PageHeader";
import type { Field, MapKey, MapSelection, RotationEntry } from "../lib/types";
import { NO_CROP_LABEL } from "../lib/crops";

export default function MapScreen() {
  const { saveId, basePath } = useSave();
  const { gameState } = useGameState();
  const [fields, setFields] = useState<Field[]>([]);
  const [entries, setEntries] = useState<RotationEntry[]>([]);
  const [selection, setSelection] = useState<MapSelection | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [placingFieldId, setPlacingFieldId] = useState<string | null>(null);
  const [cropFilter, setCropFilter] = useState<Set<string>>(new Set());
  const viewportRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function refresh() {
    const [f, e, sel] = await Promise.all([listFields(saveId), listRotationEntries(saveId), getMapSelection()]);
    setFields(f);
    setEntries(e);
    setSelection(sel);
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    refresh();
  }, [saveId]);

  const currentYear = gameState?.current_year ?? 1;

  const cropCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const field of fields) {
      const crop = dominantCrop(entries.filter((e) => e.field_id === field.id && e.year === currentYear));
      const key = crop ?? NO_CROP_LABEL;
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [fields, entries, currentYear]);

  const pinnedFields = fields.filter((f) => f.map_x !== null && f.map_y !== null);
  const unpinnedFields = fields.filter((f) => f.map_x === null || f.map_y === null);

  const visiblePins = pinnedFields.filter((f) => {
    if (cropFilter.size === 0) return true;
    const crop = dominantCrop(entries.filter((e) => e.field_id === f.id && e.year === currentYear)) ?? NO_CROP_LABEL;
    return cropFilter.has(crop);
  });

  const selectedField = fields.find((f) => f.id === selectedFieldId) ?? null;
  const selectedFieldEntries = selectedField ? entries.filter((e) => e.field_id === selectedField.id) : [];
  const selectedFieldYears = [...new Set(selectedFieldEntries.map((e) => e.year))].sort((a, b) => a - b).slice(-5);

  function toggleCropFilter(crop: string) {
    setCropFilter((prev) => {
      const next = new Set(prev);
      if (next.has(crop)) next.delete(crop);
      else next.add(crop);
      return next;
    });
  }

  async function handleViewportClick(e: MouseEvent<HTMLDivElement>) {
    if (!placingFieldId || !viewportRef.current) return;
    const rect = viewportRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    await updateFieldPin(placingFieldId, Math.max(0, Math.min(100, x)), Math.max(0, Math.min(100, y)));
    setSelectedFieldId(placingFieldId);
    setPlacingFieldId(null);
    await refresh();
  }

  async function handleSwitchMap(key: MapKey) {
    if (key === selection?.map_key) return;
    if (pinnedFields.length > 0) {
      const ok = confirm(
        "Switching maps clears every field's pin, since positions are measured against the current map image. Continue?",
      );
      if (!ok) return;
      await Promise.all(fields.map((f) => updateFieldPin(f.id, null, null)));
    }
    await setMapSelection(key, key === "custom" ? (selection?.custom_image ?? null) : null);
    setSelectedFieldId(null);
    await refresh();
  }

  async function handleCustomImage(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = String(reader.result);
      if (pinnedFields.length > 0 && selection?.map_key !== "custom") {
        const ok = confirm(
          "Switching maps clears every field's pin, since positions are measured against the current map image. Continue?",
        );
        if (!ok) return;
        await Promise.all(fields.map((f) => updateFieldPin(f.id, null, null)));
      }
      await setMapSelection("custom", dataUrl);
      await refresh();
    };
    reader.readAsDataURL(file);
  }

  if (loading || !selection) return <p className="p-6 text-text-dim">Loading…</p>;

  const imageSrc = activeMapImage(selection);

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="Map"
        subtitle={`${pinnedFields.length} OF ${fields.length} FIELDS PINNED · ${mapLabel(selection).toUpperCase()}`}
      />

      <div className="flex min-h-0 flex-1">
        <div className="flex w-[236px] flex-none flex-col border-r border-border-faint bg-surface-4">
          <div className="px-4 pb-2.5 pt-3.5 font-mono text-xs font-semibold tracking-wide text-accent">
            FILTER BY CROP
          </div>
          <div className="flex flex-col gap-0.5 px-2.5">
            {cropCounts.map(([crop, count]) => {
              const active = cropFilter.has(crop);
              return (
                <button
                  key={crop}
                  onClick={() => toggleCropFilter(crop)}
                  className={`flex items-center gap-2.5 rounded px-2.5 py-2 text-left ${active ? "bg-surface-hover" : ""}`}
                >
                  <span className={`h-3 w-3 rounded-sm ${crop === NO_CROP_LABEL ? "bg-surface-hover" : "bg-accent"}`} />
                  <span className={`flex-1 text-[12.5px] ${active ? "font-medium text-text" : "text-text-dim"}`}>
                    {crop}
                  </span>
                  <span className="font-mono text-[10.5px] text-text-faint">{count}</span>
                </button>
              );
            })}
          </div>

          {unpinnedFields.length > 0 && (
            <div className="mt-4 flex flex-col gap-1.5 border-t border-border-faint px-4 pt-3.5">
              <span className="font-mono text-[10px] tracking-wide text-text-faint">
                UNPINNED — {unpinnedFields.length}
              </span>
              {unpinnedFields.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setPlacingFieldId(f.id)}
                  className={`rounded px-2 py-1.5 text-left text-[12px] ${
                    placingFieldId === f.id ? "bg-accent text-accent-ink" : "text-text-dim hover:bg-surface-hover"
                  }`}
                >
                  {placingFieldId === f.id ? `Click the map for ${f.name}` : `+ Pin ${f.name}`}
                </button>
              ))}
            </div>
          )}

          <div className="mt-auto flex flex-col gap-2 border-t border-border-faint px-4 py-3.5">
            <span className="font-mono text-[10px] tracking-wide text-text-faint">MY MAPS</span>
            <div className="flex flex-col gap-1">
              {BUNDLED_MAP_KEYS.map((key) => (
                <button
                  key={key}
                  onClick={() => handleSwitchMap(key)}
                  className={`flex justify-between rounded px-2 py-1.5 text-[11.5px] ${
                    selection.map_key === key ? "bg-accent font-semibold text-accent-ink" : "text-text-dim hover:bg-surface-hover"
                  }`}
                >
                  {BUNDLED_MAP_LABELS[key]}
                </button>
              ))}
              {selection.map_key === "custom" && (
                <div className="rounded bg-accent px-2 py-1.5 text-[11.5px] font-semibold text-accent-ink">
                  Custom map
                </div>
              )}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="rounded border border-dashed border-border-strong py-1.5 text-center text-[11px] text-text-faint hover:text-text-dim"
            >
              + Add a map image
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleCustomImage} />
          </div>
        </div>

        <div
          ref={viewportRef}
          onClick={handleViewportClick}
          className={`relative flex-1 overflow-hidden bg-black ${placingFieldId ? "cursor-crosshair" : ""}`}
        >
          {imageSrc ? (
            <img src={imageSrc} alt={mapLabel(selection)} className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-text-subtle">
              No map image set — add one from "My maps".
            </div>
          )}
          {visiblePins.map((f) => (
            <button
              key={f.id}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedFieldId(f.id);
                setPlacingFieldId(null);
              }}
              style={{ left: `${f.map_x}%`, top: `${f.map_y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold shadow ${
                f.id === selectedFieldId ? "bg-accent text-accent-ink ring-2 ring-accent/40" : "bg-surface-0/90 text-text"
              }`}
            >
              {f.number ?? "?"}
            </button>
          ))}
          {placingFieldId && (
            <div className="absolute left-3.5 top-3 rounded bg-accent px-3 py-1.5 text-xs font-semibold tracking-wide text-accent-ink">
              CLICK TO PLACE {fields.find((f) => f.id === placingFieldId)?.name.toUpperCase()}
            </div>
          )}
        </div>

        <div className="flex w-[324px] flex-none flex-col overflow-y-auto border-l border-border-faint bg-surface-4">
          {selectedField ? (
            <>
              <div className="flex flex-col gap-2.5 border-b border-border-faint p-4">
                <div className="flex items-center gap-2.5">
                  {selectedField.number !== null && (
                    <span className="rounded bg-surface-hover px-1.5 py-0.5 font-mono text-[13px] font-semibold text-accent">
                      {selectedField.number}
                    </span>
                  )}
                  <span className="text-[15px] font-semibold text-text">{selectedField.name}</span>
                </div>
                <span className="font-mono text-[10.5px] tracking-wide text-text-faint">
                  {selectedField.size_value} {selectedField.size_unit}
                  {selectedField.soil_type ? ` · ${selectedField.soil_type.toUpperCase()}` : ""}
                </span>
              </div>
              <div className="flex flex-col gap-2.5 p-4">
                <span className="font-mono text-[10px] tracking-wide text-accent">ROTATION</span>
                {selectedFieldYears.length === 0 ? (
                  <p className="text-[12.5px] text-text-dim">No rotation planned yet.</p>
                ) : (
                  selectedFieldYears.map((year) => {
                    const crop = dominantCrop(selectedFieldEntries.filter((e) => e.year === year));
                    return (
                      <div key={year} className="flex items-center gap-2.5">
                        <span className="w-8 font-mono text-[10.5px] text-text-faint">YR {year}</span>
                        <span
                          className={`flex-1 rounded px-2.5 py-1.5 text-[12.5px] ${
                            crop ? "bg-surface-3 text-text-muted" : "border border-dashed border-border text-text-ghost"
                          }`}
                        >
                          {crop ?? NO_CROP_LABEL}
                        </span>
                      </div>
                    );
                  })
                )}
                <div className="mt-2 flex gap-2">
                  <Link
                    to={`${basePath}/rotation`}
                    className="flex-1 rounded-md bg-accent py-2 text-center text-[12.5px] font-semibold text-accent-ink"
                  >
                    Edit rotation
                  </Link>
                  <Link
                    to={`${basePath}/fields/${selectedField.id}`}
                    className="rounded-md border border-border px-3.5 py-2 text-[12.5px] text-text-dim"
                  >
                    Field info
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center p-6 text-center text-[12.5px] text-text-subtle">
              Click a numbered pin to see that field, or pin an unplaced field from the sidebar.
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 border-t border-border-faint bg-surface-4 px-4 py-2 font-mono text-[11px] tracking-wide text-text-faint">
        <span>
          <span className="text-accent">CLICK</span> A PIN TO SELECT · <span className="text-accent">+ PIN</span>{" "}
          FROM THE SIDEBAR TO PLACE AN UNPINNED FIELD
        </span>
      </div>
    </div>
  );
}
