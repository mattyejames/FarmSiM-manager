import { useEffect, useState } from "react";
import { listVehicles, createVehicle, updateVehicle, deleteVehicle } from "../lib/queries/vehicles";
import { EQUIPMENT_CATEGORIES } from "../lib/crops";
import type { Vehicle } from "../lib/types";

const emptyForm = { name: "", category: EQUIPMENT_CATEGORIES[0] ?? "", notes: "" };

export default function Vehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  function refresh() {
    return listVehicles().then((v) => {
      setVehicles(v);
      setLoading(false);
    });
  }

  useEffect(() => {
    refresh();
  }, []);

  function startEdit(vehicle: Vehicle) {
    setEditingId(vehicle.id);
    setForm({ name: vehicle.name, category: vehicle.category, notes: vehicle.notes ?? "" });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.category) return;

    setSaving(true);
    const input = { name: form.name.trim(), category: form.category, notes: form.notes.trim() || null };
    if (editingId) {
      await updateVehicle(editingId, input);
    } else {
      await createVehicle(input);
    }
    setSaving(false);
    cancelEdit();
    await refresh();
  }

  async function handleDelete(id: string) {
    await deleteVehicle(id);
    if (editingId === id) cancelEdit();
    await refresh();
  }

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">Vehicles</h1>
      <p className="mb-6 max-w-2xl text-sm text-stone-500">
        List the equipment you actually own in-game. The Dashboard's task list checks each
        crop's required equipment against this inventory, so you can see what you're missing
        before a task comes due.
      </p>

      <form onSubmit={handleSubmit} className="mb-6 max-w-lg space-y-4 rounded-lg border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-950">
        <h2 className="font-medium">{editingId ? "Edit vehicle" : "Add a vehicle"}</h2>
        <div>
          <label htmlFor="vname" className="mb-1 block text-sm font-medium">
            Name
          </label>
          <input
            id="vname"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="e.g. John Deere 8R 410"
            className="w-full rounded-md border border-stone-300 px-3 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-500 dark:border-stone-700 dark:bg-stone-800"
          />
        </div>
        <div>
          <label htmlFor="vcategory" className="mb-1 block text-sm font-medium">
            Equipment category
          </label>
          <select
            id="vcategory"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full rounded-md border border-stone-300 px-3 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-500 dark:border-stone-700 dark:bg-stone-800"
          >
            {EQUIPMENT_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-stone-500">
            Matches the "Needs:" list shown on Dashboard tasks — pick whichever category covers
            what this vehicle/implement does.
          </p>
        </div>
        <div>
          <label htmlFor="vnotes" className="mb-1 block text-sm font-medium">
            Notes
          </label>
          <input
            id="vnotes"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            placeholder="optional"
            className="w-full rounded-md border border-stone-300 px-3 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-500 dark:border-stone-700 dark:bg-stone-800"
          />
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 disabled:opacity-50"
          >
            {saving ? "Saving…" : editingId ? "Save changes" : "Add vehicle"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="rounded-md border border-stone-300 px-4 py-2 font-medium hover:bg-stone-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 dark:border-stone-700 dark:hover:bg-stone-800"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <p className="text-stone-500">Loading…</p>
      ) : vehicles.length === 0 ? (
        <p className="text-stone-500">No vehicles added yet.</p>
      ) : (
        <ul className="max-w-lg space-y-2">
          {vehicles.map((vehicle) => (
            <li
              key={vehicle.id}
              className="flex items-center justify-between rounded-md border border-stone-200 bg-white px-4 py-2 dark:border-stone-800 dark:bg-stone-950"
            >
              <div>
                <p className="font-medium">{vehicle.name}</p>
                <p className="text-sm text-stone-500">
                  {vehicle.category}
                  {vehicle.notes ? ` · ${vehicle.notes}` : ""}
                </p>
              </div>
              <div className="flex gap-2 text-sm">
                <button
                  onClick={() => startEdit(vehicle)}
                  className="rounded-md px-2 py-1 text-emerald-600 hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-500 dark:hover:bg-emerald-950"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(vehicle.id)}
                  className="rounded-md px-2 py-1 text-red-600 hover:bg-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-500 dark:hover:bg-red-950"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
