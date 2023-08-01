import { useState } from 'react';

import { addRecipe } from '../../../api/api';
import { RecipesContext } from '../../../contexts/recipesContext';
import NewRecipeForm1 from './NewRecipeForm1';
import NewRecipeForm2 from './NewRecipeForm2';
import NewRecipeForm3 from './NewRecipeForm3';
import CategorySelector from './CategorySelector';
import { UseAuth } from '../../../contexts/authContext';

function NewRecipe() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState('');
  const [spicyLevel, setSpicyLevel] = useState(false);
  const [description, setDescription] = useState('');
  const [cookTimeMin, setCookTimeMin] = useState(0);
  const [prepTimeMin, setPrepTimeMin] = useState(0);
  const [ingredients, setIngredients] = useState(Array(5).fill(''));
  const [steps, setSteps] = useState(Array(3).fill(''));
  const [foodTypes, setFoodTypes] = useState([]);
  const { user } = UseAuth();

  function submitNewRecipe(event: { preventDefault: () => void }) {
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
        <CategorySelector />
        <div className="flex flex-wrap justify-center">
          <div className="mx-2 mt-4 min-w-fit flex-1">
            <NewRecipeForm1 />
          </div>
          <div className="mx-2 mt-4 min-w-fit flex-1">
            <NewRecipeForm2 />
          </div>
          <div className="mx-2 mt-4 min-w-fit flex-1">
            <NewRecipeForm3 />
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <button
            className="rounded-md bg-recipecentral px-4 py-2 text-sm text-black hover:bg-recipecentral-dark hover:text-white focus:outline-none focus-visible:bg-recipecentral-dark focus-visible:ring-2 focus-visible:ring-offset-2"
            type="submit"
            onClick={submitNewRecipe}
          >
            Submit New Recipe!
          </button>
        </div>
      </div>
    </RecipesContext.Provider>
  );
}

export default NewRecipe;
