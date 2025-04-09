import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Youtube } from "lucide-react";

const InstructionsPage = () => {
  const { id } = useParams();
  // Hämtar param ID från Apiet, i detta fall recept id
  const location = useLocation();
  // Info om det aktuella APIet och tillståndet
  const [mealData, setMealData] = useState(null);
  // State variabel för att hålla data, null då data inte hämtats ännu, uppdateras senare till array när datan är hämtad

  const mealFromState = location.state?.meal;
  // Här kollar vi om det finns någon information från tidigare "sida" och sparar i mealFromState
  useEffect(() => {
    // useEffect för att hämta data när komponenten laddas, om det redan finns data i MealFromState så sätts det, annars görs ett nytt api anrop.
    if (mealFromState) {
      setMealData(mealFromState);
      // Om mealFromState finns så sätts mealData till det
    } else {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json())
        .then((data) => setMealData(data.meals[0]))
        // Om inte datan finns så gör vi ett nytt api anrop där vi använder ID från apiet och uppdaterar mealData till den första måltiden i apiet
        .catch((error) => console.error(error));
    }
  }, [id, mealFromState]);

  if (!mealData) {
    return <div className="text-center p-4">Receptdata saknas...</div>;
    // Felmeddelande för att kolla om mealData fortfarande är null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 flex flex-col items-center">
      <div className="max-w-4xl w-full bg-gray-50">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {mealData.strMeal}
          {/* Själva rättens anrop, om vi har lyckats hämta receptdata så visar vi det i denna div  */}
        </h1>

        <div className="flex justify-center mb-6">
          <img
            src={mealData.strMealThumb}
            // source för front bild på receptet som vi hämtat från APIet
            alt={mealData.strMeal}
            // Alternativ bild om StrMealThumb inte skulle fungera
            className="rounded-lg w-full max-w-xl object-cover"
          />
        </div>

        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Ingredienser
        </h2>
        <ul className="list-inside list-disc space-y-2 text-gray-600 mb-6">
          {/* Först använder vi Array.from som är en metod för att skapa en array baserat på ett objekt. som har en length på 20, alltså möjlighet att ha 20st objekt men visas inte om de är undefined.
          map används för att itirera över arrayen och skapa et tnytt resultat för varje element. _, avänds för att inte få varningsmeddelande &  för att visa först att vi inte bryr oss om det aktuella värdet (undefined)
          sen använder vi index för att hämta rätt ingrediens från mealData.   */}
          {Array.from({ length: 20 }).map((_, index) => {
            const ingredient = mealData[`strIngredient${index + 1}`];
            // För att hämta strIngredients från 1-20 i mealdb apiet
            const measure = mealData[`strMeasure${index + 1}`];
            // För att hämta strMeasure från 1-20 i mealDb apiet
            if (ingredient) {
              // om ingridiensen finns med i strIngredients, kollar vi så att ingrediens finns och alltså inte är undefined eller null och är ett faktiskt värde.
              return (
                <li key={index}>
                  <span className="font-semibold">{measure}</span> {ingredient}
                </li>
                // här returnerar vi det faktiska värdet i en Li och ett unikt nyckel värde.
              );
            }
            return null;
            // Returnerar null ifall det inte finns någon ingrediens. om ingredient ä false. och inget kommer renderas
          })}
        </ul>

        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Instruktioner
        </h2>
        {/* Tillsnyggning för att få carriage returns då det är en lång text och delar upp den vid varje radbrytning. mer läsbarhet och snyggare. */}
        {mealData.strInstructions.split("\r\n").map((str, idx) => (
          <p key={idx} className="text-gray-600 mb-2">
            {str}
          </p>
        ))}
        {/* Här kollar vi om det finns youtube länk och då returnerar den med youtube klickbar ikon till youtube klippet  */}
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
