import { useState } from 'react';

function NewRecipeForm2() {
  const [steps, setSteps] = useState([]);
  const [rating, setRating] = useState(0);

  return (
    <div className="max-w-md mx-auto p-4 bg-recipecentral shadow-lg rounded">
      <h2 className="text-2xl font-semibold mb-4">Steps:</h2>
    </div>
  );
}

export default NewRecipeForm2;
