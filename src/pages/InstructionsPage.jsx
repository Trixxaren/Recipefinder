// InstructionsPage.jsx
import { useLocation } from "react-router-dom";

const InstructionsPage = () => {
  const location = useLocation(); // Hämta location-objektet från React Router
  console.log("Location state: ", location.state); // Debugging för att se vad vi får i state

  const { meal } = location.state || {}; // Hämta meal från state, om det finns

  // Kontrollera om 'meal' finns
  if (!meal) {
    return <p>Receptdata saknas!</p>; // Om meal är undefined, visa ett meddelande
  }

  console.log("Meal received: ", meal); // För felsökning, kontrollera om meal är korrekt

  // Skapa en lista på ingredienser och deras mått
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`] && meal[`strIngredient${i}`] !== "") {
      ingredients.push({
        ingredient: meal[`strIngredient${i}`],
        measure: meal[`strMeasure${i}`],
      });
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Bild */}
        <div className="relative w-full h-80">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full h-full object-cover rounded-t-lg"
          />
        </div>

        <div className="p-6">
          {/* Receptnamn, kategori och område */}
          <h1 className="text-3xl font-bold text-gray-800">{meal.strMeal}</h1>
          <p className="mt-2 text-lg text-gray-600">
            <strong>Kategori:</strong> {meal.strCategory} |{" "}
            <strong>Area:</strong> {meal.strArea}
          </p>

          {/* Ingredienser */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Ingredienser
            </h2>
            <ul className="mt-4 space-y-2">
              {ingredients.map((ingredient, index) => (
                <li key={index} className="flex justify-between text-gray-700">
                  <span>{ingredient.ingredient}</span>
                  <span className="font-semibold">{ingredient.measure}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instruktioner */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Instruktioner
            </h2>
            <p className="mt-4 text-gray-700">{meal.strInstructions}</p>
          </div>

          {/* YouTube Video (om det finns) */}
          {meal.strYoutube && (
            <div className="mt-6">
              <h2 className="text-2xl font-semibold text-gray-800">Video</h2>
              <a
                href={meal.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Klicka här för att se videon
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstructionsPage;
