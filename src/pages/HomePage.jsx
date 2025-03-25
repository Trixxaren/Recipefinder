import { Search } from "lucide-react";
import RecipeCard from "../components/RecipeCard";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noResults, setNoResults] = useState(false); // För att hålla koll på om inga resultat hittades

  // Hämtar recepten baserat på sökfrågan
  const fetchRecipes = async (searchQuery) => {
    setLoading(true);
    setNoResults(false); // Sätt till false när vi börjar söka

    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`
      );
      const data = await res.json();

      // Kollar om vi får några resultat
      if (data.meals && data.meals.length > 0) {
        setRecipes(data.meals);
        setNoResults(false); // Vi har resultat
      } else {
        setRecipes([]); // Om inga resultat hittas, töm recepten
        setNoResults(true); // Sätt noResults till true
      }
    } catch (error) {
      console.log(error.message);
      setRecipes([]); // Om något går fel, töm recepten
      setNoResults(true); // Vi har ett fel, visa att inga resultat hittades
    } finally {
      setLoading(false);
    }
  };

  // Hämta standarddata när komponenten laddas
  useEffect(() => {
    const fetchData = async () => {
      await fetchRecipes("a"); // Initial sökning
    };
    fetchData();
  }, []);

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
              onChange={(e) => fetchRecipes(e.target.value)} // Söker varje gång användaren skriver
            />
          </label>
        </form>

        <h1 className="font-bold text-3xl md:text-5xl mt-4">
          Rekommenderade recept
        </h1>
        <p className="text-slate-500 font-semibold ml-1 my-2 text-sm tracking-tight">
          Populära val
        </p>

        {/* Meddelande om inga resultat hittas */}
        {noResults && !loading && (
          <p className="text-center text-red-500">Inga resultat hittades!</p>
        )}

        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* Om det är pågående laddning, visa skeleton loader */}
          {loading &&
            [...Array(9)].map((_, index) => (
              <div key={index} className="flex flex-col gap-4 w-full">
                <div className="skeleton h-32 w-full"></div>
                <div className="flex justify-between">
                  <div className="skeleton h-4 w-28"></div>
                  <div className="skeleton h-4 w-24"></div>
                </div>
                <div className="skeleton h-4 w-1/2"></div>
              </div>
            ))}

          {/* Om recepten finns, rendera dem */}
          {!loading &&
            recipes.length > 0 &&
            recipes.map((meal, index) => (
              <RecipeCard key={index} meals={meal} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
