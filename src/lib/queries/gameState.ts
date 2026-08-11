import { getDb } from "../db";
import { SEASONS } from "../types";
import type { GameState, Season } from "../types";

export async function getGameState(): Promise<GameState> {
  const db = await getDb();
  const rows = await db.select<GameState[]>(
    "SELECT current_year, current_season FROM game_state WHERE id = 1",
  );
  return rows[0] ?? { current_year: 1, current_season: "SPRING" };
}

export async function setGameState(state: GameState): Promise<void> {
  const db = await getDb();
  await db.execute(
    "UPDATE game_state SET current_year = $1, current_season = $2 WHERE id = 1",
    [state.current_year, state.current_season],
  );
}

/** Advances (or rewinds) the current season by one step, rolling the year over at the edges. */
export function shiftSeason(state: GameState, direction: 1 | -1): GameState {
  const index = SEASONS.indexOf(state.current_season);
  const nextIndex = index + direction;

  if (nextIndex < 0) {
    return { current_year: Math.max(1, state.current_year - 1), current_season: SEASONS[SEASONS.length - 1] };
  }
  if (nextIndex >= SEASONS.length) {
    return { current_year: state.current_year + 1, current_season: SEASONS[0] };
  }
  return { current_year: state.current_year, current_season: SEASONS[nextIndex] as Season };
}
