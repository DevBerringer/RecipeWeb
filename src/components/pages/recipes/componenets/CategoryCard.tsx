import { useState, useEffect } from 'react';
import { Category } from '../../../../contexts/CategoriesContext';

type CategoryCardProps = {
  category: Category;
  selectedCategories: string[];
  handleCategorySelect: (categoryId: string) => void;
  handleImageLoad: (categoryId: string) => void;
};

function CategoryCard({
  category,
  selectedCategories,
  handleCategorySelect,
  handleImageLoad,
}: CategoryCardProps) {
  const [loadedImage, setLoadedImage] = useState(false);

  useEffect(() => {
    setLoadedImage(false);
  }, [category.id]);

  return (
    <div
      onClick={() => handleCategorySelect(category.id)}
      className={`relative flex cursor-pointer flex-col items-center justify-center rounded-xl p-4 shadow-lg transition-transform hover:scale-105 hover:shadow-xl ${
        selectedCategories.includes(category.id)
          ? 'bg-recipecentral'
          : 'bg-recipecentral-light'
      }`}
    >
      <div className="relative mb-4 flex h-48 w-48 items-center justify-center overflow-hidden rounded-xl">
        {/* Image */}
        <img
          src={category.imgPath}
          alt={category.name}
          loading="lazy"
          onLoad={() => {
            setLoadedImage(true);
            handleImageLoad(category.id);
          }}
          className={`h-40 w-44 rounded-lg object-cover transition-opacity duration-500 ${
            loadedImage ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Skeleton Loader */}
        {!loadedImage && (
          <div className="absolute h-40 w-44 animate-pulse rounded-lg bg-gray-300" />
        )}
      </div>

      <h3 className="text-xl text-gray-800">{category.name}</h3>
    </div>
  );
}

export default CategoryCard;
