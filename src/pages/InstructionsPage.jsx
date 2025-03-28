import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Youtube } from "lucide-react";

const InstructionsPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const [mealData, setMealData] = useState(null);

  const mealFromState = location.state?.meal;

  useEffect(() => {
    if (mealFromState) {
      setMealData(mealFromState);
    } else {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json())
        .then((data) => setMealData(data.meals[0]))
        .catch((error) => console.error(error));
    }
  }, [id, mealFromState]);

  if (!mealData) {
    return <div className="text-center p-4">Receptdata saknas...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 flex flex-col items-center">
      <div className="max-w-4xl w-full bg-gray-50">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {mealData.strMeal}
        </h1>

        <div className="flex justify-center mb-6">
          <img
            src={mealData.strMealThumb}
            alt={mealData.strMeal}
            className="rounded-lg w-full max-w-xl object-cover"
          />
        </div>

        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Ingredienser
        </h2>
        <ul className="list-inside list-disc space-y-2 text-gray-600 mb-6">
          {Array.from({ length: 20 }).map((_, index) => {
            const ingredient = mealData[`strIngredient${index + 1}`];
            const measure = mealData[`strMeasure${index + 1}`];
            if (ingredient) {
              return (
                <li key={index}>
                  <span className="font-semibold">{measure}</span> {ingredient}
                </li>
              );
            }
            return null;
          })}
        </ul>

        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Instruktioner
        </h2>
        <p className="text-gray-600">{mealData.strInstructions}</p>

        <div className="mt-8 text-center">
          {mealData.strYoutube && (
            <a
              href={mealData.strYoutube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#b6bba9b0] text-black font-semibold rounded-full shadow-md hover:bg-[#b6bba9f9] text-sm"
            >
              <Youtube size={24} />
              <span className="text-sm tracking-tighter font-semibold">
                YouTube
              </span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstructionsPage;
