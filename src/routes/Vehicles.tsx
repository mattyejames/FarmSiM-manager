import { useEffect, useMemo, useState } from "react";
import { listFields } from "../lib/queries/fields";
import { listRotationEntries } from "../lib/queries/rotation";
import { listVehicles, createVehicle, updateVehicle, deleteVehicle } from "../lib/queries/vehicles";
import { coverageForRotation, cropCountForCategory } from "../lib/equipment";
import type { EquipmentCategory } from "../lib/equipment";
import VehicleForm from "../components/VehicleForm";
import PageHeader from "../components/ui/PageHeader";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import type { Field, RotationEntry, Vehicle } from "../lib/types";

export default function Vehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [fields, setFields] = useState<Field[]>([]);
  const [entries, setEntries] = useState<RotationEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<Vehicle | null | undefined>(undefined);

  async function refresh() {
    const [v, f, e] = await Promise.all([listVehicles(), listFields(), listRotationEntries()]);
    setVehicles(v);
    setFields(f);
    setEntries(e);
    setLoading(false);
  }

  useEffect(() => {
    refresh();
  }, []);

  const coverage = useMemo(() => coverageForRotation(vehicles, fields, entries), [vehicles, fields, entries]);

  const visibleVehicles = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return vehicles;
    return vehicles.filter((v) => v.name.toLowerCase().includes(q) || v.category.toLowerCase().includes(q));
  }, [vehicles, search]);

  async function handleSave(input: { name: string; category: string; notes: string | null }) {
    if (editing) {
      await updateVehicle(editing.id, input);
    } else {
      await createVehicle(input);
    }
    setEditing(undefined);
    await refresh();
  }

  async function handleDelete() {
    if (!editing) return;
    if (!confirm(`Remove ${editing.name}?`)) return;
    await deleteVehicle(editing.id);
    setEditing(undefined);
    await refresh();
  }

  if (loading) return <p className="p-6 text-text-dim">Loading…</p>;

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="Vehicles"
        subtitle={`${vehicles.length} OWNED · ${coverage.covered.length} OF ${coverage.totalCategories} CATEGORIES COVERED`}
        actions={
          <>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search inventory…"
              className="w-[190px] rounded-md border border-border bg-surface-4 px-2.5 py-1.5 text-[12.5px] text-text placeholder:text-text-subtle focus-visible:border-accent focus-visible:outline-none"
            />
            <Button variant="primary" onClick={() => setEditing(null)}>
              + Add vehicle
            </Button>
          </>
        }
      />

      <div className="grid min-h-0 flex-1 grid-cols-[1fr_372px]">
        <div className="min-h-0 overflow-auto p-6">
          <Card>
            <div className="grid grid-cols-[1.5fr_1.3fr_1.3fr_74px] gap-3.5 border-b border-border bg-surface-3 px-3.5 py-2.5 font-mono text-[9.5px] tracking-wide text-text-subtle">
              <div>VEHICLE / IMPLEMENT</div>
              <div>CATEGORY</div>
              <div>NOTES</div>
              <div className="text-right">USED BY</div>
            </div>
            {visibleVehicles.map((vehicle, i) => (
              <button
                key={vehicle.id}
                onClick={() => setEditing(vehicle)}
                className={`grid w-full grid-cols-[1.5fr_1.3fr_1.3fr_74px] items-center gap-3.5 px-3.5 py-2.5 text-left hover:bg-surface-hover ${
                  i !== visibleVehicles.length - 1 ? "border-b border-border-faint" : ""
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-[26px] w-[26px] items-center justify-center rounded bg-surface-hover">
                    <div className="h-2.5 w-2.5 rounded-sm bg-accent" />
                  </div>
                  <span className="text-[13px] font-semibold text-text">{vehicle.name}</span>
                </div>
                <div className="text-[12.5px] text-text-dim">{vehicle.category}</div>
                <div className="truncate text-[12.5px] text-text-subtle">{vehicle.notes ?? "—"}</div>
                <div className="text-right font-mono text-[11px] text-text-faint">
                  {cropCountForCategory(vehicle.category as EquipmentCategory) || "—"} crops
                </div>
              </button>
            ))}
            <button
              onClick={() => setEditing(null)}
              className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-[12.5px] text-text-subtle hover:bg-surface-hover"
            >
              <span className="flex h-[26px] w-[26px] items-center justify-center rounded border border-dashed border-border-strong text-[13px]">
                +
              </span>
              Add a vehicle or implement
            </button>
          </Card>
        </div>

        <div className="flex flex-col gap-3.5 overflow-auto border-l border-border-faint bg-surface-4 p-5">
          <span className="font-mono text-[9.5px] tracking-wide text-text-faint">COVERAGE FOR YOUR ROTATION</span>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-baseline justify-between">
              <span className="text-[12.5px] text-text-muted">
                {coverage.covered.length} of {coverage.totalCategories} categories
              </span>
              <span className="font-mono text-[11px] text-accent">{coverage.percent}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-surface-hover">
              <div className="h-full bg-accent" style={{ width: `${coverage.percent}%` }} />
            </div>
            <p className="text-[11.5px] text-text-subtle">Based on this year's dominant crop per field.</p>
          </div>

          <div className="h-px bg-border-faint" />

          {coverage.missing.length > 0 && (
            <>
              <span className="font-mono text-[9.5px] tracking-wide text-warn-muted">
                MISSING — {coverage.missing.length} {coverage.missing.length === 1 ? "GAP" : "GAPS"}
              </span>
              <div className="flex flex-col gap-2">
                {coverage.missing.map((gap) => (
                  <div key={gap.category} className="flex flex-col gap-1 rounded-md border border-warn-border bg-warn-bg px-3 py-2.5">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[12.5px] font-semibold text-text">{gap.category}</span>
                    </div>
                    <span className="text-[11.5px] leading-snug text-text-dimmer">
                      Needed by: {gap.neededBy.join(", ")}
                    </span>
                  </div>
                ))}
              </div>
              <div className="h-px bg-border-faint" />
            </>
          )}

          <span className="font-mono text-[9.5px] tracking-wide text-text-faint">COVERED</span>
          <div className="flex flex-wrap gap-1.5">
            {coverage.covered.length === 0 ? (
              <p className="text-[11.5px] text-text-subtle">Nothing covered yet.</p>
            ) : (
              coverage.covered.map((c) => (
                <span key={c} className="rounded-full border border-border px-2.5 py-1 text-[11px] text-text-dim">
                  {c}
                </span>
              ))
            )}
          </div>

          <p className="mt-auto text-[11.5px] leading-relaxed text-text-ghost">
            Categories are free text matched against a rough crop→equipment mapping (see lib/equipment.ts) — rename
            one and the match follows the text, so keep spelling consistent.
          </p>
        </div>
      </div>

      {editing !== undefined && (
        <VehicleForm
          vehicle={editing}
          onSave={handleSave}
          onDelete={editing ? handleDelete : undefined}
          onClose={() => setEditing(undefined)}
        />
      )}
    </div>
  );
}
