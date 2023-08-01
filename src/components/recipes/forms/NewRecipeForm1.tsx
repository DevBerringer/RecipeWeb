import { useContext, useState } from 'react';
import { RecipesContext } from '../../../contexts/recipesContext';

function NewRecipeForm1() {
  const recipeContext = useContext(RecipesContext);

  const handleImageUpload = (event: { target: { files: any[] } }) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64Image = reader.result;
      recipeContext?.setSelectedImage(base64Image);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="mx-auto h-full max-w-md rounded bg-recipecentral p-4 shadow-lg">
      <h2 className="mb-4 text-2xl font-semibold">New Recipe</h2>
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
          className="w-full rounded border border-gray-300 px-4 py-2"
        />
      </div>
      <label htmlFor="Category" className="mb-1 block font-semibold">
        Categories:
      </label>
      {recipeContext?.foodTypes.length !== 0 ? (
        <div id="Category" className="mt-2">
          {recipeContext?.foodTypes.map((category) => (
            <span
              key={category}
              className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 font-semibold text-gray-700"
            >
              {category}
            </span>
          ))}
        </div>
      ) : (
        <div id="Category" className="mt-2">
          <span className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 font-semibold text-gray-700">
            No Category Selected
          </span>
        </div>
      )}
      <div className="mb-4">
        <label htmlFor="description" className="mb-1 block font-semibold">
          Description:
        </label>
        <textarea
          id="description"
          value={recipeContext?.description}
          onChange={(e) => recipeContext?.setDescription(e.target.value)}
          placeholder="Enter recipe description"
          className="w-full rounded border border-gray-300 px-4 py-2"
          rows={4}
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
          className="w-full rounded border border-gray-300 px-4 py-2"
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
          className="w-full rounded border border-gray-300 px-4 py-2"
        />
      </div>
      {/* Add inputs for other fields (ingredients, difOfIngredient, steps, rating) */}
      <div className="mb-4">
        <label htmlFor="image" className="mb-1 block font-semibold">
          Image:
        </label>
        <div className="mx-auto items-center justify-center">
          <div>
            {/* <input
              className="block w-full text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-white focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="image"
              type="file"
              onChange={handleImageUpload}
            />{' '} */}
            <input
              className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-gray-900"
              id="image"
              type="file"
              onChange={handleImageUpload}
            />
          </div>
          <div className="mb-4 mt-5 flex justify-center">
            {recipeContext?.selectedImage && (
              <img
                src={recipeContext?.selectedImage}
                alt="Selected"
                className="h-44 w-44 object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewRecipeForm1;
