import { useEffect, ChangeEvent } from 'react';
import { useRecipeDraft } from '../../../../contexts/RecipeDraftContext';

function NewRecipeForm() {
  const { recipeDraft, setRecipeDraft } = useRecipeDraft();

  const {
    selectedImage = '',
    description = '',
    cookTimeMin = 0,
    prepTimeMin = 0,
    ingredients = [],
    serves = 0,
    steps = [],
  } = recipeDraft;

  // Define the type for updates object (partial of the draft shape)
  type Updates = Partial<typeof recipeDraft>;

  const updateDraft = (updates: Updates) => {
    setRecipeDraft({ ...recipeDraft, ...updates });
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(file);
    console.log(recipeDraft);
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      updateDraft({ selectedImage: reader.result as string, imageFile: file });
    };
    reader.readAsDataURL(file);
  };

  const handleAddIngredient = () =>
    updateDraft({ ingredients: [...ingredients, ''] });

  const handleRemoveIngredient = (index: number) =>
    updateDraft({
      ingredients: ingredients.filter((_, i) => i !== index),
    });

  const handleIngredientChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updated = [...ingredients];
    updated[index] = e.target.value;
    updateDraft({ ingredients: updated });
  };

  const handleAddStep = () => updateDraft({ steps: [...steps, ''] });

  const handleRemoveStep = (index: number) =>
    updateDraft({ steps: steps.filter((_, i) => i !== index) });

  const handleStepChange = (
    e: ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    const updated = [...steps];
    updated[index] = e.target.value;
    updateDraft({ steps: updated });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex-col">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 gap-x-32 lg:grid-cols-2">
        {/* Prep Time */}
        <div className="mb-4">
          <label htmlFor="prepTimeMin" className="mb-1 block">
            Prep Time (min):
          </label>
          <input
            type="number"
            id="prepTimeMin"
            value={prepTimeMin === 0 ? '' : prepTimeMin}
            onChange={(e) =>
              updateDraft({
                prepTimeMin:
                  e.target.value === '' ? 0 : parseInt(e.target.value, 10),
              })
            }
            placeholder="Enter prep time in minutes"
            className="mx-auto w-full rounded border border-gray-300 px-4 py-2 shadow-md"
          />
        </div>

        {/* Serves */}
        <div className="mb-4">
          <label htmlFor="serves" className="mb-1 block">
            Serves
          </label>
          <input
            type="number"
            id="serves"
            value={serves === 0 ? '' : serves}
            onChange={(e) =>
              updateDraft({
                serves:
                  e.target.value === '' ? 0 : parseInt(e.target.value, 10),
              })
            }
            placeholder="How many people does this serve?"
            className="mx-auto w-full rounded border border-gray-300 px-4 py-2 shadow-md"
          />
        </div>

        {/* Cook Time */}
        <div className="mb-4">
          <label htmlFor="cookTimeMin" className="mb-1 block">
            Cook Time (min):
          </label>
          <input
            type="number"
            id="cookTimeMin"
            value={cookTimeMin === 0 ? '' : cookTimeMin}
            onChange={(e) =>
              updateDraft({
                cookTimeMin:
                  e.target.value === '' ? 0 : parseInt(e.target.value, 10),
              })
            }
            placeholder="Enter cook time in minutes"
            className="mx-auto w-full rounded border border-gray-300 px-4 py-2 shadow-md"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="mb-1 block">
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => updateDraft({ description: e.target.value })}
            placeholder="Enter recipe description"
            className="mx-auto w-full rounded border border-gray-300 px-4 py-2 shadow-md"
            rows={4}
          />
        </div>

        {/* Ingredients */}
        <div className="mb-4">
          <label htmlFor="ingredients" className="mb-1 block">
            Ingredients:
          </label>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="mb-2 flex items-center">
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(e, index)}
                placeholder="Enter ingredient"
                className="mx-auto w-full rounded border border-gray-300 px-4 py-2 shadow-md"
              />
              {ingredients.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(index)}
                  className="ml-2 text-red-500"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddIngredient}
            className="mt-2 text-blue-500"
          >
            Add Ingredient
          </button>
        </div>

        {/* Steps */}
        <div className="mb-4">
          <label htmlFor="steps" className="mb-1 block">
            Steps:
          </label>
          {steps.map((step, index) => (
            <div key={index} className="mb-2 flex items-center">
              <textarea
                value={step}
                onChange={(e) => handleStepChange(e, index)}
                placeholder="Enter cooking step"
                className="mx-auto w-full rounded border border-gray-300 px-4 py-2 shadow-md"
                rows={3}
              />
              {steps.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveStep(index)}
                  className="ml-2 text-red-500"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddStep}
            className="mt-2 text-blue-500"
          >
            Add Step
          </button>
        </div>

        {/* Image Upload */}
        <div className="grid-cols-2">
          <div className="max-h-60 w-full">
            <label htmlFor="dropzone-file" className="mb-1 block">
              Image:
            </label>
            <label
              htmlFor="dropzone-file"
              className="dark:border-gray-60 h-42 flex w-full cursor-pointer flex-col items-center justify-center rounded border-2 border-dashed border-black bg-gray-50 hover:bg-gray-100 hover:bg-recipecentral-light dark:hover:border-gray-500"
            >
              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                <svg
                  className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Image Preview */}
        <div className="col-span-1 w-full items-center">
          <div className="mb-4 mt-5 w-full">
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Selected"
                className="mx-auto h-96 w-96 rounded object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewRecipeForm;
