-- The in-game field number (as shown on the player's own map), entered manually.
-- Optional and unvalidated: there's no save-game data to check it against, and two
-- fields could legitimately share a number across different maps/saves.
ALTER TABLE field ADD COLUMN number INTEGER;
