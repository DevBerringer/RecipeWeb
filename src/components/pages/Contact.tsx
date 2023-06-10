function RecipePage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Recipe Page</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <img
            className="w-full rounded-lg mb-4"
            src="https://example.com/recipe-image.jpg"
            alt="Recipe"
          />
          <h2 className="text-2xl font-bold mb-2">Recipe Name</h2>7
          <p className="text-gray-500">
            Prep Time: 30 minutes | Cook Time: 1 hour
          </p>
          <h3 className="text-xl font-bold mt-6 mb-2">Ingredients</h3>
          <ul className="list-disc pl-6">
            <li>Ingredient 1</li>
            <li>Ingredient 2</li>
            <li>Ingredient 3</li>
            {/* Add more ingredients */}
          </ul>
          <h3 className="text-xl font-bold mt-6 mb-2">Instructions</h3>
          <ol className="list-decimal pl-6">
            <li>Step 1</li>
            <li>Step 2</li>
            <li>Step 3</li>
            {/* Add more steps */}
          </ol>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Nutritional Information</h3>
          <ul className="list-disc pl-6">
            <li>Calories: 500</li>
            <li>Protein: 20g</li>
            <li>Fat: 10g</li>
            {/* Add more nutritional information */}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RecipePage;
