import { useState, useEffect } from 'react';
import { useRecipeDraft } from '../../../../contexts/RecipeDraftContext';

function CuisineSelector() {
  const { recipeDraft, setRecipeDraft } = useRecipeDraft();
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);

  const cuisines = [
    'Italian',
    'Mexican',
    'Indian',
    'Chinese',
    'French',
    'Japanese',
    'American',
    'Korean',
    'Thai',
    'Caribbean',
    'Lebanese',
    'Mediterranean',
  ];

  useEffect(() => {
    setSelectedCuisines(recipeDraft.cuisineTypes);
  }, [recipeDraft.cuisineTypes]);

  const handleCuisineSelect = (cuisine: string) => {
    const updatedCuisines = selectedCuisines.includes(cuisine)
      ? selectedCuisines.filter((item) => item !== cuisine)
      : [...selectedCuisines, cuisine];

    setSelectedCuisines(updatedCuisines);

    setRecipeDraft({
      ...recipeDraft,
      cuisineTypes: updatedCuisines,
    });
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="mb-8 text-4xl font-semibold text-gray-800">
        Select Cuisines
      </h2>
      <div
        className="grid gap-6 sm:grid-cols-6"
        style={{ justifyContent: 'center' }}
      >
        {cuisines.map((cuisine) => (
          <div
            key={cuisine}
            onClick={() => handleCuisineSelect(cuisine)}
            className={`relative flex cursor-pointer flex-col items-center justify-center rounded-xl p-8 shadow-lg transition-transform hover:scale-105 hover:shadow-xl ${
              selectedCuisines.includes(cuisine)
                ? 'bg-recipecentral'
                : 'bg-recipecentral-light'
            }`}
          >
            <h3 className="text-2xl">{cuisine}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CuisineSelector;
