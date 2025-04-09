import RecipeCard from "../components/RecipeCard";

const FavoritesPage = () => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  // Hämtar alla sparade favoritrecept från localStorage från webbläsaren. om inga favoriter finns så sätts den till en tom Array.
  return (
    <div className="bg-[#faf9fb] flex-1 p-10 min-h-screen">
      <div className="max-w-screen-lg mx-auto">
        <p className="font-bold text-3xl md:text-5xl my-4">Favoritrecept</p>
        {/* Om inga favoriter finns så sätter vi in en 404. */}
        {favorites.length === 0 && (
          <div className="h-[80vh] flex flex-col items-center gap-4">
            <img src="/404.svg" className="h-3/4" alt="404.svg" />
          </div>
        )}
        {/* För varje favorit som läggs i listan så får de detaljer från meals */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((meals, index) => (
            <RecipeCard key={`${meals.strMeal}-${index}`} meals={meals} />
            // key används för att ge varje komponent ett unikt ID så att vi kan hantera renderingen effektivt, samt index för att kombinera receptet + indexet för att ge en unik nyckel.
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
