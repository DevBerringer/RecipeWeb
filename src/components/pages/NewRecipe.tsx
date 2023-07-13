import NewRecipeForm1 from '../forms/NewRecipeForm1';
import NewRecipeForm2 from '../forms/NewRecipeForm2';
import NewRecipeForm3 from '../forms/NewRecipeForm3';

function NewRecipe() {
  return (
    <div className="mx-auto">
      <div className="flex">
        <div className="flex-1">
          <NewRecipeForm1 />
        </div>
        <hr className="border-gray-300 my-auto mx-4 h-full" />
        <div className="flex-1">
          <NewRecipeForm2 />
        </div>
        <hr className="border-gray-300 my-auto mx-4 h-full" />
        <div className="flex-1">
          <NewRecipeForm3 />
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="px-4 py-2 text-sm text-black bg-recipecentral rounded-md hover:bg-recipecentral-dark hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:bg-recipecentral-dark"
          type="submit"
        >
          Submit New Recipe!
        </button>
      </div>
    </div>
  );
}

export default NewRecipe;
