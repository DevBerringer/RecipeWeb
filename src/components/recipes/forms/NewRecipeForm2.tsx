import { useContext } from 'react';
import { RecipesContext } from '../../../contexts/recipesContext';

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

  const handleStepChange = (index, value) => {
    const updatedSteps = [...recipeContext?.steps];
    updatedSteps[index] = value;
    recipeContext?.setSteps(updatedSteps);
  };

  const addStep = () => {
    recipeContext?.setSteps([...recipeContext.steps, '']);
  };

  const removeStep = (index) => {
    const updatedSteps = [...recipeContext?.steps];
    updatedSteps.splice(index, 1);
    recipeContext?.setSteps(updatedSteps);
  };

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-x-32 lg:grid-cols-2">
      <div>
        <h2 className="mb-4 text-2xl font-semibold">Ingredients:</h2>
        <div className="mb-4">
          <div className="flex items-center">
            <input
              checked={recipeContext?.spicyLevel}
              id="spicyLevel"
              type="checkbox"
              onChange={(e) => recipeContext?.setSpicyLevel(e.target.checked)}
              className="h-4 w-4 rounded border border-gray-300 text-checkboxCustom focus:outline-none focus:ring-checkboxCustom"
            />

            <label htmlFor="spicyLevel" className="ml-2 font-medium">
              Is this food spicy?
            </label>
          </div>
        </div>
        {recipeContext?.ingredients.map((ingredient, index) => (
          <div key={index} className="mb-2 flex items-center">
            <input
              type="text"
              value={ingredient}
              onChange={(e) => handleIngredientChange(index, e)}
              placeholder="Enter ingredient"
              className="w-full rounded border border-gray-300 px-4 py-2"
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
          className="my-auto mb-10 h-12 rounded-md bg-recipecentral-dark px-4 text-white hover:bg-white hover:text-black focus:outline-none focus-visible:bg-recipecentral-dark focus-visible:ring-2 focus-visible:ring-offset-2"
          type="button"
          onClick={handleAddIngredient}
        >
          Add Ingredient
        </button>
      </div>
      <div>
        <h2 className="mb-4 text-2xl font-semibold">Steps:</h2>
        {recipeContext?.steps.map((step, index) => (
          <div className="mb-4" key={index}>
            <textarea
              id={`description-${index}`}
              value={step}
              onChange={(e) => handleStepChange(index, e.target.value)}
              placeholder="Enter step"
              className="w-full rounded border border-gray-300 px-4 py-2"
              rows={4}
            />
            <button
              type="button"
              onClick={() => removeStep(index)}
              className="mt-2 font-semibold text-red-500"
            >
              Remove Step
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addStep}
          className="my-auto mb-10 h-12 rounded-md bg-recipecentral-dark px-4 text-white hover:bg-white hover:text-black focus:outline-none focus-visible:bg-recipecentral-dark focus-visible:ring-2 focus-visible:ring-offset-2"
        >
          Add Step
        </button>
      </div>
    </div>
  );
}

export default NewRecipeForm2;
