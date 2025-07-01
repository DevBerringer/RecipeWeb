import RecipeTag from './componenets/RecipeTag';

type RecipeProps = {
  recipe: RecipeType;
};

function Recipe({ recipe }: RecipeProps) {
  return (
    <div className="mx-auto my-6 max-w-3xl rounded bg-white p-6 shadow-md">
      <h1 className="mb-4 text-5xl font-bold">{recipe.Name}</h1>
      <img
        src={recipe.Picture}
        alt={recipe.Name}
        className="mx-auto mb-6 max-h-96 rounded object-cover"
      />

      <div className="mb-6 flex justify-center gap-4">
        {/* Cuisine Types */}
        {recipe.CuisineTypes?.map((id: string, idx: number) => (
          <RecipeTag
            key={id}
            label={id}
            idx={idx}
            baseColor="bg-green-200"
            borderColor="green"
            shadowColor="rgba(0,128,0,0.3)"
          />
        ))}

        {/* Meal Types */}
        {recipe.MealTypes?.map((id: string, idx: number) => (
          <RecipeTag
            key={id}
            label={id}
            idx={idx}
            baseColor="bg-blue-200"
            borderColor="blue"
            shadowColor="rgba(0,0,255,0.3)"
          />
        ))}
      </div>

      <div className="mb-6 flex justify-center gap-6 text-xl font-semibold">
        <div>
          Prep Time: <span>{recipe.PrepTimeMin} min</span>
        </div>
        <div>
          Cook Time: <span>{recipe.CookTimeMin} min</span>
        </div>
        <div>{recipe.IsVegetarian ? '🌱 Vegetarian' : '🍖 Non-Vegetarian'}</div>
        <div>{recipe.IsSpicy ? '🌶️ Spicy' : '❄️ Not Spicy'}</div>
      </div>

      <h2 className="mb-3 text-3xl font-semibold">Ingredients</h2>
      <ul className="mb-6 list-inside list-disc">
        {recipe.Ingredients.map((ingredient: string, idx: number) => (
          <li key={idx}>{ingredient}</li>
        ))}
      </ul>

      <h2 className="mb-3 text-3xl font-semibold">Steps</h2>
      <ol className="list-inside list-decimal space-y-2">
        {recipe.Steps.map((step: string, idx: number) => (
          <li key={idx}>{step}</li>
        ))}
      </ol>
    </div>
  );
}

export default Recipe;
