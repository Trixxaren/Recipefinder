import { Search } from "lucide-react";
import RecipeCard from "../components/RecipeCard";
import { useEffect, useState, useRef } from "react";

const useDebounce = (value, delay = 1000) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return debouncedValue;
};

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noResults, setNoResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedQuery = useDebounce(searchQuery, 1000);

  const isFetchingRef = useRef(false); // Ref för att hålla koll på om vi är i en fetch-process

  const fetchRecipes = async (searchQuery) => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    setLoading(true);
    setNoResults(false);

    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`
      );
      const data = await res.json();

      if (data.meals && data.meals.length > 0) {
        setRecipes(data.meals);
        setNoResults(false);
      } else {
        setRecipes([]);
        setNoResults(true);
      }
    } catch (error) {
      console.log(error.message);
      setRecipes([]);
      setNoResults(true);
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  };

  useEffect(() => {
    fetchRecipes("chicken");
  }, []);

  useEffect(() => {
    if (debouncedQuery) {
      fetchRecipes(debouncedQuery);
    }
  }, [debouncedQuery]);

  return (
    <div className="bg-[#faf9fb] p-10 flex-10">
      <div className="max-w-screen-lg mx-auto">
        <form>
          <label className="input shadow-md flex items-center gap-2 w-full">
            <Search size={24} />
            <input
              type="text"
              className="text-sm md:text-md flex-1"
              placeholder="Vad vill du laga idag?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </label>
        </form>

        <h1 className="font-bold text-3xl md:text-5xl mt-4">
          Rekommenderade recept
        </h1>
        <p className="text-slate-500 font-semibold ml-1 my-2 text-sm tracking-tight">
          Populära val
        </p>

        {noResults && !loading && (
          <p className="text-center text-red-500">Inga resultat hittades!</p>
        )}

        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {loading &&
            [...Array(9)].map((_, index) => (
              <div key={index} className="flex flex-col gap-4 w-full">
                <div className="skeleton h-48 w-full"></div>
                <div className="flex justify-between">
                  <div className="skeleton h-4 w-28"></div>
                  <div className="skeleton h-4 w-24"></div>
                </div>
                <div className="skeleton h-4 w-1/2"></div>
              </div>
            ))}

          {!loading &&
            recipes.length > 0 &&
            recipes.map((meal, index) => (
              <RecipeCard key={meal.idMeal || index} meals={meal} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
