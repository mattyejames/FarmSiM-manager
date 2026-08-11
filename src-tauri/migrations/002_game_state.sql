-- Single-row table tracking the player's current in-game year/season. The user advances
-- this manually as they progress through the game; it's the reference point automated
-- task tracking compares rotation entries against (there is no live FS25 API to read this from).
CREATE TABLE game_state (
  id             INTEGER PRIMARY KEY CHECK (id = 1),
  current_year   INTEGER NOT NULL DEFAULT 1,
  current_season TEXT NOT NULL DEFAULT 'SPRING'
);

INSERT INTO game_state (id, current_year, current_season) VALUES (1, 1, 'SPRING');
