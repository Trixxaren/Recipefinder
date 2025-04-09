import { Flame, Heart, Wheat, Youtube } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Lista på vanliga glutenhaltiga ingredienser, då jag gjort en extra div med gluten/glutenfritt recept.
const glutenFreeIngredients = [
  "chicken",
  "rice",
  "potatoes",
  "vegetables",
  "cheese",
  "eggs",
  "beef",
  "fish",
  "yogurt",
  "corn",
];

// Kollar om receptets ingrediens innehåller wheat eller flour med hjälp av en foor loop och om det ej finns så returneras true och visar texten som glutenfri
const isGlutenFree = (ingredients) => {
  for (let ingredient of ingredients) {
    if (
      ingredient &&
      typeof ingredient === "string" &&
      // kollar om ingredient är en sträng och att varje ingredients finns och inte är null/undefined.
      (ingredient.toLowerCase().includes("flour") ||
        ingredient.toLowerCase().includes("wheat"))
      // går in i ingredient och gör alla bokstäver små och om dom inkluderar flour eller wheat
    ) {
      return false;
      // Ger tillbaka att den innehåller gluten
    }
  }
  return true;
  // returnerar tillbaka glutenfri
};

// Går att ersättas med kcal API, ev om tid finns, enkel uträknare för kcal mängd. Rolig extra idé, men just nu med mockad data mellan 450-600.
const getCalories = () => {
  const randomNr = Math.floor(Math.random() * 151) + 450;
  return randomNr;
};

const useFavorite = (meals) => {
  const [isFavorite, setIsFavorite] = useState(false);
  // En custom hook för att hantera favorit recept, kollar om receptet är favorit eller inte, använder useState för att hålla reda på statusen i favoriter.
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    // Då localStorage lagrar data som strängar så parsear vi strängen för att omvandla till objekt eller array, om de inte finns något värde i localstorage så returneras en tom array.
    const isRecipeInFavorites = favorites.some(
      (fav) => fav.strMeal === meals.strMeal
    );
    // useEffect körs när meals ändras och hämtar då favoritrecept från local storalge och om det finns sätts till true. fav representerar namnet från objektet i favorites.
    setIsFavorite(isRecipeInFavorites);
  }, [meals]);

  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    // Om de inte finns något värde som matchar i localstorage så returneras en tom array.
    const isRecipeAlreadyInFavorites = favorites.some(
      (fav) => fav.strMeal === meals.strMeal
    );
    if (isRecipeAlreadyInFavorites) {
      // Kollar om receptet redan är i favoriter och förhindrar att skapa dubletter
      favorites = favorites.filter((fav) => fav.strMeal !== meals.strMeal);
    } else {
      favorites.push(meals);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    // Omvandlar arrayen till en sträng därför att localStorage endast kan lagra data som strängar

    setIsFavorite(!isRecipeAlreadyInFavorites);
  };

  return [isFavorite, toggleFavorite];
  // Returnerar isfavoriter eller toggle för att funktionen ska få reda på om ett recept är favorit eller inte
};

const RecipeCard = ({ meals }) => {
  const ingredients = [
    meals.strIngredient1,
    meals.strIngredient2,
    meals.strIngredient3,
    meals.strIngredient4,
    meals.strIngredient5,
    meals.strIngredient6,
    meals.strIngredient7,
    meals.strIngredient8,
    meals.strIngredient9,
    meals.strIngredient10,
    meals.strIngredient11,
    meals.strIngredient12,
    meals.strIngredient13,
    meals.strIngredient14,
    meals.strIngredient15,
  ];

  const [isFavorite, toggleFavorite] = useFavorite(meals);

  const glutenStatus = isGlutenFree(ingredients);
  // För att få värdet om det är glutenfritt eller inte
  const calories = getCalories(ingredients);
  // generars av funktionen getCarories randomizern.

  // SJälva kortet för att visa thumbsnail bilder med router link´s och onclick funktion för att komma till receptet mm.
  return (
    <div className="flex flex-col rounded-md border-2 border-grey overflow-hidden p-3 relative">
      <div className="relative w-full h-48">
        <Link to={`/instructions/${meals.idMeal}`}>
          <img
            src={meals.strMealThumb}
            alt={meals.strMeal}
            className="rounded-md w-full h-full object-cover cursor-pointer hover:opacity-80"
          />
        </Link>
        <div
          className="absolute top-1 right-2 bg-white rounded-full p-1 cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite();
          }}
        >
          <Heart
            size={24}
            className={`hover:fill-red-400 hover:text-red-500 ${
              isFavorite ? "fill-red-500 text-red-500" : ""
            }`}
          />
        </div>
      </div>

      <div className="flex mt-1">
        <p className="font-bold tracking-wide">{meals.strMeal}</p>
      </div>
      <p className="my-2">
        {meals.strArea} kitchen <br />
        Category: {meals.strCategory}
      </p>
      <div className="flex gap-2 mt-auto">
        <div className="flex gap-1 bg-[#b6bba9b0] items-center p-1 rounded-md">
          <Wheat size={16} />
          <span className="text-sm tracking-tighter font-semibold">
            {glutenStatus ? "Glutenfri" : "Gluten"}
          </span>
        </div>
        <div className="flex gap-1 bg-[#b6bba9b0] items-center p-1 rounded-md">
          <Flame size={16} />
          <span className="text-sm tracking-tighter font-semibold">
            {calories} kcal
          </span>
        </div>

        <div className="flex gap-1 bg-[#b6bba9b0] hover:bg-[#b6bba9f9] items-center p-1 rounded-md cursor-pointer">
          <a
            href={meals.strYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1"
          >
            <Youtube size={16} />
            <span className="text-sm tracking-tighter font-semibold">
              YouTube
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
