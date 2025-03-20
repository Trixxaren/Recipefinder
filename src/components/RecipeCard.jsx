import { Flame, Heart, Soup, Vegan, Wheat } from "lucide-react";

// Lista på vanliga glutenhaltiga ingredienser
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

// Funktion som kontrollerar om ett recept är glutenfritt
const isGlutenFree = (ingredients) => {
  for (let ingredient of ingredients) {
    if (
      (ingredient && ingredient.toLowerCase().includes("flour")) ||
      ingredient.toLowerCase().includes("wheat")
    ) {
      return false;
    }
  }
  return true;
};

// Dummy funktion för att hämta kalorier (kan ersättas med riktig API eller beräkning)
const getCalories = (ingredients) => {
  // Här kan du anropa ett externt API eller använda en kaloridatabas för att få det faktiska kaloriantalet.
  // För nu använder vi ett dummy-värde. ev ladda ner ett API och fetcha
  return 450; // Dummy-värde, 450 kcal per rätt
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

  const glutenStatus = isGlutenFree(ingredients); // Kolla om receptet är glutenfritt
  const calories = getCalories(ingredients); // Hämta kalorier

  // Kontrollera om receptet är veganskt
  const isVegan = meals.strCategory === "Vegan"; // Om strCategory är Vegan

  return (
    <div className="flex flex-col rounded-md bg-[#ecf7d4] overflow-hidden p-3 relative">
      <a
        href={meals.strYoutube}
        className="relative h-32"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={meals.strMealThumb}
          alt={meals.strMeal}
          className="rounded-md w-full h-full object-cover cursor-pointer"
        />
        <div className="absolute bottom-2 left-2 bg-white rounded-full p-1 cursor-pointer flex items-center gap-1 text-sm">
          <Soup size={16} /> 4:a personer{" "}
          {/* Här kan du eventuellt göra detta dynamiskt om du har portionsinformation, finns ej i MEALDB */}
        </div>
        <div className="absolute top-1 right-2 bg-white rounded-full p-1 cursor-pointer">
          <Heart size={20} className="hover:fill-red-500 hover:text-red-500" />
        </div>
      </a>
      <div className="flex mt-1">
        <p className="font-bold tracking-wide">{meals.strMeal}</p>
      </div>
      <p className="my-2">{meals.strArea} kitchen</p>
      <div className="flex gap-2 mt-auto">
        <div className="flex gap-1 bg-[#d6f497] items-center p-1 rounded-md">
          <Wheat size={16} />
          <span className="text-sm tracking-tighter font-semibold">
            {glutenStatus ? "Glutenfri" : "Innehåller gluten"}{" "}
          </span>
        </div>
        <div className="flex gap-1 bg-[#d6f497] items-center p-1 rounded-md">
          <Flame size={16} />
          <span className="text-sm tracking-tighter font-semibold">
            {calories} kcal
          </span>
        </div>
        <div className="flex gap-1 bg-[#d6f497] items-center p-1 rounded-md">
          <Vegan size={16} />
          <span className="text-sm tracking-tighter font-semibold">
            {isVegan ? "Veganskt" : "Inte Veganskt"}{" "}
            {/* Dynamiskt baserat på strCategory */}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
