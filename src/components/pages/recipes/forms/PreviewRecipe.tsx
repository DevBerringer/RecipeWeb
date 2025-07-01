import { useNavigate } from 'react-router-dom';
import { useRecipeDraft } from '../../../../contexts/RecipeDraftContext';
import { UseAuth } from '../../../../contexts/authContext';
import { useCategories } from '../../../../contexts/CategoriesContext';
import RecipeTag from '../componenets/RecipeTag';
import IngredientItem from '../componenets/IngredientItem';
import InstructionStep from '../componenets/InstructionStep';
import { addRecipe } from '../../../../api/api';

function PreviewRecipePage() {
  const { recipeDraft } = useRecipeDraft();
  const { user } = UseAuth();
  const { categories, loading } = useCategories(); // 👈 pulling categories + loading state
  const navigate = useNavigate();

  if (loading) return <div className="p-8 text-center text-xl">Loading...</div>;
  if (!categories)
    return <div className="p-8 text-center text-xl">No categories found.</div>;

  const tagSections = [
    {
      title: '🍽️ Cuisines',
      tags: recipeDraft.cuisineTypes.map(
        (id) => categories.RegionCategories.find((c) => c.id === id)?.name || id
      ),
      baseColor: 'bg-amber-50 text-amber-800',
      borderColor: 'rgba(100, 70, 0, 0.2)',
      shadowColor: 'rgba(100, 70, 0, 0.08)',
    },
    {
      title: '🍱 Meal Types',
      tags: recipeDraft.mealTypes.map(
        (id) => categories.MealCategories.find((m) => m.id === id)?.name || id
      ),
      baseColor: 'bg-emerald-50 text-emerald-800',
      borderColor: 'rgba(0, 70, 0, 0.2)',
      shadowColor: 'rgba(0, 70, 0, 0.08)',
    },
    {
      title: '🍞 Food Types',
      tags: recipeDraft.foodTypes.map(
        (id) => categories.FoodCategories.find((f) => f.id === id)?.name || id
      ),
      baseColor: 'bg-fuchsia-50 text-fuchsia-800',
      borderColor: 'rgba(70, 0, 70, 0.2)',
      shadowColor: 'rgba(70, 0, 70, 0.08)',
    },
  ];

  const handleSubmit = async () => {
    try {
      const newRecipe = {
        Id: null,
        Name: recipeDraft.name,
        Picture: recipeDraft.selectedImage || null,
        SpicyLevel: !!recipeDraft.isSpicy,
        Description: recipeDraft.description,
        CookTimeMin: recipeDraft.cookTimeMin,
        PrepTimeMin: recipeDraft.prepTimeMin,
        FoodTypes: recipeDraft.foodTypes,
        Ingredients: recipeDraft.ingredients.filter((i) => i.trim()),
        Steps: recipeDraft.steps.filter((s) => s.trim()),
        Rating: [], // or null if your API accepts null
        CreatedBy: user ? user.Id : undefined,
      };

      const result = await addRecipe(newRecipe);
      console.log('Recipe submitted successfully:', result);

      navigate('/recipes'); // or wherever you want to go after submit
    } catch (error) {
      console.error('Failed to submit recipe:', error);
    }
  };

  const handleBack = () => {
    navigate('/newRecipe');
  };

  function getSpicyLabel(isSpicy: boolean | null): string {
    if (isSpicy === null) return 'N/A';
    return isSpicy ? '🔥' : '❄️';
  }

  function getVegetarianLabel(isVegetarian: boolean | null): string {
    if (isVegetarian === null) return 'N/A';
    return isVegetarian ? '🌱' : '🍖';
  }

  return (
    <div className="mx-auto max-w-7xl space-y-10 p-8">
      {/* Header */}
      <header className="flex flex-wrap items-center justify-between">
        <h1 className="text-5xl font-bold text-gray-900">
          {recipeDraft.name || 'Untitled Recipe'}
        </h1>
        <div className="flex flex-col items-center">
          {user?.ImagePath ? (
            <img
              src={user.ImagePath}
              alt={`${user.Username}'s profile`}
              className="h-36 w-48 rounded-2xl object-cover shadow-lg"
            />
          ) : (
            <div className="h-36 w-48 rounded-2xl bg-gray-300 shadow-lg" />
          )}
          <div className="mt-2 text-lg font-semibold">
            {user?.Username || 'Guest'}
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {recipeDraft.selectedImage && (
        <div className="overflow-hidden rounded-xl shadow-lg">
          <img
            src={recipeDraft.selectedImage}
            alt="Recipe preview"
            className="h-[400px] w-full object-cover"
          />
        </div>
      )}

      {/* Quick Stats */}
      <section className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {[
          ['Prep Time', `${recipeDraft.prepTimeMin} min`],
          ['Cook Time', `${recipeDraft.cookTimeMin} min`],
          ['Serves', recipeDraft.serves],
          ['Spicy', getSpicyLabel(recipeDraft.isSpicy)],
          ['Vegetarian', getVegetarianLabel(recipeDraft.isVegetarian)],
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
        <div className="space-y-4">
          <h2 className="font-['Mynerve'] text-3xl font-semibold text-gray-800">
            📝 Ingredients
          </h2>
          <div className="space-y-2">
            {recipeDraft.ingredients
              .filter((i) => i.trim())
              .map((ingredient, idx) => (
                <IngredientItem key={idx} ingredient={ingredient} idx={idx} />
              ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="font-['Mynerve'] text-3xl font-semibold text-gray-800">
            👩‍🍳 Instructions
          </h2>
          <ol className="list-none space-y-8 pl-0">
            {recipeDraft.steps
              .filter((s) => s.trim())
              .map((step, idx) => (
                <InstructionStep key={idx} step={step} idx={idx} />
              ))}
          </ol>
        </div>
      </section>

      <div className="flex justify-center gap-6 pt-8">
        <button
          type="button"
          onClick={handleBack}
          className="rounded-xl border border-stone-300 bg-white px-6 py-3 text-xl font-semibold text-stone-600 shadow-inner transition-colors duration-200 hover:bg-stone-200 focus:outline-none focus:ring-4 focus:ring-stone-300"
        >
          ← Previous
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          className="rounded-xl bg-stone-200 px-6 py-3 text-xl font-semibold text-stone-800 shadow-inner transition-colors duration-200 hover:bg-lime-600 focus:outline-none"
        >
          📤 Submit Recipe
        </button>
      </div>
    </div>
  );
}

export default PreviewRecipePage;
