import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { listFields } from "../lib/queries/fields";
import { listRotationEntries } from "../lib/queries/rotation";
import { listVehicles } from "../lib/queries/vehicles";
import { useSave } from "../lib/saveContext";
import { tasksForMonth, describeTask } from "../lib/tasks";
import { dominantCrop } from "../lib/rotationSummary";
import { estimateYieldIndex } from "../lib/yieldIndex";
import { ownedCategorySet, checkEquipment } from "../lib/equipment";
import { useGameState } from "../lib/gameStateContext";
import { shiftMonth, monthLabel } from "../lib/calendar";
import PageHeader from "../components/ui/PageHeader";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import type { Field, RotationEntry, Vehicle } from "../lib/types";

const CROP_COLORS = ["bg-warn-muted", "bg-[#B98452]", "bg-accent", "bg-info"];

export default function Dashboard() {
  const { saveId, basePath } = useSave();
  const { gameState } = useGameState();
  const [fields, setFields] = useState<Field[]>([]);
  const [entries, setEntries] = useState<RotationEntry[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([listFields(saveId), listRotationEntries(saveId), listVehicles(saveId)]).then(([f, e, v]) => {
      setFields(f);
      setEntries(e);
      setVehicles(v);
      setLoading(false);
    });
  }, [saveId]);

  const currentYear = gameState?.current_year ?? 1;
  const currentMonth = gameState?.current_month ?? 3;
  const ownedCategories = ownedCategorySet(vehicles);

  const noPlanFields = useMemo(
    () => fields.filter((f) => !dominantCrop(entries.filter((e) => e.field_id === f.id && e.year === currentYear))),
    [fields, entries, currentYear],
  );

  const plannedThroughYear = entries.reduce((max, e) => Math.max(max, e.year), currentYear);

  const fieldsWithEntries = fields.filter((f) => entries.some((e) => e.field_id === f.id));
  const avgYieldIndex =
    fieldsWithEntries.length > 0
      ? Math.round(
          fieldsWithEntries.reduce((sum, f) => sum + estimateYieldIndex(entries.filter((e) => e.field_id === f.id)), 0) /
            fieldsWithEntries.length,
        )
      : null;

  const cropDistribution = useMemo(() => {
    const counts = new Map<string, number>();
    let fallow = 0;
    for (const field of fields) {
      const crop = dominantCrop(entries.filter((e) => e.field_id === field.id && e.year === currentYear));
      if (crop) counts.set(crop, (counts.get(crop) ?? 0) + 1);
      else fallow++;
    }
    const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1]);
    return { sorted, fallow, total: fields.length || 1 };
  }, [fields, entries, currentYear]);

  const repeatWarnings = useMemo(() => {
    const warnings: { field: Field; crop: string; since: number }[] = [];
    for (const field of fields) {
      const years = [...new Set(entries.filter((e) => e.field_id === field.id).map((e) => e.year))].sort(
        (a, b) => a - b,
      );
      let prevCrop: string | null = null;
      let runStart: number | null = null;
      for (const year of years) {
        const crop = dominantCrop(entries.filter((e) => e.field_id === field.id && e.year === year));
        if (crop && crop === prevCrop) {
          if (runStart === null) runStart = year - 1;
        } else {
          runStart = null;
        }
        prevCrop = crop;
      }
      if (runStart !== null && prevCrop) warnings.push({ field, crop: prevCrop, since: runStart });
    }
    return warnings;
  }, [fields, entries]);

  const dueNow = tasksForMonth(fields, entries, currentYear, currentMonth);
  const upcomingState = gameState ? shiftMonth(gameState, 1) : null;
  const upcoming = upcomingState ? tasksForMonth(fields, entries, upcomingState.current_year, upcomingState.current_month) : [];

  if (loading || !gameState) return <p className="p-6 text-text-dim">Loading…</p>;

  if (fields.length === 0) {
    return (
      <div className="flex h-full flex-col">
        <PageHeader title="Dashboard" />
        <div className="flex flex-1 items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="text-text-dim">
              Get started by{" "}
              <Link to={`${basePath}/fields/new`} className="text-accent underline">
                adding your first field
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="Dashboard"
        actions={
          <Link to={`${basePath}/fields/new`}>
            <Button variant="primary">+ Add field</Button>
          </Link>
        }
      />

      <div className="min-h-0 flex-1 overflow-auto p-6">
        <div className="mb-4 grid grid-cols-4 gap-3">
          <Card className="flex flex-col gap-1.5 p-4">
            <span className="font-mono text-[10px] tracking-wide text-text-faint">FIELDS</span>
            <span className="text-[34px] font-semibold leading-none text-text">{fields.length}</span>
            <span className="text-xs text-text-dimmer">
              {fields.reduce((s, f) => s + (f.size_unit === "HA" ? f.size_value : f.size_value * 0.4047), 0).toFixed(1)}{" "}
              ha total
            </span>
          </Card>
          <Card className="flex flex-col gap-1.5 border-warn-border p-4">
            <span className="font-mono text-[10px] tracking-wide text-warn-muted">NO ROTATION PLAN</span>
            <span className="text-[34px] font-semibold leading-none text-warn">{noPlanFields.length}</span>
            {noPlanFields.length > 0 && (
              <Link to={`${basePath}/rotation`} className="text-xs text-warn-muted underline underline-offset-2">
                Plan them →
              </Link>
            )}
          </Card>
          <Card className="flex flex-col gap-1.5 p-4">
            <span className="font-mono text-[10px] tracking-wide text-text-faint">PLANNED THROUGH</span>
            <span className="text-[34px] font-semibold leading-none text-text">Yr {plannedThroughYear}</span>
            <span className="text-xs text-text-dimmer">{plannedThroughYear - currentYear} years ahead of now</span>
          </Card>
          <Card className="flex flex-col gap-1.5 p-4">
            <span className="font-mono text-[10px] tracking-wide text-text-faint">AVG YIELD INDEX</span>
            <span className="text-[34px] font-semibold leading-none text-text">{avgYieldIndex ?? "—"}</span>
            <span className="text-xs text-text-dimmer">estimate, rotation-based</span>
          </Card>
        </div>

        <div className="grid grid-cols-[1.5fr_1fr] gap-3.5">
          <Card className="flex flex-col overflow-hidden">
            <div className="flex items-center justify-between border-b border-border-faint px-4 py-3">
              <span className="text-[13px] font-semibold text-text">Year {currentYear} at a glance</span>
              <span className="font-mono text-[10px] text-text-faint">
                {fields.length - cropDistribution.fallow} / {fields.length} ASSIGNED
              </span>
            </div>
            <div className="flex flex-col gap-3.5 px-4 py-3.5">
              <div className="flex h-2 overflow-hidden rounded-full bg-surface-3">
                {cropDistribution.sorted.map(([crop, count], i) => (
                  <div
                    key={crop}
                    className={CROP_COLORS[i % CROP_COLORS.length]}
                    style={{ width: `${(count / cropDistribution.total) * 100}%` }}
                  />
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cropDistribution.sorted.map(([crop, count], i) => (
                  <span
                    key={crop}
                    className="flex items-center gap-1.5 rounded-full bg-surface-3 px-2.5 py-1 text-[11.5px] text-text-muted"
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${CROP_COLORS[i % CROP_COLORS.length]}`} />
                    {crop} · {count}
                  </span>
                ))}
                {cropDistribution.fallow > 0 && (
                  <span className="flex items-center gap-1.5 rounded-full border border-dashed border-border px-2.5 py-1 text-[11.5px] text-text-faint">
                    Fallow · {cropDistribution.fallow}
                  </span>
                )}
              </div>

              <div className="h-px bg-border-faint" />
              <span className="font-mono text-[10px] tracking-wide text-text-faint">NEEDS ATTENTION</span>
              <div className="flex flex-col gap-2">
                {repeatWarnings.map((w) => (
                  <div key={w.field.id} className="flex gap-2.5 rounded-md border border-warn-border bg-warn-bg px-3 py-2.5">
                    <span className="text-warn">⚠</span>
                    <p className="text-[12.5px] leading-snug text-text-muted">
                      <Link to={`${basePath}/fields/${w.field.id}`} className="font-semibold text-text">
                        {w.field.name}
                      </Link>{" "}
                      — {w.crop} since Year {w.since}. Expect a yield hit.{" "}
                      <Link to={`${basePath}/rotation`} className="text-warn underline underline-offset-2">
                        Open rotation
                      </Link>
                    </p>
                  </div>
                ))}
                {noPlanFields.length > 0 && (
                  <div className="flex gap-2.5 rounded-md border border-border bg-surface-3 px-3 py-2.5">
                    <span className="text-text-dimmer">◻</span>
                    <p className="text-[12.5px] leading-snug text-text-muted">
                      <strong className="font-semibold text-text">{noPlanFields.length} fields</strong> have no crop
                      set for Year {currentYear}.{" "}
                      <Link to={`${basePath}/rotation`} className="text-text-dim underline underline-offset-2">
                        Plan them
                      </Link>
                    </p>
                  </div>
                )}
                {repeatWarnings.length === 0 && noPlanFields.length === 0 && (
                  <p className="text-[12.5px] text-text-dimmer">Nothing needs attention right now.</p>
                )}
                {vehicles.length === 0 && (
                  <div className="flex gap-2.5 rounded-md border border-border bg-surface-3 px-3 py-2.5">
                    <span className="text-text-dimmer">◻</span>
                    <p className="text-[12.5px] leading-snug text-text-muted">
                      No vehicles in your inventory yet, so every task's equipment shows as missing.{" "}
                      <Link to={`${basePath}/vehicles`} className="text-text-dim underline underline-offset-2">
                        Add what you own
                      </Link>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Card>

          <div className="flex flex-col gap-3">
            <Card className="flex flex-col gap-2 p-3.5">
              <span className="font-mono text-[10px] tracking-wide text-text-faint">JUMP TO</span>
              <Link
                to={`${basePath}/rotation`}
                className="flex items-center justify-between rounded-md border-l-2 border-accent bg-surface-3 px-3.5 py-2.5"
              >
                <div>
                  <div className="text-[13px] font-semibold text-text">Rotation grid</div>
                  <div className="text-[11.5px] text-text-dimmer">
                    {fields.length} fields × {plannedThroughYear} years
                  </div>
                </div>
                <span className="text-accent">→</span>
              </Link>
              <Link
                to={`${basePath}/timeline`}
                className="flex items-center justify-between rounded-md border-l-2 border-accent bg-surface-3 px-3.5 py-2.5"
              >
                <div>
                  <div className="text-[13px] font-semibold text-text">Year timeline</div>
                  <div className="text-[11.5px] text-text-dimmer">Sow/harvest windows vs. plan</div>
                </div>
                <span className="text-accent">→</span>
              </Link>
              <Link
                to={`${basePath}/fields`}
                className="flex items-center justify-between rounded-md border-l-2 border-accent bg-surface-3 px-3.5 py-2.5"
              >
                <div>
                  <div className="text-[13px] font-semibold text-text">Fields</div>
                  <div className="text-[11.5px] text-text-dimmer">Sizes, soils, notes</div>
                </div>
                <span className="text-accent">→</span>
              </Link>
            </Card>

            <Card className="flex flex-1 flex-col gap-2.5 p-3.5">
              <span className="font-mono text-[10px] tracking-wide text-text-faint">
                DUE THIS MONTH · {monthLabel(currentMonth).toUpperCase()}
              </span>
              {dueNow.length === 0 ? (
                <p className="text-[12.5px] text-text-dimmer">Nothing due this month.</p>
              ) : (
                dueNow.map((task, i) => {
                  const checklist = task.machines ? checkEquipment(task.machines, ownedCategories) : [];
                  return (
                    <div key={i} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-[5px] w-[5px] flex-none rounded-full bg-accent" />
                      <div className="flex flex-col gap-1">
                        <span className="text-[12.5px] leading-snug text-text-muted">{describeTask(task)}</span>
                        {checklist.length > 0 && (
                          <span className="flex flex-wrap gap-x-2.5 gap-y-0.5 font-mono text-[10px] text-text-faint">
                            {checklist.map(({ machine, owned }) => (
                              <span key={machine} className={owned ? "text-text-faint" : "text-warn-muted"}>
                                {owned ? "✓" : "✗"} {machine}
                              </span>
                            ))}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
              {upcoming.length > 0 && upcomingState && (
                <>
                  <div className="mt-1 h-px bg-border-faint" />
                  <span className="font-mono text-[10px] tracking-wide text-text-faint">
                    COMING UP · {monthLabel(upcomingState.current_month).toUpperCase()}
                  </span>
                  {upcoming.slice(0, 3).map((task, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-[5px] w-[5px] flex-none rounded-full bg-text-ghost" />
                      <span className="text-[12.5px] leading-snug text-text-dim">{describeTask(task)}</span>
                    </div>
                  ))}
                </>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
