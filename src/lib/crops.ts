import type { Season } from "./types";

export type CropGrowthType = "annual" | "perennial" | "ratoon" | "forage";

/** How well-corroborated a crop's data is against the source material. */
export type CropDataConfidence = "high" | "medium" | "low";

export interface CropOperationStep {
  /** Short label for the step, e.g. "Fertilize (1st pass)". */
  step: string;
  /** Generic machine/implement category needed, e.g. "Cultivator". Omitted for non-machine steps. */
  machine?: string;
  /** Yield-boosting but not required to get a harvest. */
  optional?: boolean;
}

export interface CropInfo {
  name: string;
  growthType: CropGrowthType;
  /** Seasons this crop is normally sown in, derived from sowMonths. */
  sowSeasons: Season[];
  /** Seasons this crop is normally ready to harvest in, derived from harvestMonths. */
  harvestSeasons: Season[];
  /** Months (1-12) this crop is normally sown/planted in. */
  sowMonths: number[];
  /** Months (1-12) this crop is normally ready to harvest in. */
  harvestMonths: number[];
  /** Full field-operation sequence, in order, with the machine category each step needs. */
  operations: CropOperationStep[];
  /** Harvesters are shared across crops in the same group (e.g. one combine + grain header). */
  harvesterGroup?: string;
  /** Extra agronomic detail worth surfacing to the player. */
  note?: string;
  confidence: CropDataConfidence;
}

const ALL_MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

/** January=index 0 ... December=index 11, mapped onto the app's 4-season model. */
const SEASON_BY_MONTH: Season[] = [
  "WINTER",
  "WINTER",
  "SPRING",
  "SPRING",
  "SPRING",
  "SUMMER",
  "SUMMER",
  "SUMMER",
  "AUTUMN",
  "AUTUMN",
  "AUTUMN",
  "WINTER",
];

function seasonsFromMonths(months: number[]): Season[] {
  const seen = new Set<Season>();
  const ordered: Season[] = [];
  for (const month of months) {
    const season = SEASON_BY_MONTH[month - 1];
    if (!seen.has(season)) {
      seen.add(season);
      ordered.push(season);
    }
  }
  return ordered;
}

type RawCrop = Omit<CropInfo, "sowSeasons" | "harvestSeasons">;

/**
 * Reference data for FS25 base-game crops: full field-operation sequence, machine category
 * per step, and month-level sow/harvest timing.
 *
 * Sourced from the official Farming Simulator Academy "Crops 101" tutorial series
 * (farming-simulator.com/newsArticle.php?news_id=280 and its per-crop articles) and the
 * companion "Ground Working 101" series, compiled 2026-08. Month windows and procedures are
 * primary-sourced and high-confidence; named equipment in the source skews FS22-era, so this
 * file intentionally uses generic machine categories rather than brand/model names, which the
 * Academy itself warns may not carry over to FS25. "Grass" is not covered by the Crops 101
 * series (it's forage, not a sown field crop) and keeps its confidence from earlier secondary
 * research. A few figures the source itself doesn't state (Spinach's exact harvest months) are
 * flagged in that crop's note.
 */
const RAW_CROPS: RawCrop[] = [
  // ---- Grains & oilseeds: share one combine + grain header (7-crop group incl. Long Grain Rice) ----
  {
    name: "Wheat",
    growthType: "annual",
    sowMonths: [9, 10],
    harvestMonths: [7, 8],
    harvesterGroup: "grain-header",
    operations: [
      { step: "Lime", machine: "Fertilizer spreader", optional: true },
      { step: "Cultivate", machine: "Cultivator" },
      { step: "Sow", machine: "Seeder" },
      { step: "Fertilize (1st pass)", machine: "Fertilizer spreader/sprayer" },
      { step: "Weed control", machine: "Weeder, then sprayer if severe" },
      { step: "Fertilize (2nd pass, after a growth stage)", machine: "Fertilizer spreader/sprayer" },
      { step: "Harvest — activate straw swath for straw", machine: "Combine + grain header" },
      { step: "Mulch stubble before next cultivation", machine: "Mulcher", optional: true },
    ],
    note: "Overwinters after autumn sowing — the Academy states a 10-month cycle to the following summer's harvest.",
    confidence: "high",
  },
  {
    name: "Barley",
    growthType: "annual",
    sowMonths: [9, 10],
    harvestMonths: [6, 7],
    harvesterGroup: "grain-header",
    operations: [
      { step: "Lime", machine: "Fertilizer spreader", optional: true },
      { step: "Cultivate", machine: "Cultivator" },
      { step: "Sow", machine: "Seeder" },
      { step: "Fertilize (1st pass)", machine: "Fertilizer spreader/sprayer" },
      { step: "Weed control", machine: "Weeder, then sprayer if severe" },
      { step: "Fertilize (2nd pass, after a growth stage)", machine: "Fertilizer spreader/sprayer" },
      { step: "Harvest — activate straw swath for straw", machine: "Combine + grain header" },
      { step: "Mulch stubble before next cultivation", machine: "Mulcher", optional: true },
    ],
    note: "Overwinters after autumn sowing; earliest harvest of any grain (June–July).",
    confidence: "high",
  },
  {
    name: "Oat",
    growthType: "annual",
    sowMonths: [3, 4],
    harvestMonths: [7, 8],
    harvesterGroup: "grain-header",
    operations: [
      { step: "Lime", machine: "Fertilizer spreader", optional: true },
      { step: "Cultivate", machine: "Cultivator" },
      { step: "Sow", machine: "Seeder" },
      { step: "Fertilize (1st pass)", machine: "Fertilizer spreader/sprayer" },
      { step: "Weed control", machine: "Weeder, then sprayer if severe" },
      { step: "Fertilize (2nd pass, after a growth stage)", machine: "Fertilizer spreader/sprayer" },
      { step: "Harvest — activate straw swath for straw", machine: "Combine + grain header" },
      { step: "Mulch stubble before next cultivation", machine: "Mulcher", optional: true },
    ],
    confidence: "high",
  },
  {
    name: "Canola (Oilseed Rape)",
    growthType: "annual",
    sowMonths: [8, 9],
    harvestMonths: [7, 8],
    harvesterGroup: "grain-header",
    operations: [
      { step: "Lime", machine: "Fertilizer spreader", optional: true },
      { step: "Cultivate", machine: "Cultivator" },
      { step: "Sow", machine: "Seeder" },
      { step: "Fertilize (1st pass)", machine: "Fertilizer spreader/sprayer" },
      { step: "Weed control", machine: "Weeder, then sprayer if severe" },
      { step: "Fertilize (2nd pass, after a growth stage)", machine: "Fertilizer spreader/sprayer" },
      { step: "Harvest", machine: "Combine + grain header" },
      { step: "Place a beehive nearby", optional: true },
    ],
    note: "Overwinters after autumn sowing. On a fresh seasonal save (game starts in August) canola is the only crop sowable at that point.",
    confidence: "high",
  },
  {
    name: "Sorghum",
    growthType: "annual",
    sowMonths: [4, 5],
    harvestMonths: [8, 9],
    harvesterGroup: "grain-header",
    operations: [
      { step: "Lime", machine: "Fertilizer spreader", optional: true },
      { step: "Cultivate", machine: "Cultivator" },
      { step: "Sow", machine: "Planter" },
      { step: "Fertilize (1st pass)", machine: "Fertilizer spreader/sprayer" },
      { step: "Weed control", machine: "Weeder, then sprayer if severe" },
      { step: "Fertilize (2nd pass, after a growth stage)", machine: "Fertilizer spreader/sprayer" },
      { step: "Harvest", machine: "Combine + grain header" },
    ],
    note: "Source disagreement on sowing machine: the general seeding guide lists sorghum as seeder-sown, but the sorghum-specific tutorial calls for a planter — check the crop icon in-shop.",
    confidence: "high",
  },
  {
    name: "Soybean",
    growthType: "annual",
    sowMonths: [4, 5],
    harvestMonths: [10, 11],
    harvesterGroup: "grain-header",
    operations: [
      { step: "Lime", machine: "Fertilizer spreader", optional: true },
      { step: "Cultivate", machine: "Cultivator" },
      { step: "Sow", machine: "Planter" },
      { step: "Fertilize (1st pass)", machine: "Fertilizer spreader/sprayer" },
      { step: "Weed control", machine: "Weeder, then sprayer if severe" },
      { step: "Fertilize (2nd pass, after a growth stage)", machine: "Fertilizer spreader/sprayer" },
      { step: "Harvest", machine: "Combine + grain header" },
    ],
    confidence: "high",
  },
  {
    name: "Long Grain Rice",
    growthType: "annual",
    sowMonths: [4],
    harvestMonths: [9],
    harvesterGroup: "grain-header",
    operations: [
      { step: "Place a rice paddy (build mode, once)" },
      { step: "Sow — dry, not into water", machine: "Seeder" },
      { step: "Flood the paddy (after sowing)", machine: "Water pump" },
      { step: "Maintain water level — check the pump daily" },
      { step: "Fertilize — a single pass only, unlike other crops", machine: "Seeder/spreader" },
      { step: "Harvest", machine: "Combine + grain header" },
      { step: "To regrow: cultivate the paddy — no need to re-place it", machine: "Cultivator" },
      { step: "Lime every 3rd harvest (new paddies don't need it)", machine: "Fertilizer spreader", optional: true },
    ],
    note: "Dry-sown, then flooded after sowing — unlike regular Rice. Uses a standard grain header at harvest, unlike regular Rice's dedicated harvester.",
    confidence: "high",
  },

  // ---- Rice (own harvester, not the grain-header group) ----
  {
    name: "Rice",
    growthType: "annual",
    sowMonths: [4, 5],
    harvestMonths: [8, 9],
    operations: [
      { step: "Place a rice paddy (build mode, once)" },
      { step: "Sow directly into water — fertilizer is loaded into the planter", machine: "Special rice planter" },
      { step: "Flood & maintain water at or below 60% — check the pump daily" },
      { step: "Harvest", machine: "Dedicated rice harvester (not a grain header)" },
      { step: "To regrow: cultivate the paddy — no need to re-place it", machine: "Cultivator" },
      { step: "Lime every 3rd harvest (new paddies don't need it)", machine: "Fertilizer spreader", optional: true },
    ],
    note: "Paddy is flooded before sowing, and fertilizer is applied via the planter, not a separate pass. Rice saplings can also be grown in a specialized greenhouse.",
    confidence: "high",
  },

  // ---- Row crops with dedicated headers ----
  {
    name: "Corn (Maize)",
    growthType: "annual",
    sowMonths: [4, 5],
    harvestMonths: [10, 11],
    operations: [
      { step: "Plow (required, not just cultivate)", machine: "Plow" },
      { step: "Sow", machine: "Planter" },
      { step: "Fertilize", machine: "Fertilizer spreader/sprayer" },
      { step: "Weed control", machine: "Weeder, then sprayer if severe" },
      { step: "Harvest chaff for silage (earlier window, Aug–Sep)", machine: "Forage harvester + forage header", optional: true },
      { step: "Harvest maize", machine: "Combine + dedicated corn header" },
      { step: "Plow again after harvest", machine: "Plow" },
    ],
    note: "Two separate harvests: chaff for silage (Aug–Sep) and the main maize harvest (Oct–Nov). Corn is American English, maize British — same crop.",
    confidence: "high",
  },
  {
    name: "Sunflower",
    growthType: "annual",
    sowMonths: [3, 4],
    harvestMonths: [10, 11],
    harvesterGroup: "corn-header",
    operations: [
      { step: "Cultivate (plow only if the field info box asks)", machine: "Cultivator" },
      { step: "Sow", machine: "Planter" },
      { step: "Fertilize", machine: "Fertilizer spreader/sprayer" },
      { step: "Weed control", machine: "Weeder, then sprayer if severe" },
      { step: "Harvest", machine: "Combine + sunflower header (or corn header)" },
      { step: "Place a beehive nearby", optional: true },
    ],
    note: "Harvestable with either a dedicated sunflower header or a corn header — free to harvest if you already own one for corn. Silo-storable, unlike most specialty crops.",
    confidence: "high",
  },
  {
    name: "Cotton",
    growthType: "annual",
    sowMonths: [2, 3],
    harvestMonths: [10, 11],
    operations: [
      { step: "Cultivate", machine: "Cultivator" },
      { step: "Sow", machine: "Seed drill/planter" },
      { step: "Fertilize", machine: "Fertilizer spreader/sprayer" },
      { step: "Plow when changing crops / every 3rd harvest (cadence disputed — check field info)", machine: "Plow" },
      { step: "Harvest (min. 2,000 L to unload a bale; up to 20,000 L per module)", machine: "Module-building cotton harvester (no header)" },
      { step: "Collect modules", machine: "Dedicated cotton/module trailer" },
    ],
    note: "Earliest planting window of any crop (Feb–Mar). Not silo-storable — sold only at the spinnery. The Academy calls it \"quite expensive\" and recommends renting the harvester.",
    confidence: "high",
  },

  // ---- Root & tuber crops ----
  {
    name: "Potato",
    growthType: "annual",
    sowMonths: [3, 4],
    harvestMonths: [8, 9],
    operations: [
      { step: "Subsoiler (not a cultivator)", machine: "Subsoiler" },
      { step: "Plant — harvested potatoes can refill the planter", machine: "Potato planter" },
      { step: "Hoe — a row crop, not weeder-compatible", machine: "Hoe" },
      { step: "Fertilize", machine: "Fertilizer spreader/sprayer", optional: true },
      { step: "Harvest", machine: "Dedicated potato harvester" },
    ],
    confidence: "high",
  },
  {
    name: "Sugar Beet",
    growthType: "annual",
    sowMonths: [3, 4],
    harvestMonths: [10, 11],
    operations: [
      { step: "Subsoiler — used every pass instead of alternating cultivator/plow", machine: "Subsoiler" },
      { step: "Sow — some planters fertilize simultaneously", machine: "Sugar beet planter" },
      { step: "Fertilize (2nd pass needs the spreader, not the planter)", machine: "Fertilizer spreader" },
      { step: "Weed control", machine: "Weeder, then sprayer if severe" },
      { step: "Top the haulms, then lift — a beet combine does both, or pair a topper + harvester", machine: "Haulm topper + beet harvester (~185 hp)" },
      { step: "Plow (cadence disputed in source — every harvest vs every 3rd; check field info)", machine: "Plow" },
    ],
    note: "Withers after November if not harvested. Not silo-storable — unload on the ground.",
    confidence: "high",
  },
  {
    name: "Carrots",
    growthType: "annual",
    sowMonths: [4, 5, 6, 7],
    harvestMonths: [8, 9, 10, 11],
    harvesterGroup: "root-shared",
    operations: [
      { step: "Attach front weights — required for rear-mounted gear" },
      { step: "Subsoiler (not a plow)", machine: "Subsoiler" },
      { step: "Ridge-form — counts as a fertilizing stage, cuts required fertilizer passes to one", machine: "Ridge former", optional: true },
      { step: "Sow", machine: "Vegetable planter" },
      { step: "Hoe — a row crop, not weeder-compatible", machine: "Hoe" },
      { step: "Fertilize (once if ridged, twice if not)", machine: "Fertilizer spreader/sprayer" },
      { step: "Harvest", machine: "Shared root-crop harvester" },
      { step: "Plow after every harvest", machine: "Plow" },
    ],
    note: "Widest sowing window of the root crops. Shares an identical workflow and harvester with Parsnips and Red Beet. Not silo-storable — use the pallet store.",
    confidence: "high",
  },
  {
    name: "Parsnips",
    growthType: "annual",
    sowMonths: [4, 5, 6],
    harvestMonths: [8, 9, 10, 11],
    harvesterGroup: "root-shared",
    operations: [
      { step: "Attach front weights — required for rear-mounted gear" },
      { step: "Subsoiler (not a plow)", machine: "Subsoiler" },
      { step: "Ridge-form — counts as a fertilizing stage, cuts required fertilizer passes to one", machine: "Ridge former", optional: true },
      { step: "Sow", machine: "Vegetable planter" },
      { step: "Hoe — a row crop, not weeder-compatible", machine: "Hoe" },
      { step: "Fertilize (once if ridged, twice if not)", machine: "Fertilizer spreader/sprayer" },
      { step: "Harvest", machine: "Shared root-crop harvester" },
      { step: "Plow after every harvest", machine: "Plow" },
    ],
    note: "Shares an identical workflow and harvester with Carrots and Red Beet. Not silo-storable — use the pallet store.",
    confidence: "high",
  },
  {
    name: "Red Beet",
    growthType: "annual",
    sowMonths: [4, 5, 6],
    harvestMonths: [8, 9, 10, 11],
    harvesterGroup: "root-shared",
    operations: [
      { step: "Attach front weights — required for rear-mounted gear" },
      { step: "Subsoiler (not a plow)", machine: "Subsoiler" },
      { step: "Ridge-form — counts as a fertilizing stage, cuts required fertilizer passes to one", machine: "Ridge former", optional: true },
      { step: "Sow", machine: "Vegetable planter" },
      { step: "Hoe — a row crop, not weeder-compatible", machine: "Hoe" },
      { step: "Fertilize (once if ridged, twice if not)", machine: "Fertilizer spreader/sprayer" },
      { step: "Harvest", machine: "Shared root-crop harvester" },
      { step: "Plow after every harvest", machine: "Plow" },
    ],
    note: "Also called beetroot. Shares an identical workflow and harvester with Carrots and Parsnips. Not silo-storable — use the pallet store.",
    confidence: "high",
  },
  {
    name: "Onions",
    growthType: "annual",
    sowMonths: [3, 4],
    harvestMonths: [8, 9],
    operations: [
      { step: "Cultivate (not a subsoiler)", machine: "Cultivator" },
      { step: "Sow", machine: "Special onion planter" },
      { step: "Weed control — a weeder works here, unlike other row crops", machine: "Weeder" },
      { step: "Fertilize", machine: "Fertilizer spreader/sprayer" },
      { step: "Cut foliage & dig (front-mounted)", machine: "Onion harvester" },
      { step: "Windrow & clean (rear-mounted, same pass)", machine: "Onion windrower" },
      { step: "Pick up", machine: "Second harvester" },
      { step: "Top the onions for extra profit", machine: "Onion topper (placeable)", optional: true },
    ],
    note: "The most machine-intensive harvest in the game — three machines in sequence. Not currently listed in this app's crop picker until this update; base-game FS25 crop, easy to miss.",
    confidence: "high",
  },

  // ---- Orchards & vineyards: built, not sown ----
  {
    name: "Grapes",
    growthType: "perennial",
    sowMonths: [3, 4, 5],
    harvestMonths: [9, 10],
    operations: [
      { step: "Build vine rows (once, via Build Menu → Production → orchards)" },
      { step: "Mulch between rows, once grass grows back", machine: "Mulcher" },
      { step: "Cultivate between rows", machine: "Slim subsoiler" },
      { step: "Fertilize — liquid; enable double-application rate to do it in one pass", machine: "Sprayer" },
      { step: "Harvest — centre the harvester on the row; unload rearward", machine: "Dedicated grape harvester" },
      { step: "Prune once leaves turn yellow — required, or vines won't fruit again next year", machine: "Leaf cutter / pruner" },
    ],
    note: "Planted once; the annual cycle (mulch → cultivate → fertilize → harvest → prune) then repeats every year without replanting. Withers after October if not harvested.",
    confidence: "high",
  },
  {
    name: "Olives",
    growthType: "perennial",
    sowMonths: [8, 9],
    harvestMonths: [10],
    operations: [
      { step: "Build tree rows (once, via Build Menu → Production → orchards)" },
      { step: "Mulch between rows", machine: "Mulcher" },
      { step: "Cultivate between rows", machine: "Slim subsoiler" },
      { step: "Fertilize — liquid", machine: "Sprayer" },
      { step: "Harvest — centre the harvester on the row; unload rearward", machine: "Dedicated olive harvester" },
    ],
    note: "Planted once; the annual cycle then repeats every year without replanting or pruning (unlike Grapes). Withers after October if not harvested.",
    confidence: "high",
  },

  // ---- Regrowing crops: plant once, harvest repeatedly ----
  {
    name: "Sugarcane",
    growthType: "ratoon",
    sowMonths: [3, 4],
    harvestMonths: [10, 11],
    operations: [
      { step: "Sow cuttings (once — no plowing or cultivating first)", machine: "Sugarcane planter" },
      { step: "Harvest — fills the trailer via the pipe", machine: "Self-propelled or tractor-attached cane harvester" },
      { step: "Regrows automatically — no replanting needed" },
      { step: "Plow after the 3rd harvest to avoid a yield penalty, then replant with cuttings from the previous harvest", machine: "Plow", optional: true },
    ],
    note: "High yield but low selling price. Not silo-storable.",
    confidence: "high",
  },
  {
    name: "Poplar",
    growthType: "perennial",
    sowMonths: [3, 4, 5, 6, 7, 8],
    harvestMonths: ALL_MONTHS,
    operations: [
      { step: "Plant saplings (once — no field prep needed)", machine: "Forestry planter" },
      { step: "Harvest any time once mature — never withers", machine: "Forage harvester + forestry header, or dedicated baler" },
      { step: "Regrows automatically — no replanting needed" },
      { step: "Plow after the 3rd harvest to avoid a yield penalty", machine: "Plow", optional: true },
    ],
    note: "Never withers, so it carries no timing pressure. A baler route can save nearly $400,000 over the forage-harvester route. Not silo-storable.",
    confidence: "high",
  },

  // ---- Spinach / peas / green beans: shared 8-step vegetable workflow ----
  {
    name: "Spinach",
    growthType: "annual",
    sowMonths: [3, 4, 5],
    harvestMonths: [6, 8],
    operations: [
      { step: "Lime", machine: "Fertilizer spreader", optional: true },
      { step: "Cultivate", machine: "Cultivator" },
      { step: "Sow", machine: "Seeder" },
      { step: "Fertilize", machine: "Fertilizer spreader/sprayer" },
      { step: "Roll", machine: "Soil roller", optional: true },
      { step: "Weed control", machine: "Weeder, then sprayer if severe" },
      { step: "Harvest — regrows once for a 2nd harvest the same year if sown early", machine: "Dedicated leaf harvester" },
      { step: "Sell or process immediately — cannot be stored at all" },
    ],
    note: "Harvest months aren't given precisely by the source (only \"regrows once, 2 harvests\" within the Mar–May growing window) — treat the months above as an approximation.",
    confidence: "medium",
  },
  {
    name: "Peas",
    growthType: "annual",
    sowMonths: [4, 5, 6, 7],
    harvestMonths: [7, 8, 9],
    operations: [
      { step: "Lime", machine: "Fertilizer spreader", optional: true },
      { step: "Cultivate", machine: "Cultivator" },
      { step: "Sow", machine: "Seeder" },
      { step: "Fertilize", machine: "Fertilizer spreader/sprayer" },
      { step: "Roll", machine: "Soil roller", optional: true },
      { step: "Weed control", machine: "Weeder, then sprayer if severe" },
      { step: "Harvest — unfold the pipe to unload", machine: "Dedicated pod harvester" },
    ],
    confidence: "high",
  },
  {
    name: "Green Beans",
    growthType: "annual",
    sowMonths: [4, 5, 6, 7],
    harvestMonths: [8, 9, 10, 11],
    operations: [
      { step: "Lime", machine: "Fertilizer spreader", optional: true },
      { step: "Cultivate", machine: "Cultivator" },
      { step: "Sow", machine: "Planter" },
      { step: "Fertilize", machine: "Fertilizer spreader/sprayer" },
      { step: "Roll", machine: "Soil roller", optional: true },
      { step: "Weed control", machine: "Weeder, then sprayer if severe" },
      { step: "Harvest — raise the bunker to unload", machine: "Dedicated bean harvester" },
    ],
    confidence: "high",
  },

  // ---- Forage: not covered by the Crops 101 series ----
  {
    name: "Grass",
    growthType: "forage",
    sowMonths: [3],
    harvestMonths: [6, 8, 10],
    operations: [
      { step: "Mow", machine: "Mower" },
      { step: "Tedder — dries for hay", machine: "Tedder", optional: true },
      { step: "Rake / windrow", machine: "Rake/windrower" },
      { step: "Bale, or forage-harvest directly", machine: "Baler, or forage harvester + pickup header" },
      { step: "Wrap — silage bales only", machine: "Bale wrapper", optional: true },
      { step: "Fertilize — only one pass possible for grass, unlike other crops", machine: "Grass roller / fertilizer spreader" },
    ],
    note: "Not covered by the Crops 101 series (it's forage, not a sown field crop), so this entry keeps its confidence from earlier secondary research. Rolling after mowing grants an automatic fertilizing-stage bonus, but rolling over already-mature grass resets its growth stage.",
    confidence: "medium",
  },
];

export const CROPS: CropInfo[] = RAW_CROPS.map((crop) => ({
  ...crop,
  sowSeasons: seasonsFromMonths(crop.sowMonths),
  harvestSeasons: seasonsFromMonths(crop.harvestMonths),
}));

export const CROP_NAMES = CROPS.map((c) => c.name);

export type Crop = (typeof CROP_NAMES)[number];

export function getCropInfo(name: string | null): CropInfo | undefined {
  if (!name) return undefined;
  return CROPS.find((c) => c.name === name);
}

const MONTH_ABBR = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/** Formats a set of month numbers (1-12) as a compact range string, e.g. "Sep–Oct". */
export function formatMonthRange(months: number[]): string {
  if (months.length === 0) return "";
  if (months.length === 12) return "year-round";
  const sorted = [...months].sort((a, b) => a - b);
  const first = sorted[0];
  const last = sorted[sorted.length - 1];
  if (first === last) return MONTH_ABBR[first - 1];
  return `${MONTH_ABBR[first - 1]}–${MONTH_ABBR[last - 1]}`;
}

/** Sentinel used in selects for "no crop planned" — stored as null in the DB. */
export const NO_CROP_LABEL = "Fallow / No Crop";
