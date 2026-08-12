/** Shared class string for text inputs/selects/textareas across the app's forms —
 * a constant rather than a wrapper component since usages span <input>, <select>,
 * <textarea>, and custom div-based pickers (CropPicker, SoilTypeInput). */
export const INPUT_CLASS =
  "w-full rounded-md border border-border bg-surface-4 px-3 py-2.5 text-sm text-text " +
  "placeholder:text-text-subtle focus-visible:border-accent focus-visible:outline-none " +
  "focus-visible:ring-2 focus-visible:ring-accent/30";
