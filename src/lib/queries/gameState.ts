import { getDb } from "../db";
import type { GameState } from "../types";

export async function getGameState(saveId: string): Promise<GameState> {
  const db = await getDb();
  const rows = await db.select<GameState[]>(
    "SELECT save_id, current_year, current_month FROM game_state WHERE save_id = $1",
    [saveId],
  );
  return rows[0] ?? { save_id: saveId, current_year: 1, current_month: 3 };
}

export async function setGameState(state: GameState): Promise<void> {
  const db = await getDb();
  await db.execute(
    "UPDATE game_state SET current_year = $1, current_month = $2 WHERE save_id = $3",
    [state.current_year, state.current_month, state.save_id],
  );
}

/** Inserts the starting game_state row (Year 1, January) for a newly created save. */
export async function createGameState(saveId: string): Promise<void> {
  const db = await getDb();
  await db.execute(
    "INSERT INTO game_state (save_id, current_year, current_season, current_month) VALUES ($1, 1, 'WINTER', 1)",
    [saveId],
  );
}

export { shiftMonth } from "../calendar";
