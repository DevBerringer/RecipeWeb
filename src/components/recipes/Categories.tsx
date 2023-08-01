import React, { useEffect, useState } from 'react';
import { getCategories } from '../../api/api';
import { CategoriesData } from '../..';
import CategoriesList from '../shared/CategoriesList';

function Categories() {
  const [categories, setCategories] = useState<CategoriesData | null>(null);

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

  return (
    <div>
      <h1 className="py-4 text-4xl font-extrabold text-black">
        <span className="drop-shadow-lg">Cuisine</span>
      </h1>
      <div className="flex">
        <div className="mx-auto flex max-w-2xl flex-wrap justify-center">
          {categories &&
            categories.RegionCategories.map((region) => (
              <button
                type="button"
                key={region.name}
                className="m-2 rounded-lg border px-4 py-2 text-lg hover:bg-recipecentral"
                style={{ width: '125px' }} // Adjust the width as needed
                onClick={() => {
                  // Handle button click here, if needed
                  // You can access the selected regionName using the regionName variable
                  console.log('Selected region:', region.name);
                }}
              >
                {region.name}
              </button>
            ))}
          {/* Hide the world map under 1100px width screens */}
        </div>
        <div className="hidden md:flex md:w-full">
          <img
            className="mx-auto opacity-70"
            src="public\assets\categories\worldMap.png"
            alt="world map"
          />
        </div>
      </div>
      <h1 className="py-4 text-4xl font-extrabold text-black">
        <span className="drop-shadow-lg">Meal Type</span>
      </h1>
      <CategoriesList categoryList={categories?.MealCategories} />
      <h1 className="py-4 text-4xl font-extrabold text-black">
        <span className="drop-shadow-lg">Food Type</span>
      </h1>
      <CategoriesList categoryList={categories?.FoodCategories} />
    </div>
  );
}

export default Categories;
