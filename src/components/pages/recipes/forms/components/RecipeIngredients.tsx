import { useRecipeDraft } from '../../../../../contexts/RecipeDraftContext';
import { useValidation } from '../contexts/ValidationContext';

export default function RecipeIngredients() {
  const { recipeDraft, setRecipeDraft } = useRecipeDraft();
  const { getFieldError, clearFieldError } = useValidation();

  const handleIngredientChange = (idx: number, value: string) => {
    const newIngredients = [...recipeDraft.ingredients];
    newIngredients[idx] = value;
    setRecipeDraft({ ...recipeDraft, ingredients: newIngredients });
    
    // Clear validation error when user starts typing
    if (value.trim().length > 0) {
      clearFieldError('ingredients');
    }
  };

  const handleAddIngredient = () => {
    setRecipeDraft({ 
      ...recipeDraft, 
      ingredients: [...recipeDraft.ingredients, ''] 
    });
  };

  const handleRemoveIngredient = (idx: number) => {
    const newIngredients = recipeDraft.ingredients.filter((_, i) => i !== idx);
    setRecipeDraft({ ...recipeDraft, ingredients: newIngredients });
    
    // Validate ingredients after removal
    const validIngredients = newIngredients.filter(ingredient => ingredient.trim().length > 0);
    if (validIngredients.length > 0) {
      clearFieldError('ingredients');
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="font-['Mynerve'] text-2xl md:text-3xl font-semibold text-gray-800">
        📝 Ingredients
      </h2>
      <div className="space-y-2">
        {recipeDraft.ingredients
          .map((ingredient, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(idx, e.target.value)}
                className="handWritten flex-1 rounded-lg border border-recipecentral bg-amber-50 px-3 py-2 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-700/30"
                placeholder="Enter ingredient..."
              />
              <button
                type="button"
                onClick={() => handleRemoveIngredient(idx)}
                className="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </div>
          ))}
        <button
          type="button"
          onClick={handleAddIngredient}
          className="handWritten rounded-lg border-2 border-dashed border-recipecentral bg-amber-50 px-4 py-2 text-lg text-amber-700 hover:bg-amber-100 transition-colors"
        >
          + Add Ingredient
        </button>
        {getFieldError('ingredients') && (
          <p className="text-sm text-red-600 mt-2">{getFieldError('ingredients')}</p>
        )}
      </div>
    </div>
  );
}
