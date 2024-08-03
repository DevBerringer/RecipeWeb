import { useContext } from 'react';
import { RecipesContext } from '../../../contexts/recipesContext';

function NewRecipeForm1() {
  const recipeContext = useContext(RecipesContext);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64Image = reader.result;
      recipeContext?.setSelectedImage(base64Image);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="flex-col">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 gap-x-32 lg:grid-cols-2">
        <div className="mb-4">
          <label htmlFor="name" className="mb-1 block font-semibold">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={recipeContext?.name}
            onChange={(e) => recipeContext?.setName(e.target.value)}
            placeholder="Enter recipe name"
            className="mx-auto w-full rounded border border-gray-300 px-4 py-2"
          />
        </div>{' '}
        <div className="mb-4">
          <label htmlFor="name" className="mb-1 block font-semibold">
            Serves
          </label>
          <input
            type="number"
            id="name"
            value={recipeContext?.name}
            onChange={(e) => recipeContext?.setName(e.target.value)}
            placeholder="How many people does this serve?"
            className="mx-auto w-full rounded border border-gray-300 px-4 py-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="cookTimeMin" className="mb-1 block font-semibold">
            Prep Time (min):
          </label>
          <input
            type="number"
            id="cookTimeMin"
            value={recipeContext?.prepTimeMin}
            onChange={(e) =>
              recipeContext?.setPrepTimeMin(parseInt(e.target.value, 10))
            }
            placeholder="Enter Prep time in minutes"
            className="mx-auto w-full rounded border border-gray-300 px-4 py-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="cookTimeMin" className="mb-1 block font-semibold">
            Cook Time (min):
          </label>
          <input
            type="number"
            id="cookTimeMin"
            value={recipeContext?.cookTimeMin}
            onChange={(e) =>
              recipeContext?.setCookTimeMin(parseInt(e.target.value, 10))
            }
            placeholder="Enter cook time in minutes"
            className="mx-auto w-full rounded border border-gray-300 px-4 py-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="mb-1 block font-semibold">
            Description:
          </label>
          <textarea
            id="description"
            value={recipeContext?.description}
            onChange={(e) => recipeContext?.setDescription(e.target.value)}
            placeholder="Enter recipe description"
            className="mx-auto w-full rounded border border-gray-300 px-4 py-2"
            rows={4}
          />
        </div>
        <div class="max-h-60 w-full">
          <label htmlFor="description" className="mb-1 block font-semibold">
            Image:
          </label>
          <label
            for="dropzone-file"
            class="dark:border-gray-60 h-42 flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-black bg-gray-50 hover:bg-gray-100 hover:bg-recipecentral-light dark:hover:border-gray-500"
          >
            <div class="flex flex-col items-center justify-center pb-6 pt-5">
              <svg
                class="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span class="font-semibold">Click to upload</span> or drag and
                drop
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
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
      <div className="col-span-2 w-full items-center">
        <div className="mb-4 mt-5 w-full">
          {recipeContext?.selectedImage && (
            <img
              src={recipeContext?.selectedImage}
              alt="Selected"
              class="mx-auto h-96 w-96 rounded-lg object-cover"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default NewRecipeForm1;
