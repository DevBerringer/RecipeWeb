import { useContext } from 'react';

import { RecipesContext } from '../../../contexts/recipesContext';

function CategorySelector() {
  const recipeContext = useContext(RecipesContext);

  const handleCategorySelection = (category) => {
    let updatedFoodTypes = [...recipeContext?.foodTypes];
    if (!updatedFoodTypes.includes(category.name)) {
      updatedFoodTypes.push(category.name);
    } else {
      updatedFoodTypes = updatedFoodTypes.filter(
        (item) => item !== category.name
      );
    }
    recipeContext?.setFoodTypes(updatedFoodTypes);
  };

  return (
    <div className="mx-auto text-center">
      <label htmlFor="Category" className="mr-2 text-3xl font-semibold">
        Select all Relevant Categories:
      </label>
    </div>
  );
}

export default CategorySelector;
