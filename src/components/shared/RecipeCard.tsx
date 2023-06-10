interface Recipe {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface RecipeCardProps {
  recipe: Recipe;
}

function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-40 object-cover mb-4 rounded-lg"
      />
      <h2 className="text-xl font-bold mb-2">{recipe.title}</h2>
      <p className="text-gray-700">{recipe.description}</p>
    </div>
  );
}

export default RecipeCard;
