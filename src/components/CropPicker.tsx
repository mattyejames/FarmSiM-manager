import { useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { CROP_NAMES, NO_CROP_LABEL, getCropInfo } from "../lib/crops";
import { SEASON_LABELS } from "../lib/types";

interface Props {
  value: string | null;
  onChange: (value: string | null) => void;
}

const OPTIONS = [NO_CROP_LABEL, ...CROP_NAMES];

/** Searchable crop dropdown, sourced from crops.ts — type to filter, arrow keys to move,
 * Enter to select, Escape to close. */
export default function CropPicker({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlight, setHighlight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return OPTIONS;
    return OPTIONS.filter((name) => name.toLowerCase().includes(q));
  }, [query]);

  useEffect(() => {
    setHighlight(0);
  }, [query, open]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function select(name: string) {
    onChange(name === NO_CROP_LABEL ? null : name);
    setOpen(false);
    setQuery("");
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        setOpen(true);
        e.preventDefault();
      }
      return;
    }
    if (e.key === "ArrowDown") {
      setHighlight((h) => Math.min(h + 1, filtered.length - 1));
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      setHighlight((h) => Math.max(h - 1, 0));
      e.preventDefault();
    } else if (e.key === "Enter") {
      if (filtered[highlight]) select(filtered[highlight]);
      e.preventDefault();
    } else if (e.key === "Escape") {
      setOpen(false);
      setQuery("");
      e.preventDefault();
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <input
        value={open ? query : (value ?? "")}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder={value ?? NO_CROP_LABEL}
        className="w-full rounded-md border border-border bg-surface-4 px-3 py-2.5 text-sm text-text placeholder:text-text-subtle focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30"
      />
      {open && (
        <div className="absolute z-10 mt-1 max-h-72 w-full overflow-y-auto rounded-md border border-border-strong bg-surface-2 shadow-lg">
          {filtered.length === 0 ? (
            <div className="px-3 py-2 text-sm text-text-subtle">No matching crops</div>
          ) : (
            filtered.map((name, i) => {
              const info = name === NO_CROP_LABEL ? undefined : getCropInfo(name);
              const isHighlighted = i === highlight;
              return (
                <div
                  key={name}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => select(name)}
                  onMouseEnter={() => setHighlight(i)}
                  className={`flex cursor-pointer items-center gap-2.5 border-l-2 px-3 py-2 ${
                    isHighlighted ? "border-accent bg-surface-3" : "border-transparent"
                  }`}
                >
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="text-[13px] text-text">{name}</span>
                    {info && (
                      <span className="font-mono text-[9.5px] text-text-faint">
                        SOW {info.sowSeasons.map((s) => SEASON_LABELS[s].slice(0, 3).toUpperCase()).join("/")} ·
                        HARVEST {info.harvestSeasons.map((s) => SEASON_LABELS[s].slice(0, 3).toUpperCase()).join("/")}
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
