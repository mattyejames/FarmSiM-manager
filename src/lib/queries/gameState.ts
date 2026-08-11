import { getDb } from "../db";
import type { GameState } from "../types";

export async function getGameState(): Promise<GameState> {
  const db = await getDb();
  const rows = await db.select<GameState[]>(
    "SELECT current_year, current_month FROM game_state WHERE id = 1",
  );
  return rows[0] ?? { current_year: 1, current_month: 3 };
}

export async function setGameState(state: GameState): Promise<void> {
  const db = await getDb();
  await db.execute(
    "UPDATE game_state SET current_year = $1, current_month = $2 WHERE id = 1",
    [state.current_year, state.current_month],
  );
}

export { shiftMonth } from "../calendar";
