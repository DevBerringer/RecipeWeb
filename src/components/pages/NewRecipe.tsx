import { useState } from 'react';

import { addRecipe } from '../../api/api';
import { RecipesContext } from '../../contexts/recipesContext';
import NewRecipeForm1 from '../forms/NewRecipeForm1';
import NewRecipeForm2 from '../forms/NewRecipeForm2';
import NewRecipeForm3 from '../forms/NewRecipeForm3';
import CategorySelector from '../forms/CategorySelector';
import { UseAuth } from '../../contexts/authContext';

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
      CreatedBy: user?.id,
    };

    console.log(JSON.stringify(recipe));
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
          <div className="flex-1 mt-4 mx-2 min-w-fit">
            <NewRecipeForm1 />
          </div>
          <div className="flex-1 mt-4 mx-2 min-w-fit">
            <NewRecipeForm2 />
          </div>
          <div className="flex-1 mt-4 mx-2 min-w-fit">
            <NewRecipeForm3 />
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <button
            className="px-4 py-2 text-sm text-black bg-recipecentral rounded-md hover:bg-recipecentral-dark hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:bg-recipecentral-dark"
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
