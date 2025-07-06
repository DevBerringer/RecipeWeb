import { Link } from 'react-router-dom';
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
  const [currentStep, setCurrentStep] = useState(0);
  const [categories, setCategories] = useState<CategoriesData | null>(null);
  const { recipeDraft, setRecipeDraft } = useRecipeDraft();

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
          className="max-w-full rounded-lg border-gray-300 bg-transparent px-4 py-2 text-center text-6xl"
        />
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
            to="/newRecipe/Preview"
            className="rounded-xl border border-stone-300 bg-white px-6 py-3 text-xl font-semibold text-stone-600 shadow-inner transition-colors duration-200 hover:bg-recipecentral-light focus:outline-none"
          >
            <span className="text-xl text-gray-800">👀 Preview Recipe</span>
          </Link>
        )}
      </div>
    </div>
  );
}

export default NewRecipe;
