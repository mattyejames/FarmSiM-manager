-- User-entered inventory of vehicles/implements they own in-game. category is free text
-- matched against the machine strings in crops.ts operations (not a DB-level enum/FK, since
-- that reference data lives in the frontend and can grow over time) — it's how the app knows
-- which of a crop's required equipment the player already has versus still needs to buy/rent.
CREATE TABLE vehicle (
  id         TEXT PRIMARY KEY,
  name       TEXT NOT NULL,
  category   TEXT NOT NULL,
  notes      TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_vehicle_category ON vehicle(category);
