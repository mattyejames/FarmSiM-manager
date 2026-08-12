/**
 * Reference data for FS25 fishing & aquaculture (Highlands Fishing DLC), sourced from the
 * official Farming Simulator Academy "Fishing & Aquaculture" tutorials
 * (farming-simulator.com/newsArticle.php?news_id=280, articles 653/654), compiled 2026-08.
 * Full source: docs/reference/fs25/fishing-aquaculture.md.
 *
 * Reference data only — fishing/aquaculture has no screen, database table, or route in this
 * app yet. These are the newest, most reliably FS25-current articles in the whole Academy
 * (both dated 2025-11-04), but they are DLC content (Highlands Fishing Expansion), not
 * base-game — see docs/reference/fs25/dlc/highlands-fishing-expansion.md.
 */

export interface AquacultureSpeciesInfo {
  name: "Salmon" | "Trout";
  offshoreAquaculture: boolean;
  fishLake: boolean;
}

/** Salmon are offshore-only (require the cargo vessel + crane). Trout can be farmed inland in a fish lake — the simpler entry point into aquaculture. */
export const AQUACULTURE_SPECIES: AquacultureSpeciesInfo[] = [
  { name: "Salmon", offshoreAquaculture: true, fishLake: false },
  { name: "Trout", offshoreAquaculture: true, fishLake: true },
];

/** Fish feed = flour + soybeans + oil. A grain-and-oilseed arable farm already produces every input. */
export const FISH_FEED_RECIPE = {
  components: [
    { name: "Flour", sources: ["Wheat", "Barley", "Sorghum", "Oat"], via: "Mill" },
    { name: "Soybeans", sources: ["Soybean"], via: "Grown directly, no processing" },
    { name: "Oil", sources: ["Canola", "Sunflower", "Olive", "Rice"], via: "Oil mill (rice's route unspecified in source)" },
  ],
  note: "Buy the production facility in Kinlaig, or place a fish food factory on owned land, to convert these three inputs into fish feed rather than buying it directly.",
};

export const BREEDING_LOOP_STEPS: string[] = [
  "Place the young fish breeding facility, deliver feed, activate breeding",
  "Transport the young fish to a fish lake (trout) or offshore aquaculture (salmon or trout)",
  "Load the trailer with grown fish",
  "Sell at the designated point of sale",
];

export const AQUACULTURE_PLANNING_NOTE =
  "Start with trout in a fish lake — it exercises the same feed chain and breeding loop as salmon without needing a vessel, harbour, or crane. Move to salmon (offshore-only) once the feed factory is self-sustaining.";

export const ROD_FISHING_NOTE =
  "A fishing rod (hand tools category) plus any body of water is enough for incidental rod fishing — near-zero setup, not a production chain. Cast far into deep water for faster bites; shallow water slows bites.";
