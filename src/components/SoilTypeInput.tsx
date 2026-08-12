import { SOIL_SUGGESTIONS } from "../lib/soilSuggestions";
import { INPUT_CLASS } from "./ui/inputStyles";

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
        className={INPUT_CLASS}
      />
      <datalist id="soil-type-suggestions">
        {SOIL_SUGGESTIONS.map((soil) => (
          <option key={soil} value={soil} />
        ))}
      </datalist>
    </>
  );
}
