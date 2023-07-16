/* eslint-disable no-unsafe-optional-chaining */
import { useContext } from 'react';

import { ReactComponent as CookingSVG } from '../../assets/cooking.svg';
import { ReactComponent as LogoSvg } from '../../assets/logo2.svg';

import { RecipesContext } from '../../contexts/recipesContext';

function CategorySelector() {
  const recipeContext = useContext(RecipesContext);

  const categories = [
    { id: 0, name: 'Salad' },
    { id: 1, name: 'Soup' },
    { id: 2, name: 'Noodle' },
    { id: 3, name: 'Dessert' },
    // Add more categories as needed
  ];

  const handleCategorySelection = (category: { id?: number; name: any }) => {
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
    <div className="flex items-center">
      <h1 className="text-4xl font-extrabold text-black">
        <span className="drop-shadow-lg">Welcome to Family Cookbook!</span>
      </h1>
      <label htmlFor="Category" className="flex mr-2 font-semibold">
        Select all Categories:
      </label>
      {categories.map((category) => (
        <div
          onClick={() => handleCategorySelection(category)}
          key={category.id}
          className={`mb-10 h-32 w-32 cursor-pointer text-center ${
            recipeContext?.foodTypes.includes(category.name)
              ? 'text-recipecentral'
              : ''
          }`}
        >
          {recipeContext?.foodTypes.includes(category.name) ? (
            <LogoSvg className="fill-current h-full w-full" />
          ) : (
            <CookingSVG className="fill-current h-full w-full" />
          )}
          {category.name}
        </div>
      ))}
    </div>
  );
}

export default CategorySelector;
