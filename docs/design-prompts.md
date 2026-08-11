# Claude Design Prompts — FarmSiM Manager UI Mock-up

Copy-ready prompts for generating UI mock-ups of FarmSiM Manager with Claude Design.

## Context

**Application description:** FarmSiM Manager is a desktop companion app for planning fields and crop
rotations in Farming Simulator 25. It's a manual planning tool (no live game integration, no save-file
parsing) — the user manually enters fields and rotation plans, which are stored locally. Built with
Tauri + React, it runs as a native desktop window.

**Key screens/flows:** Dashboard (overview), Fields List, Field Form (add/edit a field), Field Detail,
Rotation Grid (fields × year/season table, click a cell to open an edit modal), and a persistent nav bar.

**Branding/visual guidelines:** [FILL: none provided — no specific design style, color palette, or
brand assets exist yet for this project]

## Prompts

- Design a Dashboard screen for a farm-planning desktop app: field count, fields missing a rotation plan, and quick links to Fields and Rotation Grid.
- Design a Fields List screen showing each field's name, size, soil type, and notes in a scannable list or card layout, with an "Add Field" action.
- Design an Add/Edit Field form with inputs for name, size (value + unit), soil type (with suggestions), and a notes field.
- Design a Field Detail screen showing one field's info plus its rotation history across years and seasons.
- Design a Rotation Grid screen: a table with fields as rows and Year × Season as columns, each cell showing an assigned crop or empty state.
- Design a modal dialog for editing a single rotation cell: crop picker, season/year context, and save/cancel actions.
- Design a persistent left-hand or top navigation bar linking Dashboard, Fields, and Rotation Grid for a desktop app.
- Design an empty-state screen for when no fields have been added yet, prompting the user to create their first field.
- Design a crop picker component: a searchable list/dropdown of crop options used when assigning a crop to a rotation cell.
- Design a soil type input with autocomplete suggestions, used on the Add/Edit Field form.

## Execution checklist

- [x] All prompts are under 200 characters.
- [x] Each prompt is a single, self-contained bullet point.
- [x] Placeholders are clearly indicated (`[FILL: ...]`).
- [x] No design style/aesthetic assumptions made beyond the app's described structure and features.
