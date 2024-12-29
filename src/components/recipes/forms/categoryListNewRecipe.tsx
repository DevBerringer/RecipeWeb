import { useContext, useEffect, useState } from 'react';
import { Foods, Meals, Regions } from '../../..';
import CategoryCard from '../categories/CategoryCard';

interface CategoriesListProps {
  categoryList: Regions[] | Meals[] | Foods[] | undefined;
}

function CategoriesListNewRecipe({ categoryList }: CategoriesListProps) {
  const [coloredCategories, setColoredCategories] = useState<Set<string>>(
    new Set()
  );

  // Function to toggle colored state for a category
  const handleCategoryClick = (id: string) => {
    const updatedColoredCategories = new Set(coloredCategories);
    if (coloredCategories.has(id)) {
      updatedColoredCategories.delete(id);
    } else {
      updatedColoredCategories.add(id);
    }
    setColoredCategories(updatedColoredCategories);
  };

  return (
    <div className="flex flex-wrap justify-center">
      {categoryList && categoryList.length > 0 ? (
        categoryList.map((item) => (
          <div
            key={item.id}
            className={`m-2 h-[120px] w-[120px] cursor-pointer rounded-xl ${
              coloredCategories.has(item.id) ? 'bg-recipecentral' : ''
            }`}
            onClick={() => handleCategoryClick(item.id)}
          >
            <CategoryCard imgPath={item.imgPath} name={item.name} />
          </div>
        ))
      ) : (
        <div className="my-4 flex items-center justify-center">
          <div className="max-w-lg rounded border border-gray-300 bg-gray-100 p-4 text-center text-lg text-gray-500">
            No Categories found
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoriesListNewRecipe;
