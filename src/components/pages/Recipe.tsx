import { useState, useEffect } from 'react';
import { UseRecipe } from '../../contexts/recipesContext';

function RecipePage() {
  const { recipe } = UseRecipe();
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const recipeId = window.location.pathname.split('/').pop();
    const filteredRecipe = recipe.find((r) => r.Id === recipeId);
    setCurrentRecipe(filteredRecipe || null);
  }, [recipe]);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold">{currentRecipe?.Name}</h1>
      <p className="text-gray-500 mb-8">
        Created Date: {currentRecipe?.CreatedDate?.getDate()}{' '}
      </p>
      {[1, 2, 3, 4, 5].map((index) => (
        <span
          key={index}
          className={`${
            index <= (currentRecipe?.Rating || 0)
              ? 'text-yellow-500'
              : 'text-gray-300'
          } fa fa-star`}
        />
      ))}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <img
            src={currentRecipe?.Picture || '/assets/NoFoodPicture.jpg'}
            alt="Recipe"
            className="w-full h-40 object-cover"
          />
          <p className="text-gray-500">
            Prep Time: 30 minutes | Cook Time: {currentRecipe?.CookTimeMin}{' '}
            minutes
          </p>
          <h3 className="text-xl font-bold mt-6 mb-2">Ingredients</h3>
          {currentRecipe?.Ingredients.map((ingredient, index) => (
            <ul key={index} className="flex items-center mb-2">
              <li>{ingredient}</li>
            </ul>
          ))}
          <h3 className="text-xl font-bold mt-6 mb-2">Instructions</h3>
          {currentRecipe?.Steps.map((step, index) => (
            <ol key={index} className="list-decimal pl-6">
              <li>{step}</li>
            </ol>
          ))}
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Nutritional Information</h3>
          <ul className="list-disc pl-6">
            <li>Calories: 500</li>
            <li>Protein: 20g</li>
            <li>Fat: 10g</li>
            {/* Add more nutritional information */}
          </ul>
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
