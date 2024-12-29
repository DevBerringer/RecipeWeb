import React, { useContext, useEffect, useState } from 'react';

import { RecipesContext } from '../../../contexts/recipesContext';
import { CategoriesData } from '../../..';
import { getCategories } from '../../../api/api';
import CategoriesListNewRecipe from './categoryListNewRecipe';

function CategorySelector() {
  const recipeContext = useContext(RecipesContext);
  const [categories, setCategories] = useState<CategoriesData | null>(null);
  const [isClicked, setIsClicked] = useState({});

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

  const fetchCategories = async () => {
    try {
      const data: CategoriesData = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleRegionClick = (regionName) => {
    setIsClicked((prevClicked) => ({
      ...prevClicked,
      [regionName]: !prevClicked[regionName],
    }));
  };

  return (
    <div className="mx-auto text-center">
      <label htmlFor="Category" className="mr-2 text-2xl font-semibold">
        Select all Relevant Categories:
      </label>
      <h1 className="py-4 text-2xl font-extrabold text-black">
        <span className="drop-shadow-lg">Cuisine</span>
      </h1>
      <div className="flex">
        <div className="mx-auto max-w-6xl justify-center">
          {categories &&
            categories.RegionCategories.map((region) => (
              <button
                type="button"
                key={region.name}
                className={`m-2 h-15 w-36 rounded-lg border px-4 py-2 text-lg hover:bg-recipecentral-light ${
                  isClicked[region.name] ? 'bg-recipecentral underline' : ''
                }`}
                onClick={() => {
                  handleRegionClick(region.name);
                }}
              >
                {region.name}
              </button>
            ))}
        </div>
      </div>
      <h1 className="py-4 text-2xl font-extrabold text-black">
        <span className="drop-shadow-lg">Meal Type</span>
      </h1>
      <CategoriesListNewRecipe categoryList={categories?.MealCategories} />
      <h1 className="py-4 text-2xl font-extrabold text-black">
        <span className="drop-shadow-lg">Food Type</span>
      </h1>
      <CategoriesListNewRecipe categoryList={categories?.FoodCategories} />
    </div>
  );
}

export default CategorySelector;
