# FarmSiM Manager

A desktop companion app for planning your farm in **Farming Simulator 25**. Define your fields and plan your crop rotation season by season — no save-game parsing, no live game integration, just a fast local planning tool.

## Features (v1)

- **Fields** — track each field's name, size, soil type, and notes.
- **Rotation planner** — a grid of every field across years and seasons; click a cell to assign a crop.
- **Dashboard** — a quick overview of your fields and what's planned.

Data is stored locally in a SQLite database on your machine — no account, no login, no internet connection required.

## Download

Grab the latest installer for your OS from the [Releases page](../../releases) (Windows, macOS, Linux).

## Development

Built with [Tauri](https://tauri.app/) (Rust) + React + TypeScript + Tailwind CSS, using [`@tauri-apps/plugin-sql`](https://v2.tauri.app/plugin/sql/) for local SQLite storage.

### Prerequisites

- [Node.js](https://nodejs.org/) 20+
- [Rust](https://www.rust-lang.org/tools/install)
- Platform build tools per the [Tauri prerequisites guide](https://tauri.app/start/prerequisites/)

### Run locally

```bash
npm install
npm run tauri dev
```

### Build an installer

```bash
npm run tauri build
```

## Roadmap (not in v1)

- Finance/economy tracking
- Equipment & vehicle tracking
- Multiple farms/save profiles
- Real FS25 map layouts
