import { useState } from 'react';

function NewRecipeForm1() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState('');
  const [spicyLevel, setSpicyLevel] = useState('0');
  const [description, setDescription] = useState('');
  const [cookTimeMin, setCookTimeMin] = useState(0);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-recipecentral shadow-lg rounded">
      <h2 className="text-2xl font-semibold mb-4">New Recipe</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block mb-1 font-semibold">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter recipe name"
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="spicyLevel" className="block mb-1 font-semibold">
          Spicy Level: {spicyLevel}
        </label>
        <input
          type="range"
          min="0"
          max="5"
          id="spicyLevel"
          value={spicyLevel}
          onChange={(e) => setSpicyLevel(e.target.value)}
          placeholder="Enter spicy level"
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block mb-1 font-semibold">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter recipe description"
          className="w-full px-4 py-2 border border-gray-300 rounded"
          rows="4"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="cookTimeMin" className="block mb-1 font-semibold">
          Cook Time (min)
        </label>
        <input
          type="number"
          id="cookTimeMin"
          value={cookTimeMin}
          onChange={(e) => setCookTimeMin(parseInt(e.target.value))}
          placeholder="Enter cook time in minutes"
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
      </div>
      {/* Add inputs for other fields (ingredients, difOfIngredient, steps, rating) */}
      <div className="mb-4">
        <label htmlFor="image" className="block mb-1 font-semibold">
          Image
        </label>
        <div className="flex mx-auto">
          <div>
            <input
              type="file"
              id="image"
              onChange={handleImageUpload}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
            <button
              type="button"
              className="inline-block py-2 px-4 bg-white rounded hover:bg-recipecentral-dark text-black hover:text-white font-semibold shadow-2xl hover:shadow-lg"
            >
              Upload Image
            </button>
          </div>
          <div className="flex-grow flex items-center justify-center">
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Selected"
                className="w-36 h-36 object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewRecipeForm1;
