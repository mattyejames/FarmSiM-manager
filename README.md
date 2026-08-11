# FarmSiM Manager

A desktop companion app for planning your farm in **Farming Simulator 25**. Define your fields and plan your crop rotation season by season — no save-game parsing, no live game integration, just a fast local planning tool.

## Features (v1)

- **Fields** — track each field's name, size, soil type, and notes.
- **Rotation planner** — a grid of every field across years and seasons; click a cell to assign a crop.
- **Dashboard** — a quick overview of your fields and what's planned.

Data is stored locally in a SQLite database on your machine — no account, no login, no internet connection required.

## Install

1. Go to the [**Releases page**](../../releases) and open the latest release at the top.
2. Under **Assets**, download the file for your operating system:

   | Your OS | File to download |
   |---|---|
   | Windows | `*.msi` |
   | macOS | `*.dmg` |
   | Linux | `*.deb` (Debian/Ubuntu), `*.rpm` (Fedora/RHEL), or `*.AppImage` (any distro) |

3. Open the downloaded file and follow the installer prompts.

The app isn't code-signed yet, so your OS will likely show a security warning the first time — this is expected for a small independent app, not a sign anything is wrong:

- **Windows**: SmartScreen may say *"Windows protected your PC"*. Click **More info**, then **Run anyway**.
- **macOS**: Gatekeeper may say the app is *"from an unidentified developer"*. Right-click (or Control-click) the app and choose **Open**, then confirm **Open** in the dialog.

Once installed, no further setup is needed — the app runs fully offline and stores your data locally.

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
