/* eslint-disable react/no-array-index-key */
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Lottie from 'lottie-react';
import { useCategories } from '../../../contexts/CategoriesContext';
import RecipeTag from './componenets/RecipeTag';
import { getRecipeById } from '../../../api/api';
import loadingAnimation from '../../../assets/cookingPotAnimation.json';

function RecipePage() {
  const { categories, loading: categoriesLoading } = useCategories();
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null);
  const [loadingRecipe, setLoadingRecipe] = useState(true);
  const { id: recipeId } = useParams();

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoadingRecipe(true);
      try {
        const data = await getRecipeById(recipeId);
        setCurrentRecipe(data);
      } catch (error) {
        console.error('Failed to fetch recipe:', error);
        setCurrentRecipe(null);
      } finally {
        setLoadingRecipe(false);
      }
    };

    if (recipeId) {
      fetchRecipe();
    }
  }, [recipeId]);

  if (categoriesLoading || loadingRecipe) {
    return (
      <div className="flex flex-col items-center justify-center pt-20">
        <Lottie
          className="max-h-[300px] max-w-[300px]"
          animationData={loadingAnimation}
        />
        <p className="mt-4 text-xl text-gray-600">Loading recipe details...</p>
      </div>
    );
  }

  if (!categories) {
    return <div className="p-8 text-center text-xl">No categories found.</div>;
  }

  if (!currentRecipe) {
    return <div className="p-8 text-center text-xl">Recipe not found.</div>;
  }

  // Map tags from recipe categories
  const tagSections = [
    {
      title: '🍽️ Cuisines',
      tags:
        currentRecipe.CuisineTypes?.map(
          (id) =>
            categories.RegionCategories.find((c) => c.id === id)?.name || id
        ) || [],
      baseColor: 'bg-amber-50 text-amber-800',
      borderColor: 'rgba(100, 70, 0, 0.2)',
      shadowColor: 'rgba(100, 70, 0, 0.08)',
    },
    {
      title: '🍱 Meal Types',
      tags:
        currentRecipe.MealTypes?.map(
          (id) => categories.MealCategories.find((m) => m.id === id)?.name || id
        ) || [],
      baseColor: 'bg-emerald-50 text-emerald-800',
      borderColor: 'rgba(0, 70, 0, 0.2)',
      shadowColor: 'rgba(0, 70, 0, 0.08)',
    },
    {
      title: '🍞 Food Types',
      tags: currentRecipe.FoodTypes.map(
        (id) => categories.FoodCategories.find((f) => f.id === id)?.name || id
      ),
      baseColor: 'bg-fuchsia-50 text-fuchsia-800',
      borderColor: 'rgba(70, 0, 70, 0.2)',
      shadowColor: 'rgba(70, 0, 70, 0.08)',
    },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-10 p-8">
      {/* Header */}
      <header className="flex flex-wrap items-center justify-between">
        <h1 className="text-5xl font-bold text-gray-900">
          {currentRecipe.Name}
        </h1>
        <p className="text-gray-500">
          Created: {new Date(currentRecipe.CreatedDate).toLocaleDateString()}
        </p>
      </header>

      {/* Featured Image */}
      {currentRecipe.Picture && (
        <div className="overflow-hidden rounded-xl shadow-lg">
          <img
            src={currentRecipe.Picture}
            alt="Recipe"
            className="h-[400px] w-full object-cover"
          />
        </div>
      )}

      {/* Quick Stats */}
      <section className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {[
          ['Prep Time', `${currentRecipe.PrepTimeMin} min`],
          ['Cook Time', `${currentRecipe.CookTimeMin} min`],
          ['Serves', currentRecipe.Serves || 'N/A'],
          ['Spicy', currentRecipe.IsSpicy ? '🔥' : '❄️'],
          ['Vegetarian', currentRecipe.IsVegetarian ? '🌱' : '🍖'],
        ].map(([label, value], idx) => (
          <div key={idx} className="rounded-lg bg-white p-4 text-center shadow">
            <div className="text-sm text-gray-500">{label}</div>
            <div className="text-2xl font-semibold">{value}</div>
          </div>
        ))}
      </section>

      {/* Tag Sections */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {tagSections
          .filter((section) => section.tags.length > 0)
          .map(({ title, tags, baseColor, borderColor, shadowColor }, idx) => (
            <div key={idx} className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
              <div className="flex flex-wrap gap-3">
                {tags.map((tag, tagIdx) => (
                  <RecipeTag
                    key={tagIdx}
                    label={tag}
                    idx={tagIdx}
                    baseColor={baseColor}
                    borderColor={borderColor}
                    shadowColor={shadowColor}
                  />
                ))}
              </div>
            </div>
          ))}
      </section>

      {/* Ingredients + Instructions */}
      <section className="grid grid-cols-1 gap-8 pt-2 md:grid-cols-2">
        {/* Ingredients */}
        <div className="space-y-4">
          <h2 className="font-['Mynerve'] text-3xl font-semibold text-gray-800">
            📝 Ingredients
          </h2>
          <div className="space-y-2">
            {currentRecipe.Ingredients.map((ingredient, idx) => (
              <div
                key={idx}
                className="rounded border border-gray-200 bg-white p-3 text-lg shadow"
              >
                {ingredient}
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="space-y-4">
          <h2 className="font-['Mynerve'] text-3xl font-semibold text-gray-800">
            👩‍🍳 Instructions
          </h2>
          <ol className="list-decimal space-y-4 pl-5">
            {currentRecipe.Steps.map((step, idx) => (
              <li key={idx} className="text-lg text-gray-800">
                {step}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Comments */}
      {currentRecipe.Comments && currentRecipe.Comments.length > 0 && (
        <section className="pt-8">
          <h2 className="text-3xl font-semibold text-gray-800">💬 Comments</h2>
          <ul className="mt-4 space-y-2 pl-4">
            {currentRecipe.Comments.map((comment, idx) => (
              <li
                key={idx}
                className="rounded border border-gray-200 bg-gray-50 p-3"
              >
                {comment}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

export default RecipePage;
