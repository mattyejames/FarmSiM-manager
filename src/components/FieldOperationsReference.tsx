import { useState } from "react";
import Card from "./ui/Card";
import {
  YIELD_FACTORS,
  WEED_STAGES,
  FERTILIZING_RULE,
  LIMING_RULE,
  PLOWING_NOTE,
  ROW_CROP_NOTE,
  HARVEST_BLOCKED_BY_RAIN,
  WITHERING_NOTE,
} from "../lib/fieldOperations";

/** Collapsible reference panel for the general field-operation rules in fieldOperations.ts —
 * yield factors, weed-stage tools, and the fertilizing/liming/plowing cadence. These rules apply
 * regardless of which crop is planted, so this isn't crop-specific (see crops.ts operations for
 * a given crop's own sequence). Collapsed by default to keep the field screen compact. */
export default function FieldOperationsReference() {
  const [open, setOpen] = useState(false);

  return (
    <Card>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-[15px] py-3 text-left"
        aria-expanded={open}
      >
        <span className="text-[13px] font-semibold text-text">Field operations reference</span>
        <span className="font-mono text-[9.5px] tracking-wide text-text-subtle">{open ? "HIDE ▲" : "SHOW ▼"}</span>
      </button>
      {open && (
        <div className="flex flex-col gap-4 border-t border-border-faint px-[15px] py-3.5 text-[12.5px] leading-snug text-text-muted">
          <section className="flex flex-col gap-2">
            <h3 className="font-mono text-[9.5px] tracking-wide text-text-subtle">YIELD FACTORS</h3>
            <div className="flex flex-col gap-2">
              {YIELD_FACTORS.map((f) => (
                <div key={f.factor}>
                  <div className="flex justify-between gap-3">
                    <span className="text-text">{f.factor}</span>
                    <span className="text-right text-text-dimmer">{f.effect}</span>
                  </div>
                  {f.note && <p className="text-[11px] text-text-faint">{f.note}</p>}
                </div>
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-2">
            <h3 className="font-mono text-[9.5px] tracking-wide text-text-subtle">WEED STAGES</h3>
            <div className="flex flex-col gap-2">
              {WEED_STAGES.map((w) => (
                <div key={w.stage}>
                  <div className="flex justify-between gap-3">
                    <span className="text-text capitalize">
                      {w.stage} — {w.appearance}
                    </span>
                    <span className="shrink-0 text-right font-mono text-text-dimmer">{w.tool}</span>
                  </div>
                  {w.note && <p className="text-[11px] text-text-faint">{w.note}</p>}
                </div>
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-1.5">
            <h3 className="font-mono text-[9.5px] tracking-wide text-text-subtle">RULES</h3>
            <p>{FERTILIZING_RULE}</p>
            <p>{LIMING_RULE}</p>
            <p>{PLOWING_NOTE}</p>
            <p>{ROW_CROP_NOTE}</p>
            <p>{HARVEST_BLOCKED_BY_RAIN}</p>
            <p>{WITHERING_NOTE}</p>
          </section>
        </div>
      )}
    </Card>
  );
}
