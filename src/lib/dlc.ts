/** Reference catalogue of official FS25 DLC, sourced from docs/reference/fs25/dlc/_index.md
 * (compiled from farming-simulator.com/dlc.php). Hand-edit, not database-backed, same pattern
 * as crops.ts and soilSuggestions.ts. Slugs match that folder's filenames. Backs the save
 * wizard/Settings DLC checklist (Save.dlc_owned) — informational today, earmarked for
 * DLC-aware crop/equipment coverage (see issue #15). */
export interface DlcInfo {
  slug: string;
  name: string;
  free?: boolean;
}

export const DLC_CATALOGUE: DlcInfo[] = [
  { slug: "precision-farming-3", name: "Precision Farming 3.0", free: true },
  { slug: "straw-harvest-pack", name: "Straw Harvest Pack", free: true },
  { slug: "emergency-pack", name: "Emergency Pack", free: true },
  { slug: "highlands-fishing-expansion", name: "Highlands Fishing Expansion" },
  { slug: "beans-and-alpacas-expansion", name: "Beans & Alpacas Expansion" },
  { slug: "mercedes-benz-trucks-pack", name: "Mercedes-Benz Trucks Pack" },
  { slug: "nexat-pack", name: "NEXAT Pack" },
  { slug: "plains-and-prairies-pack", name: "Plains & Prairies Pack" },
  { slug: "sky-agriculture-pack", name: "SKY Agriculture Pack" },
  { slug: "vredo-pack", name: "Vredo Pack" },
  { slug: "macdon-pack", name: "MacDon Pack" },
  { slug: "jcb-worlds-fastest-tractor", name: "JCB — World's Fastest Tractor" },
  { slug: "new-holland-cr11-gold-edition", name: "New Holland CR11 Gold Edition" },
  { slug: "year-1-season-pass", name: "Year 1 Season Pass" },
  { slug: "year-2-season-pass", name: "Year 2 Season Pass" },
];
