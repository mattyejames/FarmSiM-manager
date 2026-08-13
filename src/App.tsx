import { Navigate, Route, Routes } from "react-router-dom";
import AppShell from "./components/AppShell";
import Dashboard from "./routes/Dashboard";
import FieldsList from "./routes/FieldsList";
import FieldForm from "./routes/FieldForm";
import FieldDetail from "./routes/FieldDetail";
import RotationGrid from "./routes/RotationGrid";
import Timeline from "./routes/Timeline";
import Vehicles from "./routes/Vehicles";
import MapScreen from "./routes/Map";
import { DEFAULT_SAVE_ID } from "./lib/queries/saves";

export default function App() {
  return (
    <Routes>
      {/* No save picker yet (Phase 3 of the save-manager redesign, tracks #13) — the app
       * opens straight into the one save that exists today. This redirect is the only
       * remaining use of DEFAULT_SAVE_ID; it goes away once a real home screen lands. */}
      <Route path="/" element={<Navigate to={`/s/${DEFAULT_SAVE_ID}`} replace />} />
      <Route path="/s/:saveId" element={<AppShell />}>
        <Route index element={<Dashboard />} />
        <Route path="fields" element={<FieldsList />} />
        <Route path="fields/new" element={<FieldForm />} />
        <Route path="fields/:fieldId" element={<FieldDetail />} />
        <Route path="fields/:fieldId/edit" element={<FieldForm />} />
        <Route path="rotation" element={<RotationGrid />} />
        <Route path="timeline" element={<Timeline />} />
        <Route path="vehicles" element={<Vehicles />} />
        <Route path="map" element={<MapScreen />} />
      </Route>
    </Routes>
  );
}
