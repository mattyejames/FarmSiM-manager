import { Route, Routes } from "react-router-dom";
import AppShell from "./components/AppShell";
import SavesHome from "./routes/SavesHome";
import Dashboard from "./routes/Dashboard";
import FieldsList from "./routes/FieldsList";
import FieldForm from "./routes/FieldForm";
import FieldDetail from "./routes/FieldDetail";
import RotationGrid from "./routes/RotationGrid";
import Timeline from "./routes/Timeline";
import Vehicles from "./routes/Vehicles";
import MapScreen from "./routes/Map";
import SaveSettings from "./routes/SaveSettings";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SavesHome />} />
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
        <Route path="settings" element={<SaveSettings />} />
      </Route>
    </Routes>
  );
}
