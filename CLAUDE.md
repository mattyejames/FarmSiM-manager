# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

FarmSiM Manager is a desktop companion app for planning fields and crop rotations in Farming Simulator 25. It is a **manual planning tool**, not a live game integration — there is no FS25 API and it does not read save files. All data (fields, rotation plans) is entered by the user and stored locally.

Built with Tauri (Rust shell) + React + TypeScript + Vite + Tailwind CSS, using `@tauri-apps/plugin-sql` for local SQLite storage. There is no backend server, no accounts/login — everything is offline and single-user by design.

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

### Linux build prerequisites

Building/running on Linux requires `libwebkit2gtk-4.1-dev`, `libgtk-3-dev`, `librsvg2-dev`, `libayatana-appindicator3-dev`, and `libsoup-3.0-dev` (see `.github/workflows/release.yml` for the exact `apt-get install` list). Windows/macOS builds need only the standard Tauri prerequisites.

## Architecture

**All application logic lives in the React/TypeScript frontend (`src/`).** The Rust side (`src-tauri/`) is close to Tauri's default scaffold — it registers `tauri-plugin-sql` with a startup migration and has no custom commands. There is no REST API layer; the frontend talks to SQLite directly through the plugin's JS bindings (`db.execute(...)`, `db.select(...)`).

- `src-tauri/migrations/001_init.sql` — the single source of truth for the schema (`field`, `rotation_entry` tables). Applied automatically on app startup via `Migration`/`MigrationKind` registered in `src-tauri/src/lib.rs`. To change the schema, add a new numbered migration file and register it in `lib.rs` — don't edit `001_init.sql` in place once released.
- `src/lib/db.ts` — lazily opens the single SQLite connection (`sqlite:farmsim.db`, stored in the OS app-data dir); `getDb()` is the only entry point other modules should use.
- `src/lib/types.ts` — TypeScript types mirroring the SQL schema exactly (`Field`, `RotationEntry`, `Season`, `SizeUnit`). Keep these in sync with the migration SQL by hand — there is no codegen.
- `src/lib/queries/fields.ts` and `src/lib/queries/rotation.ts` — the only modules that issue SQL. All CRUD from UI components goes through these functions rather than querying the db directly from components.
  - `upsertRotationEntry` implements insert-or-update semantics keyed on the `(field_id, year, season)` unique constraint — it does a `SELECT` first to decide whether to `INSERT` or `UPDATE`, since SQLite upsert-on-conflict isn't used here.
- `src/lib/crops.ts` / `src/lib/soilSuggestions.ts` — static reference data (crop list, soil type suggestions). Not database-backed by design; hand-edit these arrays to add options.
- `src/routes/` — one component per page, wired up in `src/App.tsx` via `react-router-dom`'s `HashRouter` (hash routing is required because the app is loaded from a local file, not a server, in the built app).
- `src/routes/RotationGrid.tsx` is the core screen: a table with fields as rows and Year × Season as columns, sourced by joining `listFields()` and `listRotationEntries()` client-side into a `Map` keyed by `` `${field_id}_${year}_${season}` ``. Clicking a cell opens `src/components/RotationCell.tsx` as a modal to edit that single field/year/season slot.
- `id` values (fields, rotation entries) are client-generated UUIDs (`uuid` package), not database autoincrement.

### Data model notes

- `season` is a 4-value simplification (`SPRING`/`SUMMER`/`AUTUMN`/`WINTER`) of FS25's finer in-game calendar, deliberately.
- `year` is an arbitrary in-game counter (Year 1, Year 2, ...), not a real calendar date.
- `soil_type` and `crop` are free-text columns with UI-level suggestion lists (`soilSuggestions.ts`, `crops.ts`), not foreign keys/enums — FS25's soil terminology varies by map/DLC.
- Deleting a `field` cascades to delete its `rotation_entry` rows (`ON DELETE CASCADE` in the migration).

## Distribution

`.github/workflows/release.yml` builds installers for Windows, macOS (aarch64 + x86_64), and Linux via `tauri-apps/tauri-action`, triggered on pushing a tag matching `v*`. It creates a **draft** GitHub Release with the installers attached — publishing is a manual step after the workflow runs.

## Explicit non-goals (v1)

Deferred intentionally — don't add these without checking with the user first: finance/economy tracking, equipment/vehicle tracking, multi-farm or multi-savegame support, real FS25 map layouts/field geometry, savegame file parsing, any live FS25 API integration (none exists), user accounts/auth, console support (PS5/Xbox — dropped in favor of a GitHub-downloadable desktop app).
