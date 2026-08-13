# Changelog

All notable changes to FarmSiM Manager are documented here. Format loosely follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- **Multiple saves** — FarmSiM Manager now supports more than one farm/savegame at once,
  each locked to exactly one map for its lifetime. The app opens to a new home screen listing
  every save (map thumbnail, field/vehicle counts); "+ New save" walks through a 3-step wizard
  (name & DLC, map, review) before creating one. Every existing screen — Dashboard, Fields,
  Rotation, Timeline, Vehicles, Map — is now scoped to whichever save you're in
  (`/s/:saveId/...`), with a "‹ All saves" link back to the picker.
- **Settings tab** — per-save name, map, and DLC list, editable after creation via the same
  map picker the wizard uses. Changing a save's map clears its fields, rotation entries,
  vehicles, and pins (none of that data is meaningful against a different map's real field
  geography) behind an itemized warning dialog; deleting a save requires typing its name to
  confirm.

### Changed

- `map_selection` (the old single global map setting) is retired — map choice is now a
  property of each save (`save.map_key`/`custom_image`/`custom_map_name`).

## [1.1.0] - 2026-08-12

### Added

- **Field operations reference in-app** — Field Detail now has a collapsible "Field operations
  reference" panel showing the general yield-factor, weed-stage-tool, and fertilizing/liming/
  plowing rules from `fieldOperations.ts`. The Rotation Cell editor now also lists a selected
  crop's full field-operation sequence (from `crops.ts`), so the reference data collected for
  both files is now surfaced in the UI instead of only being loaded.

## [1.0.0] - 2026-08-12

The first tagged release. Earlier iterative work (fields, the original rotation planner,
dashboard, and initial task tracking) predates this changelog and is folded into this entry
rather than split into pre-1.0 versions.

### Added

- **Dark "sim-companion" redesign** across every screen (Barlow + IBM Plex Mono, Tailwind v4
  theme tokens) — replaces the previous light/dark toggle as the app's one and only look.
- **Field number** — an optional in-game field number, shown as the primary identifier
  throughout the app.
- **Yield index** — a rough per-field 0–100 estimate, factoring in repeat-crop runs and
  off-season sowing. Always labelled as an estimate, never a real prediction.
- **Vehicles** — track the equipment you own and see coverage against what your current
  rotation actually needs, driven by each crop's real field-operation requirements.
- **Map** — pin your fields on a farm map image; pick from four bundled FS25 maps or drop in
  your own screenshot.
- **Timeline** — a year's rotation laid out against each crop's real FS25 sow/harvest months,
  so a crop planned for the wrong season stands out.
- **Crop reference data rebuilt** from the official Farming Simulator Academy tutorial series —
  full field-operation sequences with the equipment each step needs, and month-level (not just
  season-level) sow/harvest windows.
- **Month-level game-state tracking**, replacing season-level tracking, to match the new crop
  data's precision.

### Changed

- Persistent sidebar navigation replaces the top bar; the year/month stepper is now shared
  across every screen instead of living only on the Dashboard.
- Equipment-category matching now derives its vocabulary from real crop operations instead of a
  hand-maintained guess.
- The rotation-cell editor now switches between a whole year's four seasons via tabs, instead of
  opening once per season.
