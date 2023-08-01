import { useContext, useState } from 'react';
import { RecipesContext } from '../../../contexts/recipesContext';

function NewRecipeForm2() {
  const recipeContext = useContext(RecipesContext);

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
    <div className="mx-auto h-full max-w-md rounded bg-recipecentral p-4 shadow-lg">
      <h2 className="mb-4 text-2xl font-semibold">Steps:</h2>
      {recipeContext?.steps.map((step, index) => (
        <div className="mb-4" key={index}>
          <label
            htmlFor={`description-${index}`}
            className="mb-1 block font-semibold"
          >
            Step {index + 1}
          </label>
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
  );
}

export default NewRecipeForm2;
