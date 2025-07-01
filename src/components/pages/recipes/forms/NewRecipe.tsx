import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCategories } from '../../../../api/api';
import NewRecipeForm from './NewRecipeForm';
import MealSelector from './MealSelector';
import CuisineSelector from './CuisineSelector';
import { CategoriesData } from '../../../..';
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
    if (currentStep < stepsComponents.length - 1) {
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

  const logInfo = () => {
    console.log(recipeDraft);
  };

  const stepsComponents = [
    <CuisineSelector key="cuisineSelector" onSelectCuisine={logInfo} />,
    <MealSelector
      key="mealSelector"
      mealCategories={categories?.MealCategories || []}
      onSelectMealType={logInfo}
    />,
    <FoodTypeSelector
      key="foodTypeSelector"
      foodCategories={categories?.FoodCategories || []}
      onFoodTypeSelect={logInfo}
    />,
    <NewRecipeForm key="newRecipeForm" />,
  ];

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

      <div className="mt-10">{stepsComponents[currentStep]}</div>

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

        {currentStep < stepsComponents.length - 1 ? (
          <button
            onClick={handleNextStep}
            type="button"
            className="rounded-xl border  bg-white px-6 py-3 text-xl font-semibold text-stone-600 shadow-inner transition-colors duration-200 hover:bg-recipecentral-light focus:outline-none"
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
