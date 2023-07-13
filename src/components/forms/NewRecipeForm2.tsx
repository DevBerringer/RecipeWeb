import { useState } from 'react';

function NewRecipeForm2() {
  const [ingredients, setIngredients] = useState(Array(5).fill(''));

  const handleIngredientChange = (index, e) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = e.target.value;
    setIngredients(updatedIngredients);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-recipecentral shadow-lg rounded">
      <h2 className="text-2xl font-semibold mb-4">Ingredients:</h2>
      {ingredients.map((ingredient, index) => (
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
