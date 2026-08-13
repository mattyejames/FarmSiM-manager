import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { listFields } from "../lib/queries/fields";
import { listRotationEntries } from "../lib/queries/rotation";
import { getMapSelection } from "../lib/queries/map";
import { useSave } from "../lib/saveContext";
import { activeMapImage } from "../lib/maps";
import { dominantCrop } from "../lib/rotationSummary";
import { estimateYieldIndex } from "../lib/yieldIndex";
import { useGameState } from "../lib/gameStateContext";
import PageHeader from "../components/ui/PageHeader";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import type { Field, RotationEntry } from "../lib/types";
import { NO_CROP_LABEL } from "../lib/crops";

type Filter = "all" | "no-plan" | { soil: string };

export default function FieldsList() {
  const { saveId, basePath } = useSave();
  const { gameState } = useGameState();
  const [fields, setFields] = useState<Field[]>([]);
  const [entries, setEntries] = useState<RotationEntry[]>([]);
  const [mapImage, setMapImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    setLoading(true);
    Promise.all([listFields(saveId), listRotationEntries(saveId), getMapSelection()]).then(([f, e, sel]) => {
      setFields(f);
      setEntries(e);
      setMapImage(activeMapImage(sel));
      setLoading(false);
    });
  }, [saveId]);

  const currentYear = gameState?.current_year ?? 1;

  const soilCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const f of fields) {
      if (!f.soil_type) continue;
      counts.set(f.soil_type, (counts.get(f.soil_type) ?? 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3);
  }, [fields]);

  const noPlanCount = useMemo(
    () => fields.filter((f) => !dominantCrop(entries.filter((e) => e.field_id === f.id && e.year === currentYear))).length,
    [fields, entries, currentYear],
  );

  const visibleFields = useMemo(() => {
    let list = fields;
    if (filter === "no-plan") {
      list = list.filter(
        (f) => !dominantCrop(entries.filter((e) => e.field_id === f.id && e.year === currentYear)),
      );
    } else if (typeof filter === "object") {
      list = list.filter((f) => f.soil_type === filter.soil);
    }
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter((f) => f.name.toLowerCase().includes(q) || String(f.number ?? "").includes(q));
    }
    return list;
  }, [fields, entries, filter, search, currentYear]);

  const totalHa = fields.reduce((sum, f) => sum + (f.size_unit === "HA" ? f.size_value : f.size_value * 0.4047), 0);

  if (loading) return <p className="p-6 text-text-dim">Loading…</p>;

  if (fields.length === 0) {
    return (
      <div className="flex h-full flex-col">
        <PageHeader title="Fields" />
        <div className="flex flex-1 items-center justify-center">
          <div className="flex max-w-[480px] flex-col items-center gap-4 text-center">
            <div className="h-24 w-56 rounded bg-surface-3 opacity-80" />
            <h2 className="text-xl font-semibold text-text">No fields yet</h2>
            <p className="text-[13.5px] leading-relaxed text-text-dimmer">
              Add your first field and FarmSiM Manager starts a rotation plan for it — eight years, four seasons
              each, all yours to fill in. Everything stays on this machine.
            </p>
            <Link to={`${basePath}/fields/new`}>
              <Button variant="primary">+ Add your first field</Button>
            </Link>
            <p className="mt-1 font-mono text-[9.5px] tracking-wide text-text-ghost">
              TIP: NAME FIELDS AS THEY APPEAR ON YOUR MAP — F01, F02 WORKS TOO
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="Fields"
        subtitle={`${fields.length} · ${totalHa.toFixed(1)} HA`}
        actions={
          <>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name or number…"
              className="w-[210px] rounded-md border border-border bg-surface-4 px-2.5 py-1.5 text-[12.5px] text-text placeholder:text-text-subtle focus-visible:border-accent focus-visible:outline-none"
            />
            <Link to={`${basePath}/fields/new`}>
              <Button variant="primary">+ Add field</Button>
            </Link>
          </>
        }
      />

      <div className="flex items-center gap-1.5 px-6 pt-4">
        <button
          onClick={() => setFilter("all")}
          className={`rounded-full px-2.5 py-1 text-[11.5px] font-semibold ${
            filter === "all" ? "bg-text text-surface-0" : "border border-border text-text-dim"
          }`}
        >
          All {fields.length}
        </button>
        {noPlanCount > 0 && (
          <button
            onClick={() => setFilter("no-plan")}
            className={`rounded-full border px-2.5 py-1 text-[11.5px] ${
              filter === "no-plan"
                ? "border-warn-border bg-warn-bg text-warn-muted"
                : "border-border text-text-dim"
            }`}
          >
            No plan {noPlanCount}
          </button>
        )}
        {soilCounts.map(([soil, count]) => (
          <button
            key={soil}
            onClick={() => setFilter({ soil })}
            className={`rounded-full border px-2.5 py-1 text-[11.5px] ${
              typeof filter === "object" && filter.soil === soil
                ? "border-accent text-accent"
                : "border-border text-text-dim"
            }`}
          >
            {soil} {count}
          </button>
        ))}
      </div>

      <div className="min-h-0 flex-1 overflow-auto p-6">
        <div className="mb-2 grid grid-cols-[52px_1.4fr_0.6fr_0.75fr_1.7fr_0.9fr_0.7fr] gap-3.5 px-3.5 font-mono text-[9.5px] tracking-wide text-text-subtle">
          <div />
          <div>FIELD</div>
          <div className="text-right">SIZE</div>
          <div>SOIL</div>
          <div>NOTES</div>
          <div>YEAR {currentYear}</div>
          <div className="text-right">YIELD IDX</div>
        </div>
        <Card>
          {visibleFields.map((field, i) => {
            const fieldEntries = entries.filter((e) => e.field_id === field.id);
            const crop = dominantCrop(fieldEntries.filter((e) => e.year === currentYear));
            const yieldIdx = estimateYieldIndex(fieldEntries);
            return (
              <Link
                key={field.id}
                to={`${basePath}/fields/${field.id}`}
                className={`grid grid-cols-[52px_1.4fr_0.6fr_0.75fr_1.7fr_0.9fr_0.7fr] items-center gap-3.5 px-3.5 py-2.5 hover:bg-surface-hover ${
                  i !== visibleFields.length - 1 ? "border-b border-border-faint" : ""
                }`}
              >
                <div
                  className="h-[34px] w-[52px] rounded bg-surface-3 bg-cover"
                  style={
                    mapImage && field.map_x !== null && field.map_y !== null
                      ? {
                          backgroundImage: `url(${mapImage})`,
                          backgroundSize: "500% 500%",
                          backgroundPosition: `${field.map_x}% ${field.map_y}%`,
                        }
                      : undefined
                  }
                />
                <div className="flex min-w-0 flex-col gap-0.5">
                  <span className="flex items-center gap-1.5 truncate text-[13.5px] font-semibold text-text">
                    {field.number !== null && (
                      <span className="rounded bg-surface-hover px-1 py-0.5 font-mono text-[9.5px] font-semibold text-accent">
                        {field.number}
                      </span>
                    )}
                    {field.name}
                  </span>
                </div>
                <div className="text-right font-mono text-[12.5px] text-text-muted">
                  {field.size_value} {field.size_unit}
                </div>
                <div className="text-[12.5px] text-text-dim">{field.soil_type ?? "—"}</div>
                <div className="truncate text-[12.5px] text-text-faint">{field.notes ?? ""}</div>
                <div>
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-[11.5px] font-medium ${
                      crop ? "bg-surface-3 text-text-muted" : "border border-dashed border-border text-text-ghost"
                    }`}
                  >
                    {crop ?? NO_CROP_LABEL}
                  </span>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <div className="h-[5px] w-11 overflow-hidden rounded-full bg-surface-3">
                    <div
                      className={`h-full ${yieldIdx >= 80 ? "bg-accent" : yieldIdx >= 65 ? "bg-warn-muted" : "bg-danger"}`}
                      style={{ width: `${yieldIdx}%` }}
                    />
                  </div>
                  <span className="w-5 text-right font-mono text-[11.5px] text-text-muted">{yieldIdx}</span>
                </div>
              </Link>
            );
          })}
        </Card>
      </div>
    </div>
  );
}
