import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { listFields } from "../lib/queries/fields";
import { useSave } from "../lib/saveContext";
import { useGameState } from "../lib/gameStateContext";
import { monthLabel } from "../lib/calendar";

const LINKS = [
  { to: "", label: "Dashboard", end: true, countKey: null },
  { to: "/fields", label: "Fields", end: false, countKey: "fields" as const },
  { to: "/rotation", label: "Rotation", end: false, countKey: null },
  { to: "/timeline", label: "Timeline", end: false, countKey: null },
  { to: "/vehicles", label: "Vehicles", end: false, countKey: null },
  { to: "/map", label: "Map", end: false, countKey: null },
  { to: "/settings", label: "Settings", end: false, countKey: null },
];

export default function NavBar() {
  const location = useLocation();
  const { saveId, save, basePath } = useSave();
  const { gameState, shift } = useGameState();
  const [fieldCount, setFieldCount] = useState<number | null>(null);

  useEffect(() => {
    listFields(saveId).then((f) => setFieldCount(f.length));
  }, [saveId, location.pathname]);

  return (
    <div className="flex h-full w-[212px] flex-none flex-col border-r border-border-faint bg-surface-0 font-sans text-text">
      <div className="flex flex-col gap-2.5 border-b border-border-faint px-4 pb-4 pt-[18px]">
        <div className="flex items-center gap-2.5">
          <div className="flex h-[22px] w-[22px] flex-none items-center justify-center rounded bg-accent">
            <div className="h-2 w-2 rotate-45 rounded-[1px] bg-surface-0" />
          </div>
          <div className="min-w-0 truncate text-[14.5px] font-semibold tracking-tight text-text">
            {save?.name ?? "…"}
          </div>
        </div>
        <Link
          to="/"
          className="font-mono text-[9.5px] tracking-wide text-text-faint hover:text-text-dim"
        >
          ‹ ALL SAVES
        </Link>
        <div className="flex items-center justify-between rounded-[5px] border border-border bg-surface-4 px-2.5 py-1.5">
          <span className="font-mono text-[10.5px] tracking-wide text-text-faint">
            {gameState ? `YEAR ${gameState.current_year} · ${monthLabel(gameState.current_month).toUpperCase()}` : "…"}
          </span>
          <div className="flex gap-0.5">
            <button
              type="button"
              onClick={() => shift(-1)}
              aria-label="Previous month"
              className="flex h-4 w-4 items-center justify-center rounded-[3px] bg-surface-hover text-[10px] text-text-dimmer hover:text-text"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => shift(1)}
              aria-label="Next month"
              className="flex h-4 w-4 items-center justify-center rounded-[3px] bg-surface-hover text-[10px] text-text-dimmer hover:text-text"
            >
              ›
            </button>
          </div>
        </div>
      </div>

      <nav className="flex flex-col gap-0.5 px-2.5 py-3">
        {LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={`${basePath}${link.to}`}
            end={link.end}
            className={({ isActive }) =>
              `flex items-center gap-2.5 rounded-[5px] border-l-2 px-2.5 py-2 text-[13px] font-medium transition-colors ${
                isActive
                  ? "border-accent bg-surface-3 text-text"
                  : "border-transparent text-text-dimmer hover:bg-surface-hover hover:text-text-muted"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {link.label}
                {link.countKey === "fields" && fieldCount !== null && (
                  <span
                    className={`ml-auto font-mono text-[10px] ${isActive ? "text-text-faint" : "text-text-ghost"}`}
                  >
                    {fieldCount}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto flex flex-col gap-1.5 border-t border-border-faint px-4 py-3.5">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="text-[11.5px] text-text-dimmer">Saved locally</span>
        </div>
        <div className="font-mono text-[10px] tracking-wide text-text-ghost">farmsim.db</div>
      </div>
    </div>
  );
}
