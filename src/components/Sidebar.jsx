import { Heart, Home } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
};

export default Sidebar;

const DesktopSidebar = () => {
  return (
    // Sidebar för dator med olika "responsivitet tailwind keywords och 2st olika logotyper som jag byggt för att hantera olika skärm storlekar."
    <div className="p-3 md:p-10 border-r min-h-screen w-24 md:w-64 hidden sm:block">
      <div className="flex flex-col gap-20 sticky top-10 left-0">
        <div className="w-full">
          <img src="/logo.jpg" alt="logo" className="hidden md:block" />
          <img src="/mobile-logo.jpg" alt="logo" className="block md:hidden" />
        </div>
        <ul className="flex flex-col items-center md:items-start gap-8">
          <li>
            <Link to="/" className="flex gap-1 hover:underline">
              <Home size={24} />
              <span className="font-bold hidden md:block">Hem</span>
            </Link>
            {/* Lucide links för olika ikoner i applikationen  */}
          </li>
          <li>
            <Link to="/favorites" className="flex gap-1 hover:underline">
              <Heart size={24} />
              <span className="font-bold hidden md:block ">Favoriter</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
// En mobil sidebar för att placera om vart home och favoriter knappen sitter beroende på mobilskärms storlek.
const MobileSidebar = () => {
  return (
    <div
      className="flex justify-center gap-10 border-t fixed w-full
    bottom-0 left-0 bg-white z-10 p-2 sm:hidden"
    >
      <Link to={"/"}>
        <Home size={"24"} className="cursor-pointer" />
      </Link>
      <Link to={"/favorites"}>
        <Heart size={"24"} className="cursor-pointer" />
      </Link>
    </div>
  );
};
