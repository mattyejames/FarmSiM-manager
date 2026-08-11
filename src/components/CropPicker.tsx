import { CROP_NAMES, NO_CROP_LABEL } from "../lib/crops";

interface Props {
  value: string | null;
  onChange: (value: string | null) => void;
}

export default function CropPicker({ value, onChange }: Props) {
  return (
    <select
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value === "" ? null : e.target.value)}
      className="w-full rounded-md border border-stone-300 px-3 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-500 dark:border-stone-700 dark:bg-stone-800"
    >
      <option value="">{NO_CROP_LABEL}</option>
      {CROP_NAMES.map((crop) => (
        <option key={crop} value={crop}>
          {crop}
        </option>
      ))}
    </select>
  );
}
