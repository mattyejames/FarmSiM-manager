CREATE TABLE field (
  id         TEXT PRIMARY KEY,
  name       TEXT NOT NULL,
  size_value REAL NOT NULL,
  size_unit  TEXT NOT NULL DEFAULT 'HA',
  soil_type  TEXT,
  notes      TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE rotation_entry (
  id         TEXT PRIMARY KEY,
  field_id   TEXT NOT NULL REFERENCES field(id) ON DELETE CASCADE,
  year       INTEGER NOT NULL,
  season     TEXT NOT NULL,
  crop       TEXT,
  notes      TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (field_id, year, season)
);

CREATE INDEX idx_rotation_entry_field_id ON rotation_entry(field_id);
