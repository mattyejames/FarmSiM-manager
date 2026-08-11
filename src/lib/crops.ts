/** Common FS25 crops. Not exhaustive — hand-edit as new DLC crops come up. */
export const CROPS = [
  "Wheat",
  "Barley",
  "Oat",
  "Canola (Oilseed Rape)",
  "Sunflower",
  "Soybean",
  "Corn (Maize)",
  "Potato",
  "Sugar Beet",
  "Sugarcane",
  "Cotton",
  "Grapes",
  "Olives",
  "Poplar",
] as const;

export type Crop = (typeof CROPS)[number];

/** Sentinel used in selects for "no crop planned" — stored as null in the DB. */
export const NO_CROP_LABEL = "Fallow / No Crop";
