import { Search } from "lucide-react";

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
      </div>
    </div>
  );
};

export default HomePage;
