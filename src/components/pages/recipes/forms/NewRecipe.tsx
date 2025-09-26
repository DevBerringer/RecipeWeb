import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCategories } from '../../../../api/api';
import NewRecipeForm from './NewRecipeForm';
import MealSelector from './MealSelector';
import CuisineSelector from './CuisineSelector';
import {
  CategoriesData,
  Category,
  Foods,
  Meals,
} from '../../../../contexts/CategoriesContext';
import FoodTypeSelector from './FoodTypeSelector';
import { useRecipeDraft } from '../../../../contexts/RecipeDraftContext';

function NewRecipe() {
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const [categories, setCategories] = useState<CategoriesData | null>(null);
  const { recipeDraft, setRecipeDraft, clearDraft } = useRecipeDraft();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data: CategoriesData = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
    window.scrollTo(0, 0);
  }, []);

  // If user arrived fresh (not from preview), do not auto-load last draft unless name is set or there is explicit state
  useEffect(() => {
    const fromPreview = (location.state as any)?.fromPreview;
    if (!fromPreview) {
      const hasContent =
        !!(recipeDraft.name ||
        recipeDraft.description ||
        recipeDraft.cuisineTypes.length ||
        recipeDraft.mealTypes.length ||
        recipeDraft.foodTypes.length ||
        recipeDraft.ingredients.some((i) => i.trim()) ||
        recipeDraft.steps.some((s) => s.trim()));
      if (hasContent) {
        // Start fresh on direct visits
        clearDraft();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep((prevStep) => prevStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const renderStepComponent = () => {
    if (!categories) {
      return <div className="text-center text-xl">Loading categories...</div>;
    }

    const mealCategoriesForSelector: Category[] = categories.MealCategories.map(
      (meal: Meals) => ({
        id: meal.id,
        name: meal.name,
        imagePath: meal.imagePath,
      })
    );

    const foodCategoriesForSelector: Category[] = categories.FoodCategories.map(
      (food: Foods) => ({
        id: food.id,
        name: food.name,
        imagePath: food.imagePath,
      })
    );

    const stepsComponents = [
      <CuisineSelector key="cuisineSelector" />,
      <MealSelector
        key="mealSelector"
        mealCategories={mealCategoriesForSelector}
      />,
      <FoodTypeSelector
        key="foodTypeSelector"
        foodCategories={foodCategoriesForSelector}
      />,
      <NewRecipeForm key="newRecipeForm" />,
    ];

    return stepsComponents[currentStep];
  };

  return (
    <div className="container p-4">
      <div className="mb-4 flex flex-col items-center">
        <input
          type="text"
          id="name"
          placeholder="Enter Recipe Name"
          value={recipeDraft.name}
          onChange={(e) =>
            setRecipeDraft({ ...recipeDraft, name: e.target.value })
          }
          className="handWritten max-w-full rounded-2xl border-2 border-dashed border-amber-900/30 bg-amber-50/60 px-4 py-3 text-center text-6xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-700/30"
        />
      </div>

      {/* Back to Preview Link */}
      <div className="flex justify-center mb-6">
        <Link
          to="/newRecipe"
          className="handWritten rounded-xl border-2 border-dashed border-amber-900/30 bg-amber-50/60 px-6 py-3 text-xl font-semibold text-amber-800 shadow-sm transition-colors duration-200 hover:bg-amber-100/60 focus:outline-none focus:ring-2 focus:ring-amber-700/30"
        >
          👀 Back to Preview & Edit
        </Link>
      </div>

      <div className="mt-10">{renderStepComponent()}</div>

      <div className="mt-12 flex justify-center gap-8">
        {currentStep > 0 && (
          <button
            type="button"
            onClick={handlePreviousStep}
            className="0 rounded-xl border border-stone-300 bg-white px-6 py-3 text-xl font-semibold text-stone-600 shadow-inner transition-colors duration-200 hover:bg-recipecentral-light focus:outline-none"
          >
            ← Previous
          </button>
        )}

        {currentStep < 3 ? (
          <button
            onClick={handleNextStep}
            type="button"
            className="rounded-xl border bg-white px-6 py-3 text-xl font-semibold text-stone-600 shadow-inner transition-colors duration-200 hover:bg-recipecentral-light focus:outline-none"
          >
            Next →
          </button>
        ) : (
          <Link
            to="/newRecipe"
            className="handWritten rounded-xl border-2 border-dashed border-amber-900/30 bg-amber-50/60 px-6 py-3 text-xl font-semibold text-amber-800 shadow-sm transition-colors duration-200 hover:bg-amber-100/60 focus:outline-none focus:ring-2 focus:ring-amber-700/30"
          >
            👀 Back to Preview & Edit
          </Link>
        )}
      </div>
    </div>
  );
}

export default NewRecipe;
