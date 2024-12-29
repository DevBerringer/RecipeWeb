import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { UseRecipe } from '../../contexts/recipesContext';

function RecipePage() {
  const { recipe } = UseRecipe();
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null);
  const { id: userIdFromURL } = useParams();

  useEffect(() => {
    const filteredRecipe = recipe.find((r) => r.Id === userIdFromURL);
    setCurrentRecipe(filteredRecipe || null);
  }, [recipe, userIdFromURL]);

  return (
    <div className="container mx-auto py-10 text-lg">
      <h1 className="text-4xl font-bold">{currentRecipe?.Name}</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <p className="mt-2">
            Prep Time: {currentRecipe?.PrepTimeMin} | Cook Time:{' '}
            {currentRecipe?.CookTimeMin} minutes
          </p>
          <div className="grid grid-cols-8 gap-4">
            <div className="col-span-3">
              <h3 className="mb-2 mt-6 text-xl font-bold">Ingredients</h3>
              {currentRecipe?.Ingredients.map((ingredient, index) => (
                <ol key={index} className="mb-1 list-disc pl-4">
                  <li>{ingredient}</li>
                </ol>
              ))}
            </div>
            <div className="col-span-5">
              <h3 className="mb-2 mt-6 text-xl font-bold">Instructions</h3>
              <ol className="mb-2 list-decimal pl-4">
                {currentRecipe?.Steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
        <div>
          <p className="mb-8 text-gray-500">
            Created Date:{' '}
            {new Date(currentRecipe?.CreatedDate).toLocaleDateString()}
          </p>
          <img
            src={currentRecipe?.Picture || '/assets/noFood.jpg'}
            alt="Recipe"
            className="h-80 w-5/6 object-cover"
          />
        </div>
      </div>
      {currentRecipe?.Comments?.map((comment, index) => (
        <ol key={index} className="list-decimal pl-6">
          <li>{comment}</li>
        </ol>
      ))}
    </div>
  );
}

export default RecipePage;
