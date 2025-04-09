import { Search } from "lucide-react";
import RecipeCard from "../components/RecipeCard";
import { useEffect, useState, useRef } from "react";

// Debounce hook för att fördröja på ett API anrop så att inte anropet sker varje gång en tanget trycks. två parametrar, ena som är söket och en hur lång fördröjningen är efter trycket.
const useDebounce = (value, delay = 1000) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    // useeffect hooken för att skapa en timeout som uppdaterar debounced värdet
    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]); // Effekt-hooken körs varje gång value eller delay ändras

  return debouncedValue;
};

const HomePage = () => {
  // olika state för att hantera data
  const [recipes, setRecipes] = useState([]);
  // här lagrar vi alla recept som vi hämtar från APIet i en tom array
  const [loading, setLoading] = useState(true);
  // En "flagga" som används för att visa en laddnings symbol medans vi hämtar data
  const [noResults, setNoResults] = useState(false);
  //  en "flagga" om inga recept hittades
  const [searchQuery, setSearchQuery] = useState(""); // Spara värdet från sökfältet

  const debouncedQuery = useDebounce(searchQuery, 1000); // Fördröjer sökfrågan för att undvika för många API-anrop med 1sek från att man slutat skriva.

  const isFetchingRef = useRef(false); // En ref för att hålla koll på om vi redan håller på att hämta data och ej orsakar en omrendering och ej ett nytt api anrop om vi redan gör förfrågan.

  const fetchRecipes = async (searchQuery) => {
    if (isFetchingRef.current) return;
    // Om vi redan hämtar data, gör ingenting
    isFetchingRef.current = true;
    // Sätt ref till true för att markera att vi redan håller på att hämta data
    setLoading(true);
    // Sätt loading till true för att visa laddnings symbolen
    setNoResults(false);
    // Sätter noResults till false om vi gör en ny sökning

    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`
      );
      const data = await res.json();
      // Först kollar vi om data.meals finns och inte är null/undefined, om det finns minst 1 så kommer if satsen köras.  data.meals.length kollar vi om data.meals har några element i sig.
      if (data.meals && data.meals.length > 0) {
        setRecipes(data.meals);
        // Om vi har recept, sätt recepten i setRecipes state arrayen annars inga resultat hittades och felmeddelandet visas.
        setNoResults(false);
      } else {
        setRecipes([]);
        // om inga recept hittas så sätter vi en tom lista
        setNoResults(true);
        // felmeddelandet skickas ut och visas att inga recept finns med det namnet/sökningen.
      }
    } catch (error) {
      console.log(error.message); // Om något går fel, logga felet
      setRecipes([]);
      // Om något går fel, gör en tom array
      setNoResults(true);
      // felmeddelandet visas
    } finally {
      setLoading(false); // Sätter datan till false när datan är hämtad. annars visas skeleton
      isFetchingRef.current = false;
      // Sätter ref tillbaka till false
    }
  };

  useEffect(() => {
    fetchRecipes("chicken");
  }, []);
  // En useeffect för att hämta data när sidan laddas, i detta fall recept som har chicken som standard.

  useEffect(() => {
    if (debouncedQuery) {
      fetchRecipes(debouncedQuery);
    }
  }, [debouncedQuery]);
  // useEffect för att fetcha recept varje gång debouncyQueryn ändras och gör en ny sökning, pga debouncing

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
              value={searchQuery} // Använd sökfrågans värde i inputfältet
              onChange={(e) => setSearchQuery(e.target.value)} // Uppdatera searchQuery (sökfrågan) vid ändring/skrivningar i inputfältet
            />
          </label>
        </form>

        <h1 className="font-bold text-3xl md:text-5xl mt-4">
          Rekommenderade recept
        </h1>
        <p className="text-slate-500 font-semibold ml-1 my-2 text-sm tracking-tight">
          Populära val
        </p>
        {/* Text för att visa felmeddelandet om noResults är true och !loading för att visa laddnings symbolen */}
        {noResults && !loading && (
          <p className="text-center text-red-500">
            Inga resultat hittades, maträtten finns inte!
          </p>
        )}

        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* Kollar om datan håller på att hämtas, om loading är true så visas skeleton laddningskärmen. den skapar 9st skelett tillsammans med map och skappa skelett laddnings symboler.  */}
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
          {/* om loading är false, och datan hämtas så kommer datan att visas med minst 1 recept så visas ej skelett laddningen.  */}
          {!loading &&
            recipes.length > 0 &&
            recipes.map((meal, index) => (
              <RecipeCard key={meal.idMeal || index} meals={meal} /> // Skickar varje recept till RecipeCard-komponenten
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
