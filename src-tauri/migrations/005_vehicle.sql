-- category is free text, not an enum/FK: matched against crop equipment hints by
-- name (see src/lib/equipment.ts), same "free text, suggestions in the UI" approach
-- already used for field.soil_type.
CREATE TABLE vehicle (
  id         TEXT PRIMARY KEY,
  name       TEXT NOT NULL,
  category   TEXT NOT NULL,
  notes      TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
