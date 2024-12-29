import React, { useEffect, useState } from 'react';
import { addRecipe } from '../../../api/api';
import { RecipesContext } from '../../../contexts/recipesContext';
import NewRecipeForm1 from './NewRecipeForm1';
import NewRecipeForm2 from './NewRecipeForm2';
import CategorySelector from './CategorySelector';
import { UseAuth } from '../../../contexts/authContext';

function NewRecipe() {
  const [currentStep, setCurrentStep] = useState(0); // State to keep track of the current step
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState('');
  const [spicyLevel, setSpicyLevel] = useState(false);
  const [description, setDescription] = useState('');
  const [cookTimeMin, setCookTimeMin] = useState(0);
  const [prepTimeMin, setPrepTimeMin] = useState(0);
  const [ingredients, setIngredients] = useState(Array(6).fill(''));
  const [steps, setSteps] = useState(Array(2).fill(''));
  const [foodTypes, setFoodTypes] = useState([]);
  const { user } = UseAuth();

  function submitNewRecipe(event) {
    event.preventDefault();
    // Create the recipe object
    const recipe = {
      Id: null,
      Name: name,
      Picture: selectedImage,
      SpicyLevel: spicyLevel,
      Description: description,
      CookTimeMin: cookTimeMin,
      PrepTimeMin: prepTimeMin,
      FoodTypes: foodTypes,
      Ingredients: ingredients.filter((ingredient) => ingredient !== ''),
      Steps: steps.filter((step) => step !== ''),
      Rating: null,
      CreatedBy: user?.Id,
    };
    addRecipe(recipe);
  }

  function handleNextStep() {
    setCurrentStep((prevStep) => prevStep + 1);
  }

  function handlePreviousStep() {
    setCurrentStep((prevStep) => prevStep - 1);
  }

  // Create an array of the components to show in order
  const stepsComponents = [
    <CategorySelector onNext={handleNextStep} />,
    <NewRecipeForm1 onNext={handleNextStep} onPrevious={handlePreviousStep} />,
    <NewRecipeForm2 onNext={handleNextStep} onPrevious={handlePreviousStep} />,
  ];

  useEffect(() => {
    document.title = `New Recipe - Step ${currentStep + 1}`;
  }, [currentStep]);

  return (
    <RecipesContext.Provider
      value={{
        selectedImage,
        setSelectedImage,
        name,
        setName,
        spicyLevel,
        setSpicyLevel,
        description,
        setDescription,
        cookTimeMin,
        setCookTimeMin,
        ingredients,
        setIngredients,
        steps,
        setSteps,
        foodTypes,
        setFoodTypes,
        prepTimeMin,
        setPrepTimeMin,
      }}
    >
      <div className="relative mx-auto">
        {currentStep > 0 && (
          <button
            className="fixed left-0 top-1/2 min-h-full w-16 -translate-y-1/2 transform bg-recipecentral text-black hover:bg-recipecentral-dark hover:text-white focus:outline-none rounded-r-lg focus-visible:bg-recipecentral-dark focus-visible:ring-2 focus-visible:ring-offset-2"
            type="button"
            onClick={handlePreviousStep}
          >
            Previous
          </button>
        )}
        <div>{stepsComponents[currentStep]}</div>
        {currentStep < stepsComponents.length - 1 ? (
          <button
            className="fixed right-0 top-1/2 min-h-full w-16 -translate-y-1/2 transform bg-transparent text-black hover:bg-recipecentral-dark hover:text-white focus:outline-none rounded-l-lg focus-visible:bg-recipecentral-dark focus-visible:ring-2 focus-visible:ring-offset-2"
            type="button"
            onClick={handleNextStep}
          >
            Next
          </button>
        ) : (
          <button
            className="absolute right-0 top-20 mt-4 rounded-md bg-recipecentral px-4 py-2 text-black hover:bg-recipecentral-dark hover:text-white focus:outline-none focus-visible:bg-recipecentral-dark focus-visible:ring-2 focus-visible:ring-offset-2"
            type="submit"
            onClick={submitNewRecipe}
          >
            Submit!
          </button>
        )}
      </div>
    </RecipesContext.Provider>
  );
}

export default NewRecipe;
