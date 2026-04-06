import { useRecipeDraft } from '../../../../../contexts/RecipeDraftContext';
import { useCategories } from '../../../../../contexts/CategoriesContext';
import { useValidation } from '../contexts/ValidationContext';

export default function CategorySelectors() {
  const { recipeDraft, setRecipeDraft } = useRecipeDraft();
  const { categories } = useCategories();
  const { getFieldError, hasFieldError, clearFieldError } = useValidation();

  if (!categories) return null;

  const handleCategoryToggle = (type: 'cuisineTypes' | 'mealTypes' | 'foodTypes', categoryId: string) => {
    const currentTypes = recipeDraft[type];
    const newTypes = currentTypes.includes(categoryId)
      ? currentTypes.filter(id => id !== categoryId)
      : [...currentTypes, categoryId];
    
    setRecipeDraft({ ...recipeDraft, [type]: newTypes });
    
    // Clear validation error when user selects a category
    if (newTypes.length > 0) {
      clearFieldError(type);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="handWritten text-2xl font-bold text-gray-800 mb-6">✏️ Edit Recipe</h2>
      
      {/* Category Selectors */}
      <div className="space-y-6">
        <div className={`rounded-2xl border-2 border-dashed p-4 ${
          hasFieldError('cuisineTypes') 
            ? 'border-red-500 bg-red-50' 
            : 'border-amber-900/30 bg-recipecentral-light'
        }`}>
          <h3 className="handWritten mb-4 text-xl font-semibold text-gray-800">🍽️ Cuisines</h3>
          <div className="flex flex-wrap gap-2">
            {categories?.RegionCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => handleCategoryToggle('cuisineTypes', category.id)}
                className={`handWritten rounded-full border border-dashed px-3 py-2 text-sm transition-colors ${
                  recipeDraft.cuisineTypes.includes(category.id)
                    ? 'border-amber-700 bg-recipecentral text-amber-800'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          {getFieldError('cuisineTypes') && (
            <p className="text-sm text-red-600 mt-2">{getFieldError('cuisineTypes')}</p>
          )}
        </div>

        <div className={`rounded-2xl border-2 border-dashed p-4 ${
          hasFieldError('mealTypes') 
            ? 'border-red-500 bg-red-50' 
            : 'border-emerald-900/30 bg-recipecentral-light'
        }`}>
          <h3 className="handWritten mb-4 text-xl font-semibold text-gray-800">🍱 Meal Types</h3>
          <div className="flex flex-wrap gap-2">
            {categories?.MealCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => handleCategoryToggle('mealTypes', category.id)}
                className={`handWritten rounded-full border border-dashed px-3 py-2 text-sm transition-colors ${
                  recipeDraft.mealTypes.includes(category.id)
                    ? 'border-amber-700 bg-recipecentral text-amber-700'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          {getFieldError('mealTypes') && (
            <p className="text-sm text-red-600 mt-2">{getFieldError('mealTypes')}</p>
          )}
        </div>

        <div className={`rounded-2xl border-2 border-dashed p-4 ${
          hasFieldError('foodTypes') 
            ? 'border-red-500 bg-red-50' 
            : 'border-fuchsia-900/30 bg-recipecentral-light'
        }`}>
          <h3 className="handWritten mb-4 text-xl font-semibold text-gray-800">🍞 Food Types</h3>
          <div className="flex flex-wrap gap-2">
            {categories?.FoodCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => handleCategoryToggle('foodTypes', category.id)}
                className={`handWritten rounded-full border border-dashed px-3 py-2 text-sm transition-colors ${
                  recipeDraft.foodTypes.includes(category.id)
                    ? 'border-amber-700 bg-recipecentral text-amber-700'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          {getFieldError('foodTypes') && (
            <p className="text-sm text-red-600 mt-2">{getFieldError('foodTypes')}</p>
          )}
        </div>
      </div>
    </div>
  );
}
