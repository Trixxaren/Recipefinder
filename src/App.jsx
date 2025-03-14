import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <HomePage />
      </div>
    </>
  );
}

export default App;
