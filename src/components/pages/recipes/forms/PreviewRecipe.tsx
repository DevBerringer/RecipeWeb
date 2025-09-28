import { useNavigate } from 'react-router-dom';
import { useRecipeDraft } from '../../../../contexts/RecipeDraftContext';
import { UseAuth } from '../../../../contexts/authContext';
import { useCategories } from '../../../../contexts/CategoriesContext';
import { addRecipe, uploadRecipeImage } from '../../../../api/api';

// Import new components
import DraftControls from './components/DraftControls';
import RecipeHeader from './components/RecipeHeader';
import RecipeStats from './components/RecipeStats';
import RecipeTags from './components/RecipeTags';
import RecipeDescription from './components/RecipeDescription';
import RecipeIngredients from './components/RecipeIngredients';
import RecipeInstructions from './components/RecipeInstructions';
import CategorySelectors from './components/CategorySelectors';
import { ValidationProvider, useValidation } from './contexts/ValidationContext';
import { RecipeFormData } from './utils/validation';

function PreviewRecipePageContent() {
  const { recipeDraft } = useRecipeDraft();
  const { user } = UseAuth();
  const { categories, loading } = useCategories();
  const { validateAll, errors } = useValidation();
  const navigate = useNavigate();

  if (loading) return <div className="p-8 text-center text-xl">Loading...</div>;
  if (!categories)
    return <div className="p-8 text-center text-xl">No categories found.</div>;

  const handleSubmit = async () => {
    // Convert recipe draft to validation format
    const recipeData: RecipeFormData = {
      name: recipeDraft.name,
      description: recipeDraft.description,
      prepTimeMin: recipeDraft.prepTimeMin,
      cookTimeMin: recipeDraft.cookTimeMin,
      serves: recipeDraft.serves,
      ingredients: recipeDraft.ingredients,
      steps: recipeDraft.steps,
      cuisineTypes: recipeDraft.cuisineTypes,
      mealTypes: recipeDraft.mealTypes,
      foodTypes: recipeDraft.foodTypes,
      selectedImage: recipeDraft.selectedImage || '',
    };

    // Validate all fields
    const isValid = validateAll(recipeData);
    
    if (!isValid) {
      alert('Please fix all validation errors before submitting the recipe.');
      return;
    }

    try {
      const imageUrl = await uploadRecipeImage(recipeDraft.imageFile);
      const newRecipe = {
        Id: null,
        Name: recipeDraft.name,
        FoodTypes: recipeDraft.foodTypes,
        MealTypes: recipeDraft.mealTypes,
        CuisineTypes: recipeDraft.cuisineTypes,
        IsVegetarian: !!recipeDraft.isVegetarian,
        SpicyLevel: !!recipeDraft.isSpicy,
        CookTimeMin: recipeDraft.cookTimeMin,
        PrepTimeMin: recipeDraft.prepTimeMin,
        Serves: recipeDraft.serves,
        Description: recipeDraft.description,
        Ingredients: recipeDraft.ingredients.filter((i) => i.trim()),
        Steps: recipeDraft.steps.filter((s) => s.trim()),
        SelectedImage: imageUrl,
        Rating: [],
        CreatedBy: user ? user.Id : undefined,
      };

      const result = await addRecipe(newRecipe);
      console.log('Recipe submitted successfully:', result);

      navigate('/recipes');
    } catch (error) {
      console.error('Failed to submit recipe:', error);
      alert('Failed to submit recipe. Please try again.');
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Editing Sidebar */}
      <div className="w-full md:w-80 bg-stone-50 border-r border-stone-200 p-4 md:p-6 overflow-y-auto max-h-96 md:max-h-none">
        <CategorySelectors />
      </div>

      {/* Main Recipe Content */}
      <div className="flex-1 mx-auto max-w-7xl space-y-6 md:space-y-10 p-4 md:p-8">
        <DraftControls />
        <RecipeHeader />
        <RecipeStats />
        <RecipeTags />
        <RecipeDescription />
        
        {/* Ingredients + Instructions */}
        <section className="grid grid-cols-1 gap-6 md:gap-8 pt-2 md:grid-cols-2">
          <RecipeIngredients />
          <RecipeInstructions />
        </section>

        <div className="flex justify-center gap-4 md:gap-6 pt-6 md:pt-8">
          <button
            type="button"
            onClick={handleSubmit}
            className={`handWritten rounded-xl border-2 border-dashed px-6 py-3 md:px-8 md:py-4 text-lg md:text-2xl font-semibold shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 ${
              errors.length > 0
                ? 'border-red-500 bg-red-50/60 text-red-800 hover:bg-red-100/60 focus:ring-red-500/30'
                : 'border-amber-900/30 bg-amber-50/60 text-amber-800 hover:bg-amber-100/60 focus:ring-amber-700/30'
            }`}
          >
            📤 Submit Recipe {errors.length > 0 && `(${errors.length} errors)`}
          </button>
        </div>
      </div>
    </div>
  );
}

function PreviewRecipePage() {
  return (
    <ValidationProvider>
      <PreviewRecipePageContent />
    </ValidationProvider>
  );
}

export default PreviewRecipePage;
