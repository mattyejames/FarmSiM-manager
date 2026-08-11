import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listFields } from "../lib/queries/fields";
import { listRotationEntries } from "../lib/queries/rotation";
import { getGameState, setGameState, shiftSeason } from "../lib/queries/gameState";
import { tasksForSeason, describeTask } from "../lib/tasks";
import type { Task } from "../lib/tasks";
import { SEASON_LABELS } from "../lib/types";
import type { Field, RotationEntry, GameState } from "../lib/types";

const TASK_KIND_STYLES: Record<Task["kind"], string> = {
  sow: "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200",
  harvest:
    "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200",
  unplanned:
    "border-stone-200 bg-stone-50 text-stone-500 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-400",
};

function TaskList({ tasks, emptyLabel }: { tasks: Task[]; emptyLabel: string }) {
  if (tasks.length === 0) {
    return <p className="text-sm text-stone-500">{emptyLabel}</p>;
  }
  return (
    <ul className="space-y-2">
      {tasks.map((task, i) => (
        <li
          key={i}
          className={`rounded-md border px-3 py-2 text-sm ${TASK_KIND_STYLES[task.kind]}`}
        >
          {describeTask(task)}
        </li>
      ))}
    </ul>
  );
}

export default function Dashboard() {
  const [fields, setFields] = useState<Field[]>([]);
  const [entries, setEntries] = useState<RotationEntry[]>([]);
  const [gameState, setGameStateLocal] = useState<GameState | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([listFields(), listRotationEntries(), getGameState()]).then(
      ([f, e, gs]) => {
        setFields(f);
        setEntries(e);
        setGameStateLocal(gs);
        setLoading(false);
      },
    );
  }, []);

  async function handleShift(direction: 1 | -1) {
    if (!gameState) return;
    const next = shiftSeason(gameState, direction);
    setGameStateLocal(next);
    await setGameState(next);
  }

  if (loading || !gameState) return <p className="text-stone-500">Loading…</p>;

  const plannedYears = new Set(entries.map((e) => e.year)).size;

  const dueNow = tasksForSeason(fields, entries, gameState.current_year, gameState.current_season);
  const upcomingState = shiftSeason(gameState, 1);
  const upcoming = tasksForSeason(fields, entries, upcomingState.current_year, upcomingState.current_season);

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">Dashboard</h1>

      {fields.length === 0 ? (
        <p className="text-stone-500">
          Get started by{" "}
          <Link to="/fields/new" className="text-emerald-600 underline">
            adding your first field
          </Link>
          .
        </p>
      ) : (
        <>
          <div className="mb-6 flex items-center justify-between rounded-lg border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-950">
            <div>
              <p className="text-sm text-stone-500">Current season</p>
              <p className="text-xl font-semibold">
                {SEASON_LABELS[gameState.current_season]} · Year {gameState.current_year}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleShift(-1)}
                className="rounded-md border border-stone-300 px-3 py-2 text-sm font-medium hover:bg-stone-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 dark:border-stone-700 dark:hover:bg-stone-800"
              >
                ← Previous
              </button>
              <button
                onClick={() => handleShift(1)}
                className="rounded-md border border-stone-300 px-3 py-2 text-sm font-medium hover:bg-stone-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 dark:border-stone-700 dark:hover:bg-stone-800"
              >
                Next →
              </button>
            </div>
          </div>

          <div className="mb-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-950">
              <p className="text-sm text-stone-500">Fields</p>
              <p className="text-2xl font-semibold">{fields.length}</p>
            </div>
            <div className="rounded-lg border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-950">
              <p className="text-sm text-stone-500">Rotation entries planned</p>
              <p className="text-2xl font-semibold">{entries.length}</p>
            </div>
            <div className="rounded-lg border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-950">
              <p className="text-sm text-stone-500">Years planned</p>
              <p className="text-2xl font-semibold">{plannedYears}</p>
            </div>
          </div>

          <div className="mb-6 grid gap-6 sm:grid-cols-2">
            <div>
              <h2 className="mb-2 text-lg font-semibold">
                Tasks for {SEASON_LABELS[gameState.current_season]}, Year {gameState.current_year}
              </h2>
              <TaskList tasks={dueNow} emptyLabel="Nothing due this season." />
            </div>
            <div>
              <h2 className="mb-2 text-lg font-semibold">
                Coming up in {SEASON_LABELS[upcomingState.current_season]}, Year{" "}
                {upcomingState.current_year}
              </h2>
              <TaskList tasks={upcoming} emptyLabel="Nothing planned for next season yet." />
            </div>
          </div>

          <p>
            <Link to="/rotation" className="text-emerald-600 underline">
              Open the full rotation planner →
            </Link>
          </p>
        </>
      )}
    </div>
  );
}
