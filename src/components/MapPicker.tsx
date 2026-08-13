import { useRef } from "react";
import type { ChangeEvent } from "react";
import { BUNDLED_MAP_IMAGES, BUNDLED_MAP_KEYS, BUNDLED_MAP_LABELS } from "../lib/maps";
import { INPUT_CLASS } from "./ui/inputStyles";
import type { MapKey } from "../lib/types";

export interface MapPickerValue {
  mapKey: MapKey | null;
  customImage: string | null;
  customMapName: string;
}

interface Props {
  value: MapPickerValue;
  onChange: (value: MapPickerValue) => void;
}

/** Choose one of the 4 bundled maps, or drop in a custom image and optionally name it.
 * Shared between the save wizard (new save) and the Settings "change map" flow (existing
 * save) — this component only ever produces a value, callers decide what happens with it. */
export default function MapPicker({ value, onChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      onChange({ mapKey: "custom", customImage: String(reader.result), customMapName: value.customMapName });
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-4 gap-2">
        {BUNDLED_MAP_KEYS.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => onChange({ mapKey: key, customImage: null, customMapName: "" })}
            className={`overflow-hidden rounded-md border p-1.5 text-center transition-colors ${
              value.mapKey === key ? "border-accent bg-surface-3" : "border-border hover:bg-surface-hover"
            }`}
          >
            <div
              className="mb-1.5 h-11 rounded bg-surface-3 bg-cover bg-center"
              style={{ backgroundImage: `url(${BUNDLED_MAP_IMAGES[key]})` }}
            />
            <span
              className={`block truncate text-[10px] font-medium ${
                value.mapKey === key ? "text-accent" : "text-text-dim"
              }`}
            >
              {BUNDLED_MAP_LABELS[key]}
            </span>
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="rounded-md border border-dashed border-border-strong py-2.5 text-center text-[11px] text-text-faint hover:text-text-dim"
      >
        {value.mapKey === "custom" ? "Change custom map image" : "or drop your own map image — you can name it below"}
      </button>
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />

      {value.mapKey === "custom" && (
        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[9.5px] tracking-wide text-text-faint">MAP NAME — OPTIONAL</label>
          <input
            value={value.customMapName}
            onChange={(e) => onChange({ ...value, customMapName: e.target.value })}
            placeholder="Custom map"
            className={INPUT_CLASS}
          />
        </div>
      )}
    </div>
  );
}
