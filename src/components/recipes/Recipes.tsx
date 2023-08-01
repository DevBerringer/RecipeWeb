import { useState } from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import loadingAnimation from '../../assets/cookingPotAnimation.json';
import { UseRecipe } from '../../contexts/recipesContext';
import RecipeCard from './RecipeCard';
import SearchBar from '../shared/SearchBar';

function Recipes() {
  const { recipe } = UseRecipe();
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Change this to set the number of items per page

  // Filter recipes based on the selected food type
  const filteredRecipes = recipe.filter((item) =>
    item.Name.toLowerCase().includes(filter.toLowerCase())
  );

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);

  // Get the current page's items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRecipes.slice(indexOfFirstItem, indexOfLastItem);

  // Handle filtering change
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setCurrentPage(1); // Reset current page to the first page when changing the filter
  };

  // Handle next page click
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle previous page click
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
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
        {currentItems.length > 0 ? (
          currentItems.map((item) => (
            <Link to={`${item.Id}`} key={item.Id} className="m-2 my-5">
              <div className="w-full md:w-1/2 lg:w-1/4 xl:w-1/5 min-w-[256px]">
                <RecipeCard
                  picture={item.Picture}
                  name={item.Name}
                  prepTime={item.PrepTimeMin}
                  cookTime={item.CookTimeMin}
                />
              </div>
            </Link>
          ))
        ) : (
          <div className="flex items-center justify-center my-4 max-h-[350px] max-w-[350px]">
            <Lottie animationData={loadingAnimation} />
          </div>
        )}
      </div>
      <div className="flex justify-center my-4">
        <button
          className="px-4 py-2 mr-2 bg-blue-500 text-white rounded disabled:opacity-50"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Recipes;
