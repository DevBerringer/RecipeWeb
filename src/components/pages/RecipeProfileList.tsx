import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UseRecipe } from '../../contexts/recipesContext';
import RecipeCardProfile from '../shared/RecipeCardProfile';

function RecipeProfileList() {
  const { recipe } = UseRecipe();
  const [filter, setFilter] = useState('');

  // Filter recipes based on the selected food type
  const filteredRecipes = recipe.filter((item) =>
    item.Name.toLowerCase().includes(filter.toLowerCase())
  );

  // Handle filtering change
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div>
      {filteredRecipes.length > 0 ? (
        filteredRecipes.map((item) => (
          <div key={item.Id}>
            <div className="w-[959px] h-[0px] border border-stone-400" />

            <Link to={`${item.Id}`} key={item.Id} className="m-2 my-5">
              <RecipeCardProfile
                picture={item.Picture}
                name={item.Name}
                rating={item.Rating ? item.Rating : 0}
                cookTime={item.CookTimeMin.toLocaleString()}
              />
            </Link>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center my-4">
          <div className="max-w-lg bg-gray-100 border border-gray-300 rounded p-4 text-gray-500 text-lg text-center">
            No recipes found
          </div>
        </div>
      )}
    </div>
  );
}

export default RecipeProfileList;
