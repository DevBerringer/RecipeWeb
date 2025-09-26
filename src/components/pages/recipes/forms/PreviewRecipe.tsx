import { useNavigate, Link } from 'react-router-dom';
import { useRecipeDraft } from '../../../../contexts/RecipeDraftContext';
import { UseAuth } from '../../../../contexts/authContext';
import { useCategories } from '../../../../contexts/CategoriesContext';
import RecipeTag from '../componenets/RecipeTag';
import { addRecipe, uploadRecipeImage } from '../../../../api/api';

function PreviewRecipePage() {
  const { 
    recipeDraft, 
    setRecipeDraft, 
    clearDraft, 
    saveNamedDraft, 
    listDrafts, 
    loadDraft, 
    deleteDraft 
  } = useRecipeDraft();
  const { user } = UseAuth();
  const { categories, loading } = useCategories();
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
    const imageUrl = await uploadRecipeImage(recipeDraft.imageFile);
    try {
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

      navigate('/recipes'); // or wherever you want to go after submit
    } catch (error) {
      console.error('Failed to submit recipe:', error);
    }
  };

  const handleBack = () => {
    navigate('/newRecipe', { state: { fromPreview: true } });
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
    <div className="flex min-h-screen">
      {/* Editing Sidebar */}
      <div className="w-80 bg-stone-50 border-r border-stone-200 p-6 overflow-y-auto">
        <div className="space-y-6">
          <h2 className="handWritten text-2xl font-bold text-gray-800 mb-6">✏️ Edit Recipe</h2>
          
          {/* Category Selectors */}
          <div className="space-y-6">
            <div className="rounded-2xl border-2 border-dashed border-amber-900/30 bg-amber-50/60 p-4">
              <h3 className="handWritten mb-4 text-xl font-semibold text-gray-800">🍽️ Cuisines</h3>
              <div className="flex flex-wrap gap-2">
                {categories?.RegionCategories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => {
                      if (recipeDraft.cuisineTypes.includes(category.id)) {
                        setRecipeDraft({
                          ...recipeDraft,
                          cuisineTypes: recipeDraft.cuisineTypes.filter(id => id !== category.id)
                        });
                      } else {
                        setRecipeDraft({
                          ...recipeDraft,
                          cuisineTypes: [...recipeDraft.cuisineTypes, category.id]
                        });
                      }
                    }}
                    className={`handWritten rounded-full border border-dashed px-3 py-2 text-sm transition-colors ${
                      recipeDraft.cuisineTypes.includes(category.id)
                        ? 'border-amber-700 bg-amber-100 text-amber-800'
                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border-2 border-dashed border-emerald-900/30 bg-emerald-50/60 p-4">
              <h3 className="handWritten mb-4 text-xl font-semibold text-gray-800">🍱 Meal Types</h3>
              <div className="flex flex-wrap gap-2">
                {categories?.MealCategories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => {
                      if (recipeDraft.mealTypes.includes(category.id)) {
                        setRecipeDraft({
                          ...recipeDraft,
                          mealTypes: recipeDraft.mealTypes.filter(id => id !== category.id)
                        });
                      } else {
                        setRecipeDraft({
                          ...recipeDraft,
                          mealTypes: [...recipeDraft.mealTypes, category.id]
                        });
                      }
                    }}
                    className={`handWritten rounded-full border border-dashed px-3 py-2 text-sm transition-colors ${
                      recipeDraft.mealTypes.includes(category.id)
                        ? 'border-emerald-700 bg-emerald-100 text-emerald-800'
                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border-2 border-dashed border-fuchsia-900/30 bg-fuchsia-50/60 p-4">
              <h3 className="handWritten mb-4 text-xl font-semibold text-gray-800">🍞 Food Types</h3>
              <div className="flex flex-wrap gap-2">
                {categories?.FoodCategories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => {
                      if (recipeDraft.foodTypes.includes(category.id)) {
                        setRecipeDraft({
                          ...recipeDraft,
                          foodTypes: recipeDraft.foodTypes.filter(id => id !== category.id)
                        });
                      } else {
                        setRecipeDraft({
                          ...recipeDraft,
                          foodTypes: [...recipeDraft.foodTypes, category.id]
                        });
                      }
                    }}
                    className={`handWritten rounded-full border border-dashed px-3 py-2 text-sm transition-colors ${
                      recipeDraft.foodTypes.includes(category.id)
                        ? 'border-fuchsia-700 bg-fuchsia-100 text-fuchsia-800'
                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Recipe Content */}
      <div className="flex-1 mx-auto max-w-7xl space-y-10 p-8">

      {/* Draft controls */}
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              if (confirm('Start a new recipe? This will clear all fields.')) {
                clearDraft();
                navigate('/newRecipe');
              }
            }}
            className="rounded-xl border-2 border-dashed border-stone-400 bg-white/80 px-4 py-2 text-sm shadow-inner transition hover:bg-amber-50"
          >
            ✨ New Recipe
          </button>
          <button
            type="button"
            onClick={() => {
              const title = prompt('Save draft name?') || recipeDraft.name || 'Untitled Recipe';
              saveNamedDraft(title);
            }}
            className="rounded-xl border-2 border-dashed border-stone-400 bg-white/80 px-4 py-2 text-sm shadow-inner transition hover:bg-amber-50"
          >
            💾 Save Draft
          </button>
          <Link
            to="/newRecipe/forms"
            className="rounded-xl border-2 border-dashed border-stone-400 bg-white/80 px-4 py-2 text-sm shadow-inner transition hover:bg-amber-50"
          >
            ✏️ Edit Form
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <span className="handWritten text-base text-stone-700">Open Draft:</span>
          <select
            className="rounded-xl border-2 border-dashed border-stone-400 bg-white/80 px-3 py-2 text-sm shadow-inner"
            onChange={(e) => {
              const id = e.target.value;
              if (id) loadDraft(id);
            }}
            defaultValue=""
          >
            <option value="" disabled>
              Select draft
            </option>
            {listDrafts().map((d) => (
              <option key={d.id} value={d.id}>
                {d.title} — {new Date(d.updatedAt).toLocaleString()}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="rounded-xl border-2 border-dashed border-stone-400 bg-white/80 px-3 py-2 text-sm shadow-inner transition hover:bg-amber-50"
            onClick={() => {
              const drafts = listDrafts();
              const id = prompt('Enter draft ID to delete:\n' + drafts.map((d) => `${d.id}: ${d.title}`).join('\n'));
              if (id) deleteDraft(id);
            }}
          >
            🗑️ Delete Draft
          </button>
        </div>
      </div>

            {/* Recipe Name Input */}
            <div className="flex flex-col items-center">
        <input
          type="text"
          id="name"
          placeholder="Enter Recipe Name"
          value={recipeDraft.name}
          onChange={(e) =>
            setRecipeDraft({ ...recipeDraft, name: e.target.value })
          }
          className="handWritten max-w-full rounded-2xl border-2 border-dashed border-amber-900/30 bg-amber-50/60 px-4 py-3 text-center text-4xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-700/30"
        />
      </div>

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

      {/* Quick Stats - Editable */}
      <section className="grid grid-cols-2 gap-4 md:grid-cols-5">
        <div className="rounded-lg bg-white p-4 text-center shadow">
          <div className="text-sm text-gray-500">Prep Time</div>
          <input
            type="number"
            value={recipeDraft.prepTimeMin}
            onChange={(e) =>
              setRecipeDraft({ ...recipeDraft, prepTimeMin: parseInt(e.target.value) || 0 })
            }
            className="handWritten w-full text-center text-2xl font-semibold border-none bg-transparent focus:outline-none focus:ring-2 focus:ring-amber-500 rounded"
            placeholder="0"
          />
          <div className="text-sm text-gray-500">min</div>
        </div>
        
        <div className="rounded-lg bg-white p-4 text-center shadow">
          <div className="text-sm text-gray-500">Cook Time</div>
          <input
            type="number"
            value={recipeDraft.cookTimeMin}
            onChange={(e) =>
              setRecipeDraft({ ...recipeDraft, cookTimeMin: parseInt(e.target.value) || 0 })
            }
            className="handWritten w-full text-center text-2xl font-semibold border-none bg-transparent focus:outline-none focus:ring-2 focus:ring-amber-500 rounded"
            placeholder="0"
          />
          <div className="text-sm text-gray-500">min</div>
        </div>
        
        <div className="rounded-lg bg-white p-4 text-center shadow">
          <div className="text-sm text-gray-500">Serves</div>
          <input
            type="number"
            value={recipeDraft.serves}
            onChange={(e) =>
              setRecipeDraft({ ...recipeDraft, serves: parseInt(e.target.value) || 0 })
            }
            className="handWritten w-full text-center text-2xl font-semibold border-none bg-transparent focus:outline-none focus:ring-2 focus:ring-amber-500 rounded"
            placeholder="0"
          />
          <div className="text-sm text-gray-500">people</div>
        </div>
        
        <div className="rounded-lg bg-white p-4 text-center shadow">
          <div className="text-sm text-gray-500">Spicy</div>
          <select
            value={recipeDraft.isSpicy === null ? '' : recipeDraft.isSpicy.toString()}
            onChange={(e) =>
              setRecipeDraft({ 
                ...recipeDraft, 
                isSpicy: e.target.value === '' ? null : e.target.value === 'true' 
              })
            }
            className="handWritten w-full text-center text-2xl font-semibold border-none bg-transparent focus:outline-none focus:ring-2 focus:ring-amber-500 rounded"
          >
            <option value="">N/A</option>
            <option value="false">❄️ Mild</option>
            <option value="true">🔥 Spicy</option>
          </select>
        </div>
        
        <div className="rounded-lg bg-white p-4 text-center shadow">
          <div className="text-sm text-gray-500">Vegetarian</div>
          <select
            value={recipeDraft.isVegetarian === null ? '' : recipeDraft.isVegetarian.toString()}
            onChange={(e) =>
              setRecipeDraft({ 
                ...recipeDraft, 
                isVegetarian: e.target.value === '' ? null : e.target.value === 'true' 
              })
            }
            className="handWritten w-full text-center text-2xl font-semibold border-none bg-transparent focus:outline-none focus:ring-2 focus:ring-amber-500 rounded"
          >
            <option value="">N/A</option>
            <option value="false">🍖 Meat</option>
            <option value="true">🌱 Vegetarian</option>
          </select>
        </div>
      </section>

      {/* Selected Tags Display */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      <section>
        <div className="mb-4">
          <label className="handWritten block text-xl font-semibold text-gray-800 mb-2">
            📝 Description
          </label>
          <textarea
            value={recipeDraft.description}
            onChange={(e) =>
              setRecipeDraft({ ...recipeDraft, description: e.target.value })
            }
            className="handWritten w-full rounded-2xl border-2 border-dashed border-amber-900/30 bg-amber-50/60 px-4 py-3 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-700/30"
            rows={3}
            placeholder="Describe your recipe..."
          />
        </div>
      </section>
      {/* Ingredients + Instructions */}
      <section className="grid grid-cols-1 gap-8 pt-2 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="font-['Mynerve'] text-3xl font-semibold text-gray-800">
            📝 Ingredients
          </h2>
          <div className="space-y-2">
            {recipeDraft.ingredients
              .map((ingredient, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={ingredient}
                    onChange={(e) => {
                      const newIngredients = [...recipeDraft.ingredients];
                      newIngredients[idx] = e.target.value;
                      setRecipeDraft({ ...recipeDraft, ingredients: newIngredients });
                    }}
                    className="handWritten flex-1 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-700/30"
                    placeholder="Enter ingredient..."
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newIngredients = recipeDraft.ingredients.filter((_, i) => i !== idx);
                      setRecipeDraft({ ...recipeDraft, ingredients: newIngredients });
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </div>
              ))}
            <button
              type="button"
              onClick={() => {
                setRecipeDraft({ 
                  ...recipeDraft, 
                  ingredients: [...recipeDraft.ingredients, ''] 
                });
              }}
              className="handWritten rounded-lg border-2 border-dashed border-amber-300 bg-amber-50 px-4 py-2 text-lg text-amber-700 hover:bg-amber-100 transition-colors"
            >
              + Add Ingredient
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="font-['Mynerve'] text-3xl font-semibold text-gray-800">
            👩‍🍳 Instructions
          </h2>
          <div className="space-y-4">
            {recipeDraft.steps
              .map((step, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <textarea
                    value={step}
                    onChange={(e) => {
                      const newSteps = [...recipeDraft.steps];
                      newSteps[idx] = e.target.value;
                      setRecipeDraft({ ...recipeDraft, steps: newSteps });
                    }}
                    className="handWritten flex-1 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
                    rows={2}
                    placeholder="Enter instruction step..."
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newSteps = recipeDraft.steps.filter((_, i) => i !== idx);
                      setRecipeDraft({ ...recipeDraft, steps: newSteps });
                    }}
                    className="text-red-500 hover:text-red-700 mt-1"
                  >
                    ✕
                  </button>
                </div>
              ))}
            <button
              type="button"
              onClick={() => {
                setRecipeDraft({ 
                  ...recipeDraft, 
                  steps: [...recipeDraft.steps, ''] 
                });
              }}
              className="handWritten rounded-lg border-2 border-dashed border-emerald-300 bg-emerald-50 px-4 py-2 text-lg text-emerald-700 hover:bg-emerald-100 transition-colors"
            >
              + Add Step
            </button>
          </div>
        </div>
      </section>

      <div className="flex justify-center gap-6 pt-8">
        <button
          type="button"
          onClick={handleSubmit}
          className="handWritten rounded-xl border-2 border-dashed border-amber-900/30 bg-amber-50/60 px-8 py-4 text-2xl font-semibold text-amber-800 shadow-sm transition-colors duration-200 hover:bg-amber-100/60 focus:outline-none focus:ring-2 focus:ring-amber-700/30"
        >
          📤 Submit Recipe
        </button>
      </div>
      </div>
    </div>
  );
}

export default PreviewRecipePage;
