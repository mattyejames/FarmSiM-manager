/**
 * General field-operation rules that apply across most crops, sourced from the official
 * Farming Simulator Academy "Ground Working 101" tutorial series
 * (farming-simulator.com/newsArticle.php?news_id=280 and its per-topic articles), compiled
 * 2026-08. Per-crop specifics and exceptions live in crops.ts; this file holds the generic
 * mechanics a task-list/timeline feature can reference regardless of which crop is planted.
 *
 * The source itself flags a few unresolved contradictions (see `note` fields below) rather
 * than picking one answer — the Academy's own guidance in those cases is to trust the in-game
 * field info box over any fixed cadence.
 */

export interface YieldFactor {
  factor: string;
  effect: string;
  note?: string;
}

/** Independent yield bonuses/penalties, roughly in order of impact. */
export const YIELD_FACTORS: YieldFactor[] = [
  { factor: "Fertilizing", effect: "Up to 2 applications = 100% (the single biggest lever)" },
  { factor: "Weed-free harvest", effect: "+20% yield" },
  { factor: "Mulching", effect: "+2.5% on the next harvest" },
  { factor: "Soil rolling", effect: "+2.5% (condensing the soil)" },
  {
    factor: "Liming",
    effect: "Required periodically; no fixed percentage given",
    note: "Skipping it costs \"a bit less money,\" not a hard yield cap.",
  },
  {
    factor: "Plowing",
    effect: "Increases yield for the next harvest after root crops; no fixed percentage given",
  },
  {
    factor: "Ridge forming (root vegetables)",
    effect: "Counts as a fertilizing stage — cuts the required fertilizer passes from two to one",
  },
  {
    factor: "Herbicide",
    effect: "A small yield penalty",
    note: "The only negative factor — a recovery tool for large weeds, not part of an optimal plan.",
  },
];

export type WeedStage = "small" | "medium" | "large";

export interface WeedStageInfo {
  stage: WeedStage;
  appearance: string;
  tool: string;
  note?: string;
}

export const WEED_STAGES: WeedStageInfo[] = [
  {
    stage: "small",
    appearance: "Green patches, after only a couple of hours of in-game time",
    tool: "Weeder (mechanical)",
    note: "Multiplies quickly if ignored.",
  },
  {
    stage: "medium",
    appearance: "Visually more diverse, higher density",
    tool: "Hoe",
    note: "Also clears small weeds. Row crops (potatoes, carrots, parsnips, red beet) need a hoe instead of a weeder at every stage — a weeder can't be used on them at all.",
  },
  {
    stage: "large",
    appearance: "Higher, blooming flowers, easily distinguishable from crops",
    tool: "Sprayer + herbicide",
    note: "\"Your last chance\" — only herbicide works on large weeds, and it carries a yield penalty.",
  },
];

/** Fertilizing: 2 passes = 100%, with a growth stage required between them. Grass is the one exception (1 pass only). */
export const FERTILIZING_RULE =
  "Fertilize up to twice per cycle, with a growth stage between the two passes — each pass gives 50%, two gives 100%. Grass can only be fertilized once. Manure/slurry can use a double-application rate to reach 100% in one pass, at half driving speed.";

/** Lime cadence — stated consistently as "every 3rd harvest" for grains and both rice crops. */
export const LIMING_RULE =
  "Apply lime roughly every 3rd harvest (confirmed for grains and both rice crops); new fields/paddies don't need it. The field info box and the map's soil-composition filter both flag when it's due.";

/** The plow cadence after root crops is the one point the source itself doesn't resolve. */
export const PLOWING_NOTE =
  "Plowing is required after root crops (potatoes, corn, sugar beet, sugarcane) and after every harvest for carrots/parsnips/red beet. The exact cadence for sugar beet and cotton is stated inconsistently across source articles (every harvest vs. every 3rd) — treat the in-game field info box as authoritative rather than a fixed rule.";

export const ROW_CROP_NOTE =
  "Potatoes, carrots, parsnips, and red beet are row-planted and need a hoe instead of a weeder at every weed stage. Onions are also row-planted but are the one exception — they use a weeder like non-row crops.";

export const HARVEST_BLOCKED_BY_RAIN =
  "Harvesting is blocked during rain — check the in-game Weather forecast against any crop with a narrow harvest window before relying on a specific date.";

export const WITHERING_NOTE =
  "Missing a crop's harvest window destroys it (\"withers\"). This is most time-critical for narrow-window crops like Olives (October only) and overwintering grains, which take ~10 months from autumn sowing to summer harvest.";
