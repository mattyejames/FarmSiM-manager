/**
 * Reference data for FS25 animal husbandry: breeding requirements, feed, housing, and
 * outputs/processing chains for the 8 animals covered by the official Farming Simulator
 * Academy "Animals 101" tutorial series, plus the silage/TMR production chain from
 * "Animals 102" (farming-simulator.com/newsArticle.php?news_id=280 and per-topic articles),
 * compiled 2026-08. Full source: docs/reference/fs25/animals-101.md and animals-102.md.
 *
 * Reference data only — animal husbandry has no screen, database table, or route in this app
 * yet. This file exists so a future feature (barns/pastures, feed planning, breeding tracking)
 * doesn't have to re-derive facts already extracted from the source material.
 *
 * As with crops.ts, most named equipment in the source is FS22-era and is intentionally
 * omitted in favour of generic descriptions — the procedures carry over to FS25, model numbers
 * may not.
 */

/** How well-corroborated a fact is against the source material. */
export type AnimalDataConfidence = "high" | "medium" | "low";

export interface AnimalFeedProductivity {
  feed: string;
  productivity: string;
}

export interface AnimalInfo {
  name: string;
  /** Minimum age before an animal can breed. null = bees, which have no breeding mechanic. */
  breedingAgeMonths: number | null;
  /** What the animal eats, and how, in prose (the mix varies too much across animals for a shared shape). */
  feed: string;
  /** Graded feed-to-productivity table, where the source states one (cows, horses). Omitted where feeding is binary (fed = 100%). */
  feedProductivity?: AnimalFeedProductivity[];
  /** How the animal's water requirement works — several housing types have it built in. */
  waterHandling: string;
  strawNeeded: boolean;
  housingOptions: string[];
  primaryOutputs: string[];
  processesInto?: string[];
  note?: string;
  confidence: AnimalDataConfidence;
}

export const ANIMALS: AnimalInfo[] = [
  {
    name: "Chickens",
    breedingAgeMonths: 6,
    feed: "Wheat, barley or sorghum — or a ready-made \"chicken feed\" Bigbag from the dealership (basically just wheat).",
    waterHandling: "Never needed — the only animal with no water requirement at all.",
    strawNeeded: false,
    housingOptions: ["Pasture (caps at 30 chickens)", "Coop (for larger egg operations)"],
    primaryOutputs: ["Eggs"],
    processesInto: ["Cake (bakery)"],
    note: "Easiest animal to start with. Cannot be transported by trailer — buy/sell at the livestock trader or directly at the barn. Needs a rooster to breed.",
    confidence: "high",
  },
  {
    name: "Pigs",
    breedingAgeMonths: 6,
    feed: "A 4-crop-group mix, mixed automatically by the sty (no mixer wagon needed) — see PIG_FEED_MIX below. Premade pig feed from the dealership is a simpler starting alternative.",
    waterHandling: "Pasture only — pigsties have water built in.",
    strawNeeded: true,
    housingOptions: ["Pig pasture (no slurry/manure)", "Pigsty", "Large pigsty"],
    primaryOutputs: ["Pigs", "Manure", "Slurry"],
    note: "Most time-consuming to feed — the only animal needing a multi-crop ration you must grow yourself (or buy premade). Sold directly at the barn.",
    confidence: "high",
  },
  {
    name: "Sheep",
    breedingAgeMonths: 8,
    feed: "Grass or hay — either reaches 100% productivity, no penalty for choosing one over the other.",
    waterHandling: "Pasture only.",
    strawNeeded: false,
    housingOptions: ["Pasture", "Barn", "Large barn"],
    primaryOutputs: ["Wool"],
    processesInto: ["Cloth (spinning mill)", "Clothes (tailor)"],
    note: "Named as a beginner entry alongside chickens. Breed variants (Landrace of Bentheim, Steinschaf, Swiss Black-Brown Mountain, Black Welsh Mountain) are cosmetic only. Purchase ages: very young or 8 months (already mature).",
    confidence: "high",
  },
  {
    name: "Goats",
    breedingAgeMonths: 8,
    feed: "Grass or hay — either reaches 100% productivity, no penalty. A cheaper/easier alternative to cows for milk.",
    waterHandling: "Pasture only.",
    strawNeeded: false,
    housingOptions: ["Pasture", "Barn(s)", "Large barn — kept under the \"Sheep\" tab in the shop"],
    primaryOutputs: ["Milk"],
    processesInto: ["Bottled milk", "Butter", "Goat cheese", "Strawberry cake (bakery, via butter)"],
    note: "FS25-era (news_id=585). Purchase ages: 0, 3, or 16 months — younger goats produce no milk and don't breed.",
    confidence: "high",
  },
  {
    name: "Cows",
    breedingAgeMonths: 18,
    feed: "TMR (straw + hay + silage + mineral feed) for 100% productivity.",
    feedProductivity: [
      { feed: "TMR", productivity: "100%" },
      { feed: "Hay only", productivity: "80%" },
      { feed: "Grass only", productivity: "40%" },
    ],
    waterHandling: "Pasture only — barn with feeding robot also skips the water trough.",
    strawNeeded: true,
    housingOptions: ["Pasture (milk only, no manure/slurry)", "Barn", "Large barn", "Barn with feeding robot"],
    primaryOutputs: ["Milk", "Manure", "Slurry"],
    processesInto: ["Cheese, chocolate (via cheese factory / chocolatier / bakery)"],
    note: "Most complex animal to care for — the Academy suggests starting with chickens or sheep instead. Breed determines role, not just appearance: Brown-Swiss/Holstein are dairy, Angus/Limousin are breeding-only (no milk). The feeding robot barn is recommended outright — it replaces both the mixer wagon and the water trough. The only published TMR ratio (Kuhn RA 142 mixer wagon) is in TMR_RATIO_EXAMPLE below.",
    confidence: "high",
  },
  {
    name: "Highland Cattle",
    breedingAgeMonths: 18,
    feed: "Grass, hay, silage, or TMR — a fenced meadow covers up to 40% of feeding on its own.",
    waterHandling: "Pasture only.",
    strawNeeded: true,
    housingOptions: ["Cow pasture", "Cow barn", "Cow barn (large)", "Cow barn with feeding robot"],
    primaryOutputs: ["Breeding stock", "Manure", "Slurry"],
    note: "FS25 (Highlands Fishing DLC, news_id=649). Breeding-only — no milk. Flagged for experienced players; requires similar equipment to cows. Neglect just stops breeding, does not otherwise harm the animals. To keep dairy cows and highland cattle in the same barn you need a dairy barn.",
    confidence: "high",
  },
  {
    name: "Horses",
    breedingAgeMonths: 22,
    feed: "A base ingredient (oat, sorghum, or oat bigbag) plus hay, delivered to the stable separately — no mixer wagon needed.",
    feedProductivity: [
      { feed: "Base ingredient + hay", productivity: "100%" },
      { feed: "Base ingredient only", productivity: "60%" },
      { feed: "Hay only", productivity: "40%" },
    ],
    waterHandling: "Pasture only.",
    strawNeeded: true,
    housingOptions: ["Pasture", "Barn", "Large barn"],
    primaryOutputs: ["Trained horses"],
    note: "The only animal with mandatory daily upkeep beyond feeding: brushing (health) and riding to 100% every day (the only way to raise a horse's value before selling). Highest breeding age of any animal (22 months). 8 colour variants, cosmetic only. Can be moved between stables by riding — no trailer needed.",
    confidence: "high",
  },
  {
    name: "Bees",
    breedingAgeMonths: null,
    feed: "None — hives come pre-populated and need no feeding, water, or care at all.",
    waterHandling: "Not needed.",
    strawNeeded: false,
    housingOptions: ["Beehive (small)", "Beehive (large — recommended: more honey, bigger yield-bonus radius)"],
    primaryOutputs: ["Honey"],
    processesInto: ["Cereal (at your own cereal factory)"],
    note: "Near-zero upkeep, passive income, plus a field yield bonus: +5% sunflowers, +2.5% potatoes, +2.5% canola (place a hive near the field). Only one honey pallet-collection station can exist on the whole map, regardless of hive count — site it to suit the farm, not the hives.",
    confidence: "high",
  },
];

/** Reproduction depends on exactly three factors, stated near-identically across 7 of the 8 animal articles (bees excepted — they don't breed). */
export const BREEDING_REQUIREMENTS: string[] = [
  "Age — the animal must be past its breeding age (see ANIMALS)",
  "Space — there must be room for more animals in the housing",
  "Health at 100% — achieved by feeding regularly",
];

export const BREEDING_PLANNING_NOTE =
  "Never fill a barn to its limit — a full barn cannot breed. Leaving headroom also saves money at purchase.";

/** The one published mixing ratio in the entire Academy (Kuhn RA 142 mixer wagon). Specific to that wagon; other wagons show their own ratio as percentages in-game. */
export const TMR_RATIO_EXAMPLE = {
  wagon: "Kuhn RA 142",
  hayLitres: 4000,
  silageLitres: 4000,
  mineralFeedLitres: 450,
  straw: "fill until full",
};

/** Pigs are the only animal fed a multi-crop mix, and the only one mixed automatically (no mixer wagon). */
export const PIG_FEED_MIX: { share: string; crops: string }[] = [
  { share: "50%", crops: "Maize or sorghum" },
  { share: "25%", crops: "Wheat or barley" },
  { share: "20%", crops: "Soybeans, canola, or sunflowers" },
  { share: "5%", crops: "Potatoes or sugar beet" },
];

/** Silage inputs — grass and forage-harvested chaff. Chaff crops must be cut before their final growth stage; grass is cut at its final stage. The two timings are opposite and easy to get wrong. */
export const SILAGE_INPUTS = {
  grass: "Mown grass fields, cut at final growth stage.",
  chaffCrops: ["Corn", "Wheat", "Barley", "Oat", "Sorghum", "Canola", "Soybean", "Sunflower"],
  note: "Crops must be forage-harvested for chaff BEFORE their final growth stage — the same crop at full maturity gives grain, not chaff. Silage is stated to quadruple the sale value of grass and corn, independent of whether you keep animals.",
};

/** TMR = the four ingredients cows need for 100% productivity. */
export const TMR_INGREDIENTS: string[] = ["Hay", "Silage", "Straw", "Mineral feed"];

export function getAnimalInfo(name: string | null | undefined): AnimalInfo | undefined {
  if (!name) return undefined;
  return ANIMALS.find((a) => a.name === name);
}
