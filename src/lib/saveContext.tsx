import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useParams } from "react-router-dom";
import { getSave } from "./queries/saves";
import type { Save } from "./types";

interface SaveContextValue {
  /** The active save's id, straight from the :saveId route param — available immediately,
   * before the full Save row (below) has loaded. Every screen's queries are scoped to this. */
  saveId: string;
  /** The full Save row, once loaded; null on first render and while switching saves. */
  save: Save | null;
  /** `/s/${saveId}` — prefix every in-app Link/navigate path with this so navigation stays
   * inside the active save instead of jumping to an unscoped (and non-existent) route. */
  basePath: string;
  /** Re-fetches the Save row in place (name/map/DLC changed) without a route change, so
   * Settings and anything reading `save` — the NavBar header included — pick up an edit
   * immediately instead of waiting for the next navigation to remount SaveProvider. */
  refreshSave: () => Promise<void>;
}

const SaveContext = createContext<SaveContextValue | null>(null);

/** Reads the active save's id from the URL (every screen is nested under /s/:saveId) and
 * loads the full Save row once, making both available below without prop drilling or each
 * screen re-fetching it independently. Mirrors gameStateContext.tsx's hoisting approach. */
export function SaveProvider({ children }: { children: ReactNode }) {
  const { saveId } = useParams<{ saveId: string }>();
  const [save, setSave] = useState<Save | null>(null);

  const refreshSave = useCallback(async () => {
    if (!saveId) return;
    setSave(await getSave(saveId));
  }, [saveId]);

  useEffect(() => {
    setSave(null);
    refreshSave();
  }, [saveId, refreshSave]);

  if (!saveId) throw new Error("SaveProvider must be rendered under a route with a :saveId param");

  return (
    <SaveContext.Provider value={{ saveId, save, basePath: `/s/${saveId}`, refreshSave }}>
      {children}
    </SaveContext.Provider>
  );
}

export function useSave() {
  const ctx = useContext(SaveContext);
  if (!ctx) throw new Error("useSave must be used within a SaveProvider");
  return ctx;
}
