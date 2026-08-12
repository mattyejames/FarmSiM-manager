# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

FarmSiM Manager is a desktop companion app for planning fields, crop rotations, vehicles, and a farm map in Farming Simulator 25. It is a **manual planning tool**, not a live game integration — there is no FS25 API and it does not read save files. All data (fields, rotation plans, vehicles, map pins) is entered by the user and stored locally.

Built with Tauri (Rust shell) + React + TypeScript + Vite + Tailwind CSS v4, using `@tauri-apps/plugin-sql` for local SQLite storage. There is no backend server, no accounts/login — everything is offline and single-user by design. The UI is a dark "sim-companion" chrome (Barlow + IBM Plex Mono) — it's the app's one and only theme, there is no light mode.

## Commands

```bash
npm install            # install JS dependencies
npm run dev             # Vite dev server only (frontend, no native window)
npm run tauri dev       # full app in a native window, with hot reload (primary way to run it)
npm run build            # tsc typecheck + vite build (frontend only)
npm run tauri build      # full release build producing an installer for the current OS
npx tsc --noEmit         # typecheck without emitting/building
cargo check --manifest-path src-tauri/Cargo.toml   # typecheck the Rust backend only
```

There is currently no test suite and no linter configured — `npx tsc --noEmit` and `cargo check` are the available correctness checks.

## Architecture

**All application logic lives in the React/TypeScript frontend (`src/`).** The Rust side (`src-tauri/`) is close to Tauri's default scaffold — it registers `tauri-plugin-sql` with startup migrations and has no custom commands. There is no REST API layer; the frontend talks to SQLite directly through the plugin's JS bindings (`db.execute(...)`, `db.select(...)`).

- `src-tauri/migrations/*.sql` — the schema, one numbered file per change (`001_init.sql`: `field`/`rotation_entry`; `002_game_state.sql`: singleton `game_state`; `003_game_state_month.sql`: adds `game_state.current_month`; `004_vehicle.sql`: `vehicle`; `005_field_number.sql`: `field.number`; `006_map.sql`: `field.map_x`/`map_y` + singleton `map_selection`). Applied automatically on app startup via `Migration`/`MigrationKind` registered in `src-tauri/src/lib.rs`. To change the schema, add a new numbered migration file and register it in `lib.rs` — don't edit a released migration file in place.
- `src/lib/db.ts` — lazily opens the single SQLite connection (`sqlite:farmsim.db`, stored in the OS app-data dir); `getDb()` is the only entry point other modules should use.
- `src/lib/types.ts` — TypeScript types mirroring the SQL schema exactly (`Field`, `RotationEntry`, `GameState`, `Vehicle`, `MapSelection`, `Season`, `SizeUnit`, `MapKey`). Keep these in sync with the migration SQL by hand — there is no codegen.
- `src/lib/queries/*.ts` — the only modules that issue SQL (`fields.ts`, `rotation.ts`, `gameState.ts`, `vehicles.ts`, `map.ts`). All CRUD from UI components goes through these functions rather than querying the db directly from components.
  - `upsertRotationEntry` implements insert-or-update semantics keyed on the `(field_id, year, season)` unique constraint — it does a `SELECT` first to decide whether to `INSERT` or `UPDATE`, since SQLite upsert-on-conflict isn't used here.
- `src/lib/crops.ts` — the crop reference table: full field-operation sequence (with the generic machine category each step needs), month-level sow/harvest windows, and season-level sow/harvest windows derived from those months. Sourced from the official Farming Simulator Academy tutorial series, not hand-guessed. Not database-backed by design; hand-edit this array to add/correct crops. `EQUIPMENT_CATEGORIES` is derived from every distinct `machine` string across all crops' operations, so it can't drift out of sync as `crops.ts` changes.
- `src/lib/fieldOperations.ts` — general field-operation rules that apply across most crops (yield factors, weed-stage tools, liming/plowing cadence), also sourced from the FS Academy material. Reference data only — not yet wired into a specific screen.
- `src/lib/animals.ts`, `src/lib/forestry.ts`, `src/lib/fishing.ts`, `src/lib/loaders.ts` — reference data for domains the app doesn't implement yet (animal husbandry, forestry, fishing/aquaculture, and the loader/attachment equipment they depend on), sourced from the same FS Academy material. Same "hand-edit, not database-backed" approach as `crops.ts`. Kept ready for when one of these becomes an actual feature — see "Future domains" below.
- `src/lib/calendar.ts` — the month↔season mapping (`seasonForMonth`, `seasonsFromMonths`), month labels/formatting (`monthLabel`, `formatMonthRange`), and `shiftMonth` for advancing/rewinding `game_state`.
- `src/lib/soilSuggestions.ts` — static soil-type suggestions, same "not database-backed, hand-edit to add options" approach as `crops.ts`.
- `src/lib/tasks.ts` — `tasksForMonth()` derives a month's sow/harvest task list purely from `field` + `rotation_entry` + `crops.ts`'s month data, no persistence of its own; each task also carries the crop's deduped `machines` list for the equipment checklist shown against it.
- `src/lib/equipment.ts` — `ownedCategorySet()`/`checkEquipment()` check a crop's real required machine categories (from `crops.ts` operations) against owned `vehicle` rows. `coverageForRotation()` builds on that for the Vehicles screen's aggregate coverage panel (percent covered, missing categories, which crops need each one), using each field's dominant crop for the year (see `rotationSummary.ts`).
- `src/lib/yieldIndex.ts` — `estimateYieldIndex()`, a rough 0-100 heuristic (never a real prediction) penalizing consecutive same-crop years and off-season sowing (against `crops.ts`'s season-level windows). Always labelled as an estimate in the UI.
- `src/lib/rotationSummary.ts` — `dominantCrop()`, the "one crop per year" simplification the redesigned rotation grid, fields list, dashboard, timeline, and yield estimate all share (the underlying data is still per-season).
- `src/lib/gameStateContext.tsx` — hoists the current-year/month stepper (shown in the nav sidebar) above the routed screens via a small React context, so advancing the month from the sidebar is reflected everywhere without prop drilling. This is the one piece of cross-screen shared state in the app; everything else is per-route local fetches.
- `src/lib/maps.ts` — resolves the active `MapSelection` to an image source: one of the 4 bundled map images (`src/assets/maps/*.jpg`, imported as ES modules — not referenced via raw `public/` paths, since a plain `/` path doesn't reliably resolve under the `file://` origin Tauri loads the packaged app from) or the user's own dropped image (stored as a `data:` URL in `map_selection.custom_image`).
- `src/routes/` — one component per page, wired up in `src/App.tsx` via `react-router-dom`'s `HashRouter` (hash routing is required because the app is loaded from a local file, not a server, in the built app). Routes: Dashboard, Fields (list/detail/form), Rotation, Timeline, Vehicles, Map.
- `src/routes/RotationGrid.tsx` shows years as columns (one dominant crop per year, via `dominantCrop()`) with a 4-dot season strip per cell; clicking a year cell opens `src/components/RotationCell.tsx`, which lets you switch between that year's 4 seasons via tabs and edit each one's crop/notes.
- `src/routes/Timeline.tsx` shows one year as a field×crop-by-month grid, highlighting each planned crop's real sow/harvest months (from `crops.ts`) against the season it was actually assigned — a mismatch between the highlighted months and the assigned-season band means it's planned for the wrong season.
- `src/routes/Map.tsx` lets the user place a numbered pin for each field on the active map image (click "+ Pin {field}" in the sidebar, then click the map) and switch between the bundled maps or a custom-uploaded image. Pins are plain `field.map_x`/`map_y` percentages against whichever image is currently active — switching maps clears all pins (with confirmation) since a position only makes sense against the image it was placed on.
- `id` values (fields, rotation entries, vehicles) are client-generated UUIDs (`uuid` package), not database autoincrement, except the two intentional singleton tables (`game_state`, `map_selection`), which use a `CHECK (id = 1)` row.
- `src/components/ui/` — small shared primitives (`Card`, `Button`, `Badge`, `PageHeader`, `inputStyles.ts`) extracted to avoid re-duplicating the same Tailwind class strings across every screen.
- Theme: `src/index.css` defines the dark palette as Tailwind v4 `@theme` tokens (`--color-surface-*`, `--color-text-*`, `--color-accent`, `--color-warn-*`, `--color-info-*`, `--color-danger-*`, `--font-sans`/`--font-mono`). There is no `dark:`/light-mode variant anywhere — this is the only palette.

### Data model notes

- `game_state.current_month` (1-12) is the real "where is the player right now" pointer — `current_season` still exists on the row (backfilled by migration 003, no longer written to) but is derived from month via `seasonForMonth()` wherever a season label is still wanted (nav stepper, Dashboard, RotationCell tabs).
- `rotation_entry.season` is unchanged: a 4-value simplification (`SPRING`/`SUMMER`/`AUTUMN`/`WINTER`) of FS25's finer in-game calendar — the per-cell rotation data model is still season-grained even though the *current position in time* is month-grained.
- `year` is an arbitrary in-game counter (Year 1, Year 2, ...), not a real calendar date.
- `soil_type` and `crop` are free-text columns with UI-level suggestion lists, not foreign keys/enums — FS25's soil terminology varies by map/DLC. `vehicle.category` is also free text, but matched against a *derived* vocabulary (`EQUIPMENT_CATEGORIES` in `crops.ts`), not hand-guessed — keep category names typed exactly as they appear in a crop's `operations[].machine` for the match to work.
- `field.number` (the in-game field number) is optional and unvalidated — there's no save-game data to check it against.
- `field.map_x`/`map_y` are percentages (0-100) against whichever map image `map_selection` currently points at — not tied to a specific map, since the app is single-farm/single-map scope (see non-goals).
- Deleting a `field` cascades to delete its `rotation_entry` rows (`ON DELETE CASCADE` in the migration).

### Bundled map images

`src/assets/maps/*.jpg` are derived from official FS25 map-guide PDFs the user supplied, shipped as default map options. These are third-party artwork, not originals — if you're forking or redistributing this repo, verify you have the right to bundle them; this was a deliberate, informed call by the app's maintainer, not a cleared license.

### Reference material

`docs/reference/fs25/` is the full raw source bundle the reference-data files above (`crops.ts`, `fieldOperations.ts`, `animals.ts`, `forestry.ts`, `fishing.ts`, `loaders.ts`) were built from — compiled offline notes from the official Farming Simulator Academy tutorials and the FS25 DLC pages, supplied by the user, kept in the repo for provenance and so future sessions don't need it re-uploaded. Two files there (`game-basics.md`, `machinery-101.md` beyond the loader taxonomy already in `loaders.ts`) and the `dlc/` subfolder are *not* yet distilled into any `src/lib/*.ts` module — they're settings/UI/DLC-catalogue material that's more useful as prose than as typed data, but worth reading before building a feature that touches game settings, shop mechanics, or DLC-gated content. Each markdown file documents its own source articles and flags where the Academy's own text is ambiguous, contradictory, or FS22-era rather than confirmed FS25 — treat those flags as real caveats when using the data, not just commentary.

### Future domains (reference data ready, not yet features)

Animal husbandry, forestry, and fishing/aquaculture are not implemented — no screens, routes, or schema — but their reference data is ingested (see `animals.ts`, `forestry.ts`, `fishing.ts`, `loaders.ts` above) so a future feature can start from real FS25 facts instead of re-research. None of this is in the explicit non-goals below; it's simply not built yet. If asked to build one of these out, treat it as a new domain parallel to crops/fields: it will likely want its own migration (barns/pastures, tree stands, or fish lakes as a table alongside `field`), its own `src/lib/queries/*.ts`, and its own route — follow the existing crop-rotation screens as the structural template rather than bolting it onto `field`.

## Distribution

`.github/workflows/release.yml` builds installers for Windows, macOS (aarch64 + x86_64), and Linux via `tauri-apps/tauri-action`, triggered on pushing a tag matching `v*`. It creates a **draft** GitHub Release with the installers attached — publishing is a manual step after the workflow runs.

## Explicit non-goals (v1)

Deferred intentionally — don't add these without checking with the user first: finance/economy tracking, multi-farm or multi-savegame support, savegame file parsing, any live FS25 API integration (none exists), user accounts/auth, console support (PS5/Xbox — dropped in favor of a GitHub-downloadable desktop app).

Equipment/vehicle tracking and a farm map are now implemented (see `src/routes/Vehicles.tsx`, `src/routes/Map.tsx`) — but the map is still just user-placed pins on a flat image, not parsed FS25 field geometry, and single-map/single-farm scope is still assumed throughout (switching the active map clears pins rather than tracking them per-map).
