import { useState, useEffect } from 'react';
import CategoryCard from './CategoryCard';
import { useRecipeDraft } from '../../../../contexts/RecipeDraftContext';
import { Category } from '../../../../contexts/CategoriesContext'; // 👈 import your Category type

type MealSelectorProps = {
  mealCategories: Category[];
  onSelectMealType: (category: string) => void;
};

function MealSelector({ mealCategories, onSelectMealType }: MealSelectorProps) {
  const { recipeDraft, setRecipeDraft } = useRecipeDraft();
  const [selectedCategories, setSelectedMeals] = useState<string[]>([]);
  const [loadedImages, setLoadedImages] = useState(new Set<string>());

  const order = [
    'Breakfast',
    'Lunch',
    'Dinner',
    'Appetizer',
    'Dessert',
    'Snack',
    'Drink',
  ];

  useEffect(() => {
    setSelectedMeals(recipeDraft.mealTypes);
  }, [recipeDraft.mealTypes]);

  const sortedCategories = [...mealCategories].sort(
    (a, b) => order.indexOf(a.name) - order.indexOf(b.name)
  );

  const handleCategorySelect = (categoryId: string) => {
    const updatedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];

    setSelectedMeals(updatedCategories);

    setRecipeDraft({
      ...recipeDraft,
      mealTypes: updatedCategories,
    });

    if (!recipeDraft.mealTypes.includes(categoryId)) {
      onSelectMealType(categoryId);
    }
  };

  const handleImageLoad = (categoryId: string) => {
    setLoadedImages((prev) => new Set(prev).add(categoryId));
  };

  return (
    <div className="flex justify-center">
      <div className="handWritten flex w-2/3 flex-col items-center">
        <h2 className="mb-8 text-4xl font-semibold text-gray-800">
          Select All Meal Types That Apply
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {sortedCategories.map((category) => (
            <CategoryCard
              key={category.id} // 👈 use category.id as key to avoid warnings
              category={category}
              selectedCategories={selectedCategories}
              handleCategorySelect={handleCategorySelect}
              handleImageLoad={handleImageLoad}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MealSelector;
