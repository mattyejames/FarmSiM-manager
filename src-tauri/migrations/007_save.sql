-- Introduces `save`: a named container for one farm/savegame. field, vehicle and game_state
-- each become owned by a save via save_id. All pre-existing data is backfilled into one
-- auto-created "My Farm" save so upgrading loses nothing. Deliberately leaves `map_selection`
-- and the Map screen untouched for now — folding map choice onto `save` is a real UI/behavior
-- change (tied to the save wizard and Settings tab) handled in a later migration, not this one.
CREATE TABLE save (
  id              TEXT PRIMARY KEY,
  name            TEXT NOT NULL,
  map_key         TEXT NOT NULL DEFAULT 'riverbend-springs',
  custom_image    TEXT,
  custom_map_name TEXT,
  dlc_owned       TEXT NOT NULL DEFAULT '[]',
  created_at      TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

INSERT INTO save (id, name) VALUES ('00000000-0000-0000-0000-000000000000', 'My Farm');

-- SQLite refuses ALTER TABLE ADD COLUMN with both a REFERENCES clause and a non-NULL default
-- once a table has existing rows, so save_id is added nullable and backfilled explicitly
-- instead. It's never actually null in practice — every query that creates a field or vehicle
-- supplies save_id — this is a SQLite ALTER TABLE limitation, not a relaxed data rule.
ALTER TABLE field ADD COLUMN save_id TEXT REFERENCES save(id) ON DELETE CASCADE;
UPDATE field SET save_id = '00000000-0000-0000-0000-000000000000';

ALTER TABLE vehicle ADD COLUMN save_id TEXT REFERENCES save(id) ON DELETE CASCADE;
UPDATE vehicle SET save_id = '00000000-0000-0000-0000-000000000000';

-- game_state's CHECK (id = 1) can't be dropped with a plain ALTER in SQLite, so rebuild the table.
CREATE TABLE game_state_new (
  save_id        TEXT PRIMARY KEY REFERENCES save(id) ON DELETE CASCADE,
  current_year   INTEGER NOT NULL DEFAULT 1,
  current_season TEXT NOT NULL DEFAULT 'SPRING',
  current_month  INTEGER NOT NULL DEFAULT 3
);
INSERT INTO game_state_new (save_id, current_year, current_season, current_month)
  SELECT '00000000-0000-0000-0000-000000000000', current_year, current_season, current_month FROM game_state;
DROP TABLE game_state;
ALTER TABLE game_state_new RENAME TO game_state;
