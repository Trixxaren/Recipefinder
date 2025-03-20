import { Search, Soup } from "lucide-react";

const HomePage = () => {
  return (
    <div className="bg-[#faf9fb] p-10 flex-1">
      <div className="max-w-screen-lg mx-auto">
        <form>
          <label className="input shadow-md flex items-center gap-2 w-full">
            <Search size={24} />
            <input
              type="text"
              className="text-sm md:text-md flex-1"
              placeholder="Vad vill du laga idag?"
            />
          </label>
        </form>
        <h1 className="font-bold text-3cl md:text-5xl mt-4">
          Rekommenderade recept
        </h1>
        <p className="text-slate-500 font-semibold ml-1 my-2 text-sm tracking-tight">
          Populära val
        </p>

        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* 1st recipe */}
          <div className="flex flex-col rounded-md bg-[#ecf7d4] overflow-hidden p-3 relative">
            <a href="#" className="relative h-32">
              <img
                src="/1.jpg"
                alt="recipe img"
                className="rounded-md w-full h-full object-cover cursor-pointer"
              />
              <div className="absolute bottom-2 left-2 bg-white rounded-full p-1 cursor-pointer flex items-center gap-1 text-sm">
                <Soup size={16} /> 4 servings
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
