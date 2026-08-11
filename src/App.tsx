import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Dashboard from "./routes/Dashboard";
import FieldsList from "./routes/FieldsList";
import FieldForm from "./routes/FieldForm";
import FieldDetail from "./routes/FieldDetail";
import RotationGrid from "./routes/RotationGrid";
import Timeline from "./routes/Timeline";

export default function App() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 dark:bg-stone-900 dark:text-stone-100">
      <NavBar />
      <main className="mx-auto max-w-5xl px-4 py-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/fields" element={<FieldsList />} />
          <Route path="/fields/new" element={<FieldForm />} />
          <Route path="/fields/:fieldId" element={<FieldDetail />} />
          <Route path="/fields/:fieldId/edit" element={<FieldForm />} />
          <Route path="/rotation" element={<RotationGrid />} />
          <Route path="/timeline" element={<Timeline />} />
        </Routes>
      </main>
    </div>
  );
}
