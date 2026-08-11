import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Dashboard from "./routes/Dashboard";
import FieldsList from "./routes/FieldsList";
import FieldForm from "./routes/FieldForm";
import FieldDetail from "./routes/FieldDetail";
import RotationGrid from "./routes/RotationGrid";
import Vehicles from "./routes/Vehicles";
import MapScreen from "./routes/Map";
import { GameStateProvider } from "./lib/gameStateContext";

export default function App() {
  return (
    <GameStateProvider>
      <div className="flex h-screen bg-surface-1 text-text">
        <NavBar />
        <main className="min-w-0 flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/fields" element={<FieldsList />} />
            <Route path="/fields/new" element={<FieldForm />} />
            <Route path="/fields/:fieldId" element={<FieldDetail />} />
            <Route path="/fields/:fieldId/edit" element={<FieldForm />} />
            <Route path="/rotation" element={<RotationGrid />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/map" element={<MapScreen />} />
          </Routes>
        </main>
      </div>
    </GameStateProvider>
  );
}
