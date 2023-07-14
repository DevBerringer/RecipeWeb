import { useState } from 'react';

function NewRecipeForm2() {
  const [steps, setSteps] = useState(Array(3).fill(''));

  const handleStepChange = (index, value) => {
    const updatedSteps = [...steps];
    updatedSteps[index] = value;
    setSteps(updatedSteps);
  };

  const addStep = () => {
    setSteps([...steps, '']);
  };

  const removeStep = (index) => {
    const updatedSteps = [...steps];
    updatedSteps.splice(index, 1);
    setSteps(updatedSteps);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-recipecentral shadow-lg rounded">
      <h2 className="text-2xl font-semibold mb-4">Steps:</h2>
      {steps.map((step, index) => (
        <div className="mb-4" key={index}>
          <label
            htmlFor={`description-${index}`}
            className="block mb-1 font-semibold"
          >
            Step {index + 1}
          </label>
          <textarea
            id={`description-${index}`}
            value={step}
            onChange={(e) => handleStepChange(index, e.target.value)}
            placeholder="Enter step"
            className="w-full px-4 py-2 border border-gray-300 rounded"
            rows="4"
          />
          <button
            type="button"
            onClick={() => removeStep(index)}
            className="text-red-500 font-semibold mt-2"
          >
            Remove Step
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addStep}
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded"
      >
        Add Step
      </button>
    </div>
  );
}

export default NewRecipeForm2;
