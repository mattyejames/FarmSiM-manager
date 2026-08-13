use tauri_plugin_sql::{Migration, MigrationKind};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let migrations = vec![
        Migration {
            version: 1,
            description: "create_field_and_rotation_entry_tables",
            sql: include_str!("../migrations/001_init.sql"),
            kind: MigrationKind::Up,
        },
        Migration {
            version: 2,
            description: "create_game_state_table",
            sql: include_str!("../migrations/002_game_state.sql"),
            kind: MigrationKind::Up,
        },
        Migration {
            version: 3,
            description: "add_game_state_month",
            sql: include_str!("../migrations/003_game_state_month.sql"),
            kind: MigrationKind::Up,
        },
        Migration {
            version: 4,
            description: "create_vehicle_table",
            sql: include_str!("../migrations/004_vehicle.sql"),
            kind: MigrationKind::Up,
        },
        Migration {
            version: 5,
            description: "add_field_number",
            sql: include_str!("../migrations/005_field_number.sql"),
            kind: MigrationKind::Up,
        },
        Migration {
            version: 6,
            description: "add_map_selection_and_field_pins",
            sql: include_str!("../migrations/006_map.sql"),
            kind: MigrationKind::Up,
        },
        Migration {
            version: 7,
            description: "create_save_table",
            sql: include_str!("../migrations/007_save.sql"),
            kind: MigrationKind::Up,
        },
        Migration {
            version: 8,
            description: "drop_map_selection",
            sql: include_str!("../migrations/008_drop_map_selection.sql"),
            kind: MigrationKind::Up,
        },
    ];

    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:farmsim.db", migrations)
                .build(),
        )
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
