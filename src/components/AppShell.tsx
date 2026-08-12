import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { SaveProvider } from "../lib/saveContext";
import { GameStateProvider } from "../lib/gameStateContext";

/** Layout for every screen inside an active save (routes nested under /s/:saveId). Hoists
 * SaveProvider and GameStateProvider (which itself needs the active save's id) above the
 * routed screens, and renders the persistent sidebar nav alongside them — the same shell
 * App.tsx rendered directly before saves existed. */
export default function AppShell() {
  return (
    <SaveProvider>
      <GameStateProvider>
        <div className="flex h-screen bg-surface-1 text-text">
          <NavBar />
          <main className="min-w-0 flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </GameStateProvider>
    </SaveProvider>
  );
}
