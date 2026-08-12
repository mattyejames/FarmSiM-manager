/**
 * Reference data for FS25 forestry: the 12 tree species, felling method, and the core
 * plant-fell-process-sell loop, sourced from the official Farming Simulator Academy
 * "Forestry 101" tutorial series (farming-simulator.com/newsArticle.php?news_id=280 and
 * per-topic articles), compiled 2026-08. Full source: docs/reference/fs25/forestry-101.md.
 *
 * Reference data only — forestry has no screen, database table, or route in this app yet.
 * This file exists so a future feature (a Forestry screen alongside Fields/Vehicles) doesn't
 * have to re-derive facts already extracted from the source material.
 *
 * The source itself flags this as the most FS22-anchored section of the Academy — every
 * article is dated 2021-11-18, and several (tree markers, rock breaking, winches, yarders)
 * are explicitly gated behind FS22's Platinum Expansion with unconfirmed FS25 availability.
 * Named equipment is intentionally omitted for the same reason it's omitted from crops.ts.
 */

export type TreeCategory = "conifer" | "deciduous";

/** Only spruce and pine can be machine-harvested; every other species (including the other two conifers) is chainsaw-only. */
export type FellingMethod = "harvester_or_chainsaw" | "chainsaw_only";

export interface TreeSpeciesInfo {
  name: string;
  category: TreeCategory;
  fellingMethod: FellingMethod;
  /** Conifers sell best as logs (straight trunks, small branches); deciduous sell best as wood chips (crooked, branch-heavy). */
  bestProduct: "Logs / timber" | "Wood chips";
}

export const TREE_SPECIES: TreeSpeciesInfo[] = [
  { name: "Spruce", category: "conifer", fellingMethod: "harvester_or_chainsaw", bestProduct: "Logs / timber" },
  { name: "Pine", category: "conifer", fellingMethod: "harvester_or_chainsaw", bestProduct: "Logs / timber" },
  { name: "Stone Pine", category: "conifer", fellingMethod: "chainsaw_only", bestProduct: "Logs / timber" },
  { name: "Cypress", category: "conifer", fellingMethod: "chainsaw_only", bestProduct: "Logs / timber" },
  { name: "Birch", category: "deciduous", fellingMethod: "chainsaw_only", bestProduct: "Wood chips" },
  { name: "Oak", category: "deciduous", fellingMethod: "chainsaw_only", bestProduct: "Wood chips" },
  { name: "Willow", category: "deciduous", fellingMethod: "chainsaw_only", bestProduct: "Wood chips" },
  { name: "Maple", category: "deciduous", fellingMethod: "chainsaw_only", bestProduct: "Wood chips" },
  { name: "Pagoda Dogwood", category: "deciduous", fellingMethod: "chainsaw_only", bestProduct: "Wood chips" },
  { name: "Shagbark Hickory", category: "deciduous", fellingMethod: "chainsaw_only", bestProduct: "Wood chips" },
  { name: "American Elm", category: "deciduous", fellingMethod: "chainsaw_only", bestProduct: "Wood chips" },
  { name: "Downy Serviceberry", category: "deciduous", fellingMethod: "chainsaw_only", bestProduct: "Wood chips" },
];

/** plant -> wait -> fell -> de-branch -> process -> transport -> sell, with a stump-mulch/replant branch. */
export const FORESTRY_CORE_LOOP: string[] = [
  "Plant saplings — species is locked at purchase, unlike crop seed bigbags",
  "Wait for growth (2–24 in-game days, varies by species)",
  "Fell — chainsaw for any species, or a harvester for spruce/pine only",
  "De-branch — trees with many branches yield less unless branches are cut off first",
  "Buck / cut to length — set the length to match your trailer or container before felling; this can't be fixed afterwards",
  "Process — chip deciduous wood, or transport logs directly",
  "Transport and sell — logs: carpentry, sawmill, biogas plant. Wood chips: farmer's market, biogas plant",
  "Mulch the stump — required before the land can be replanted or reused",
];

export const FORESTRY_NOTE =
  "Forestry needs no soil preparation at all — no cultivating, plowing, fertilizing, or weeding, on any soil type. That makes it low-labour but capital- and time-intensive: the cost is machines and the 2-24 day growth wait, not field operations.";

export const STUMP_REMOVAL_NOTE =
  "Stumps remain after felling and must be mulched before the land can be replanted or repurposed.";

export function getTreeSpeciesInfo(name: string | null | undefined): TreeSpeciesInfo | undefined {
  if (!name) return undefined;
  return TREE_SPECIES.find((t) => t.name === name);
}
