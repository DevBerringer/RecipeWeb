import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UseRecipe } from '../../contexts/recipesContext';
import CategoryCard from '../shared/CatagoryCard';
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
      <h1 className=" text-center text-4xl font-extrabold text-black">
        <span className="drop-shadow-lg">Welcome to Family Cookbook!</span>
      </h1>
      <div className="flex justify-end mx-auto mb-4">
        <div className="px-4 py-2 text-gray-600 text-lg">Search:</div>
        <SearchBar onChange={handleFilterChange} />
      </div>
      <div className="flex flex-wrap justify-center">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((item) => (
            <Link to={`${item.Id}`} key={item.Id} className="m-2">
              <CategoryCard picture={item.Picture} name={item.Name} />
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
