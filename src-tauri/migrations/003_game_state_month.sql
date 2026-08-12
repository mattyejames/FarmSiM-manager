-- Adds a month-level (1-12) pointer alongside the existing season pointer, since crop
-- reference data (crops.ts) is now month-precise for sow/harvest timing rather than
-- season-precise. current_month becomes the source of truth going forward; current_season
-- is backfilled here for a smooth upgrade but is no longer written to by the app.
ALTER TABLE game_state ADD COLUMN current_month INTEGER NOT NULL DEFAULT 3;

UPDATE game_state
SET current_month = CASE current_season
  WHEN 'SPRING' THEN 3
  WHEN 'SUMMER' THEN 6
  WHEN 'AUTUMN' THEN 9
  WHEN 'WINTER' THEN 12
  ELSE 3
END;
