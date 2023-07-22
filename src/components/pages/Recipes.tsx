import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UseRecipe } from '../../contexts/recipesContext';
import RecipeCard from '../shared/RecipeCard';
import SearchBar from '../shared/SearchBar';

function Recipes() {
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
      <div className="flex justify-end mx-auto mb-4">
        <div className="px-4 py-2 text-gray-600 text-lg">
          Can't find what you are looking for?
        </div>
        <SearchBar onChange={handleFilterChange} />
      </div>
      <div className="flex justify-center mb-4">
        <select
          className="px-4 py-2 border border-gray-300 rounded"
          value={filter}
          onChange={handleFilterChange}
        >
          <option value="">All</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="dessert">Dessert</option>
        </select>
      </div>
      <div className="flex flex-wrap justify-center">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((item) => (
            <Link to={`${item.Id}`} key={item.Id} className="m-2 my-5">
              <RecipeCard
                picture={item.Picture}
                name={item.Name}
                rating={item.Rating ? item.Rating : 0}
                cookTime={item.CookTimeMin.toLocaleString()}
              />
            </Link>
          ))
        ) : (
          <div className="flex items-center justify-center my-4">
            <div className="max-w-lg bg-gray-100 border border-gray-300 rounded p-4 text-gray-500 text-lg text-center">
              No recipes found
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Recipes;
