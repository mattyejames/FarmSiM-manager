/**
 * Reference data for FS25 loading machines and front-loader attachments, sourced from the
 * official Farming Simulator Academy "Machinery 101" tutorials
 * (farming-simulator.com/newsArticle.php?news_id=280, articles 412/386), compiled 2026-08.
 * Full source: docs/reference/fs25/machinery-101.md.
 *
 * Reference data only — not wired into vehicles.ts/equipment.ts, which are scoped to crop
 * field operations (see crops.ts's EQUIPMENT_CATEGORIES). This file exists because loaders are
 * a cross-cutting dependency of the animal husbandry and forestry domains this app doesn't
 * implement yet (feeding bales, moving pallets/logs/containers) — see animals.ts, forestry.ts,
 * fishing.ts, and machinery-101.md §4 for the task-to-tool cross-reference.
 */

export interface LoaderClassInfo {
  name: string;
  role: string;
  tools: string[];
}

export const LOADER_CLASSES: LoaderClassInfo[] = [
  {
    name: "Front loader",
    role: "General-purpose loading/unloading — the default, everyday farm work",
    tools: [
      "Bale spike",
      "Bale handler",
      "Bale King",
      "Universal bucket",
      "Manure fork",
      "Roundbale fork",
      "Pallet fork",
      "Log fork",
      "Fork with grapple",
      "Silage cutter",
      "Beet cutter",
      "Bigbag Lifter (Single)",
      "Bigbag Lifter (Dual)",
    ],
  },
  {
    name: "Wheel loader",
    role: "Heavy materials — logs and containers. The forestry loader class",
    tools: ["High-dump bucket", "Log fork", "Pallet fork", "Bale fork", "Silage fork"],
  },
  {
    name: "Skid-steer loader",
    role: "Work in narrow spaces — tight yards, barns, between buildings",
    tools: ["High-dump bucket", "Pallet fork", "Bale spear", "Manure fork", "Wrapped bale handler", "Stump grinder", "Log fork"],
  },
  {
    name: "Telehandler",
    role: "Placing loads at height — stacking, high unloading",
    tools: ["Bale fork", "Wrapped bale handler", "Universal bucket", "Manure fork", "Log fork", "Pallet fork"],
  },
  {
    name: "Forklift",
    role: "Pallet work — notably required for loading a cargo vessel in aquaculture",
    tools: [],
  },
];

/** The shop-taxonomy gotcha the Academy calls out explicitly: "front loader" means three different purchases. */
export const FRONT_LOADER_SETUP_NOTE =
  "A tractor-based front loader is three separate purchases: the tractor's front loader configuration (bought/set at the dealership — park the tractor in the vehicle customization field and select it), the front loader arm (Attachments), and a tool (Front Loader Tools). Without the dealership configuration step, the arm cannot be attached at all — the single most common blocker in the Academy's own instructions.";

export const PRACTICAL_MINIMUM_NOTE =
  "A tractor with the front loader configuration, a front loader arm, a bale spike, and a pallet fork is the practical minimum for a mixed farm — this pairing appears in nearly every animal tutorial's recommended equipment list.";

export function getLoaderClassInfo(name: string | null | undefined): LoaderClassInfo | undefined {
  if (!name) return undefined;
  return LOADER_CLASSES.find((l) => l.name === name);
}
