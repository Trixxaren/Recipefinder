import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import InstructionsPage from "./pages/InstructionsPage";

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/instructions/:id" element={<InstructionsPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
