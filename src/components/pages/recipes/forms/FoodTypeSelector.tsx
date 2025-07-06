import { useState, useEffect } from 'react';
import CategoryCard from '../componenets/CategoryCard';
import { useRecipeDraft } from '../../../../contexts/RecipeDraftContext';
import { Category } from '../../../../contexts/CategoriesContext';

type FoodTypeSelectorProps = {
  foodCategories: Category[];
};

function FoodTypeSelector({ foodCategories }: FoodTypeSelectorProps) {
  const { recipeDraft, setRecipeDraft } = useRecipeDraft();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [loadedImages, setLoadedImages] = useState(new Set<string>());

  useEffect(() => {
    setSelectedCategories(recipeDraft.foodTypes);
  }, [recipeDraft.foodTypes]);

  const handleCategorySelect = (categoryId: string) => {
    const updatedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];

    setSelectedCategories(updatedCategories);

    setRecipeDraft({
      ...recipeDraft,
      foodTypes: updatedCategories,
    });
  };

  const filteredCategories =
    recipeDraft.isVegetarian === null
      ? []
      : foodCategories.filter((category) => {
          if (recipeDraft.isVegetarian) {
            return category.name !== 'Meat' && category.name !== 'Seafood';
          }
          return true;
        });

  const handleImageLoad = (categoryId: string) => {
    setLoadedImages((prev) => new Set(prev).add(categoryId));
  };

  const toggleIsVegetarian = (value: boolean) => {
    setRecipeDraft({ ...recipeDraft, isVegetarian: value });
  };

  const toggleIsSpicy = (value: boolean) => {
    setRecipeDraft({ ...recipeDraft, isSpicy: value });
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center">
        {/* Vegetarian + Spicy Selectors */}
        <div className="mb-12 grid grid-cols-2 gap-16">
          <div>
            <h2 className="mb-6 text-4xl font-semibold text-gray-800">
              Is this Vegetarian?
            </h2>
            <div className="flex gap-4">
              <button
                className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl p-4 shadow-lg ${
                  recipeDraft.isVegetarian === true
                    ? 'bg-recipecentral'
                    : 'bg-recipecentral-light'
                } transform transition-all hover:scale-105 hover:shadow-xl`}
                onClick={() => toggleIsVegetarian(true)}
              >
                <span className="text-xl text-gray-800">🌱 Vegetarian</span>
              </button>
              <button
                className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl p-4 shadow-lg ${
                  recipeDraft.isVegetarian === false
                    ? 'bg-recipecentral'
                    : 'bg-recipecentral-light'
                } transform transition-all hover:scale-105 hover:shadow-xl`}
                onClick={() => toggleIsVegetarian(false)}
              >
                <span className="text-xl text-gray-800">🍖 Non-Vegetarian</span>
              </button>
            </div>
          </div>

          <div>
            <h2 className="mb-6 text-4xl font-semibold text-gray-800">
              Is this Spicy?
            </h2>
            <div className="flex gap-4">
              <button
                className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl p-4 shadow-lg ${
                  recipeDraft.isSpicy === true
                    ? 'bg-recipecentral'
                    : 'bg-recipecentral-light'
                } transform transition-all hover:scale-105 hover:shadow-xl`}
                onClick={() => toggleIsSpicy(true)}
              >
                <span className="text-xl text-gray-800">🔥 Spicy</span>
              </button>
              <button
                className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl p-4 shadow-lg ${
                  recipeDraft.isSpicy === false
                    ? 'bg-recipecentral'
                    : 'bg-recipecentral-light'
                } transform transition-all hover:scale-105 hover:shadow-xl`}
                onClick={() => toggleIsSpicy(false)}
              >
                <span className="text-xl text-gray-800">❄️ Not Spicy</span>
              </button>
            </div>
          </div>
        </div>

        {/* Food Type Selector */}
        {recipeDraft.isVegetarian !== null && loadedImages !== null && (
          <>
            <h2 className="mb-8 text-4xl font-semibold text-gray-800">
              Select Food Types
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
              {filteredCategories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  selectedCategories={selectedCategories}
                  handleCategorySelect={handleCategorySelect}
                  handleImageLoad={handleImageLoad}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default FoodTypeSelector;
