-- Per-field pin position on the farm's map image, as a percentage of the image's
-- width/height (0-100). Null until the user places a pin for that field.
ALTER TABLE field ADD COLUMN map_x REAL;
ALTER TABLE field ADD COLUMN map_y REAL;

-- Single-row table tracking which map image is currently active. map_key is one of
-- the bundled default maps, or 'custom' when custom_image (a data: URL the user
-- dropped in) should be used instead. Single-farm scope, so one active map is enough.
CREATE TABLE map_selection (
  id            INTEGER PRIMARY KEY CHECK (id = 1),
  map_key       TEXT NOT NULL DEFAULT 'riverbend-springs',
  custom_image  TEXT
);

INSERT INTO map_selection (id, map_key, custom_image) VALUES (1, 'riverbend-springs', NULL);
