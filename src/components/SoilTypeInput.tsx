import { SOIL_SUGGESTIONS } from "../lib/soilSuggestions";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

/** Free-text input with suggestions, since FS25's soil terminology varies by map/DLC. */
export default function SoilTypeInput({ value, onChange }: Props) {
  return (
    <>
      <input
        list="soil-type-suggestions"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g. Loam"
        className="w-full rounded-md border border-stone-300 px-3 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-500 dark:border-stone-700 dark:bg-stone-800"
      />
      <datalist id="soil-type-suggestions">
        {SOIL_SUGGESTIONS.map((soil) => (
          <option key={soil} value={soil} />
        ))}
      </datalist>
    </>
  );
}
