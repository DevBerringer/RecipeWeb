import { useContext } from 'react';
import { RecipesContext } from '../../contexts/recipesContext';

function NewRecipeForm2() {
  const recipeContext = useContext(RecipesContext);

  const handleIngredientChange = (index, e) => {
    const updatedIngredients = [...recipeContext?.ingredients];
    updatedIngredients[index] = e.target.value;
    recipeContext?.setIngredients(updatedIngredients);
  };

  const handleAddIngredient = () => {
    recipeContext?.setIngredients([...recipeContext?.ingredients, '']);
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = [...recipeContext?.ingredients];
    updatedIngredients.splice(index, 1);
    recipeContext?.setIngredients(updatedIngredients);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-recipecentral shadow-lg rounded h-full">
      <h2 className="text-2xl font-semibold mb-4">Ingredients:</h2>
      <div className="mb-4">
        <div className="flex items-center">
          <input
            checked={recipeContext?.spicyLevel}
            id="spicyLevel"
            type="checkbox"
            onChange={(e) => recipeContext?.setSpicyLevel(e.target.checked)}
            className="h-4 w-4 border border-gray-300 rounded text-checkboxCustom focus:outline-none focus:ring-checkboxCustom"
          />

          <label htmlFor="spicyLevel" className="ml-2 text-sm font-medium">
            Is this food spicy?
          </label>
        </div>
      </div>
      {recipeContext?.ingredients.map((ingredient, index) => (
        <div key={index} className="flex items-center mb-2">
          <input
            type="text"
            value={ingredient}
            onChange={(e) => handleIngredientChange(index, e)}
            placeholder="Enter ingredient"
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
          <button
            type="button"
            onClick={() => handleRemoveIngredient(index)}
            className="ml-2"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        className="px-4 py-2 text-sm text-black bg-white rounded-md hover:bg-recipecentral-dark hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:bg-recipecentral-dark"
        type="button"
        onClick={handleAddIngredient}
      >
        Add Ingredient
      </button>
    </div>
  );
}

export default NewRecipeForm2;
