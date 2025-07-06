interface RecipeCardProps {
  name: string;
  picture: string | null;
  prepTime: number;
  cookTime: number;
}

export default function RecipeCard({
  name,
  prepTime,
  picture,
  cookTime,
}: RecipeCardProps) {
  return (
    <div className="group flex h-full w-full transform cursor-pointer flex-col justify-between rounded-lg shadow shadow-slate-400 transition-transform hover:scale-105 hover:shadow-slate-400">
      <div className="">
        <img
          src={picture || 'assets/noFood.jpg'}
          alt="Non-Uploaded"
          className="h-48 w-full rounded-t-lg object-fill"
        />
        <h2 className="p-4">{name}</h2>
        <p className="p-4">Prep Time: {prepTime}</p>
        <p className="p-4">Cook Time: {cookTime}</p>
      </div>
      <button
        type="button"
        className="m-4 rounded-3xl p-4 text-lg font-semibold transition duration-150 ease-in group-hover:border-black group-hover:bg-recipecentral"
      >
        View Recipe
      </button>
    </div>
  );
}
