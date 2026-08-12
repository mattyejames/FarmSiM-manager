import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteField, getField } from "../lib/queries/fields";
import { listRotationEntriesForField } from "../lib/queries/rotation";
import { getMapSelection } from "../lib/queries/map";
import { activeMapImage } from "../lib/maps";
import { dominantCrop } from "../lib/rotationSummary";
import { estimateYieldIndex } from "../lib/yieldIndex";
import PageHeader from "../components/ui/PageHeader";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { SEASONS, SEASON_LABELS } from "../lib/types";
import type { Field, RotationEntry } from "../lib/types";
import { NO_CROP_LABEL } from "../lib/crops";

export default function FieldDetail() {
  const { fieldId } = useParams();
  const navigate = useNavigate();
  const [field, setField] = useState<Field | null>(null);
  const [entries, setEntries] = useState<RotationEntry[]>([]);
  const [mapImage, setMapImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!fieldId) return;
    Promise.all([getField(fieldId), listRotationEntriesForField(fieldId), getMapSelection()]).then(
      ([f, rotationEntries, sel]) => {
        setField(f);
        setEntries(rotationEntries);
        setMapImage(activeMapImage(sel));
        setLoading(false);
      },
    );
  }, [fieldId]);

  const years = useMemo(() => {
    const set = new Set(entries.map((e) => e.year));
    return [...set].sort((a, b) => a - b);
  }, [entries]);

  const yieldIndex = useMemo(() => estimateYieldIndex(entries), [entries]);

  const repeatWarning = useMemo(() => {
    let prevCrop: string | null = null;
    let runStart: number | null = null;
    for (const year of years) {
      const crop = dominantCrop(entries.filter((e) => e.year === year));
      if (crop && crop === prevCrop) {
        if (runStart === null) runStart = year - 1;
      } else {
        runStart = null;
      }
      prevCrop = crop;
    }
    return runStart !== null ? { crop: prevCrop, since: runStart } : null;
  }, [entries, years]);

  async function handleDelete() {
    if (!fieldId) return;
    if (!confirm("Delete this field and its rotation plan? This cannot be undone.")) return;
    await deleteField(fieldId);
    navigate("/fields");
  }

  if (loading) return <p className="p-6 text-text-dim">Loading…</p>;
  if (!field) return <p className="p-6 text-text-dim">Field not found.</p>;

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title={field.name}
        actions={
          <>
            <Link to={`/fields/${field.id}/edit`}>
              <Button type="button" variant="secondary">
                Edit
              </Button>
            </Link>
            <Button type="button" variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </>
        }
      />

      <div className="min-h-0 flex-1 overflow-auto p-6">
        <div className="grid grid-cols-[300px_1fr] gap-3.5">
          <Card>
            <div
              className="relative flex h-[132px] items-center justify-center bg-surface-3 bg-cover text-text-subtle"
              style={
                mapImage && field.map_x !== null && field.map_y !== null
                  ? {
                      backgroundImage: `url(${mapImage})`,
                      backgroundSize: "500% 500%",
                      backgroundPosition: `${field.map_x}% ${field.map_y}%`,
                    }
                  : undefined
              }
            >
              {(!mapImage || field.map_x === null) && (
                <Link to="/map" className="font-mono text-[10px] tracking-wide underline">
                  no map pin set — place one
                </Link>
              )}
            </div>
            <div className="flex flex-col gap-2.5 px-[15px] py-3.5">
              <div className="flex items-center gap-2">
                {field.number !== null && (
                  <span className="rounded bg-surface-hover px-1.5 py-0.5 font-mono text-[11px] font-semibold text-accent">
                    {field.number}
                  </span>
                )}
              </div>
              <div className="flex justify-between">
                <span className="font-mono text-[9.5px] tracking-wide text-text-subtle">SIZE</span>
                <span className="font-mono text-xs text-text">
                  {field.size_value} {field.size_unit}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono text-[9.5px] tracking-wide text-text-subtle">SOIL</span>
                <span className="text-[12.5px] text-text">{field.soil_type ?? "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono text-[9.5px] tracking-wide text-text-subtle">YIELD INDEX (EST.)</span>
                <span
                  className={`font-mono text-xs ${yieldIndex >= 80 ? "text-accent" : yieldIndex >= 65 ? "text-warn-muted" : "text-danger"}`}
                >
                  {yieldIndex}
                </span>
              </div>
              {field.notes && (
                <>
                  <div className="h-px bg-border-faint" />
                  <p className="text-[12.5px] leading-relaxed text-text-dimmer">{field.notes}</p>
                </>
              )}
            </div>
          </Card>

          <div className="flex flex-col gap-3.5">
            {repeatWarning && (
              <div className="flex gap-2.5 rounded-lg border border-warn-border bg-warn-bg px-3.5 py-3">
                <span className="text-warn">⚠</span>
                <p className="text-[12.5px] leading-snug text-text-muted">
                  <strong className="font-semibold text-text">
                    {repeatWarning.crop} repeated since Year {repeatWarning.since}.
                  </strong>{" "}
                  Consider breaking the run with a different crop or a cover crop.
                </p>
              </div>
            )}

            <Card className="flex flex-1 flex-col overflow-hidden">
              <div className="flex items-center justify-between border-b border-border-faint px-[15px] py-3">
                <span className="text-[13px] font-semibold text-text">Rotation history</span>
                <span className="font-mono text-[9.5px] tracking-wide text-text-subtle">
                  {years.length > 0 ? `YEAR ${years[0]} – ${years[years.length - 1]}` : "NO ENTRIES YET"}
                </span>
              </div>
              <div className="flex flex-col gap-2 px-[15px] py-3.5">
                {entries.length === 0 ? (
                  <p className="text-[12.5px] text-text-dim">
                    No rotation entries yet.{" "}
                    <Link to="/rotation" className="text-accent underline">
                      Plan this field's rotation
                    </Link>
                    .
                  </p>
                ) : (
                  <>
                    <div className="grid grid-cols-[56px_repeat(4,1fr)] gap-1.5 font-mono text-[9px] tracking-wide text-text-subtle">
                      <div />
                      {SEASONS.map((s) => (
                        <div key={s}>{SEASON_LABELS[s].slice(0, 3).toUpperCase()}</div>
                      ))}
                    </div>
                    {years.map((year) => (
                      <div key={year} className="grid grid-cols-[56px_repeat(4,1fr)] items-center gap-1.5">
                        <span className="font-mono text-[10.5px] tracking-wide text-text-subtle">YR {year}</span>
                        {SEASONS.map((s) => {
                          const entry = entries.find((e) => e.year === year && e.season === s);
                          return (
                            <span
                              key={s}
                              className={`truncate rounded px-2 py-1.5 text-[11.5px] ${
                                entry?.crop
                                  ? "bg-surface-3 text-text-muted"
                                  : "border border-dashed border-border text-text-ghost"
                              }`}
                            >
                              {entry?.crop ?? NO_CROP_LABEL}
                            </span>
                          );
                        })}
                      </div>
                    ))}
                  </>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
