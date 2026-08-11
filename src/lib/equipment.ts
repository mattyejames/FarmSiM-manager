import type { Vehicle } from "./types";

export interface EquipmentCheck {
  machine: string;
  owned: boolean;
}

export function ownedCategorySet(vehicles: Vehicle[]): Set<string> {
  return new Set(vehicles.map((v) => v.category));
}

/** Checks a crop's required machine categories against what the player owns. */
export function checkEquipment(machines: string[], owned: Set<string>): EquipmentCheck[] {
  return machines.map((machine) => ({ machine, owned: owned.has(machine) }));
}
