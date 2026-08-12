import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { getGameState, setGameState } from "./queries/gameState";
import { shiftMonth } from "./calendar";
import type { GameState } from "./types";

interface GameStateContextValue {
  gameState: GameState | null;
  shift: (direction: 1 | -1) => Promise<void>;
}

const GameStateContext = createContext<GameStateContextValue | null>(null);

/** Hoists the current-year/month stepper (shown persistently in the nav sidebar) above the
 * routed screens, so advancing the month from the sidebar is reflected everywhere without
 * each screen polling independently. */
export function GameStateProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameStateLocal] = useState<GameState | null>(null);

  useEffect(() => {
    getGameState().then(setGameStateLocal);
  }, []);

  const shift = useCallback(
    async (direction: 1 | -1) => {
      if (!gameState) return;
      const next = shiftMonth(gameState, direction);
      setGameStateLocal(next);
      await setGameState(next);
    },
    [gameState],
  );

  return <GameStateContext.Provider value={{ gameState, shift }}>{children}</GameStateContext.Provider>;
}

export function useGameState() {
  const ctx = useContext(GameStateContext);
  if (!ctx) throw new Error("useGameState must be used within a GameStateProvider");
  return ctx;
}
