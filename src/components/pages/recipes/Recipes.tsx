import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import loadingAnimation from '../../../assets/cookingPotAnimation.json';
import { UseRecipe } from '../../../contexts/recipesContext';
import RecipeCard from './RecipeCard';
import SearchBar from '../../shared/SearchBar';
import React from 'react';

function Recipes() {
  const { recipe } = UseRecipe();
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter recipes based on the selected food type
  const filteredRecipes = recipe.filter((item) =>
    item.Name.toLowerCase().includes(filter.toLowerCase())
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRecipes.slice(indexOfFirstItem, indexOfLastItem);

  // Add event typing here:
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilter(e.target.value);
    setCurrentPage(1);
  };

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="mx-auto mb-4 flex justify-end">
        <div className="px-4 py-2 text-lg text-gray-600">
          Can't find what you are looking for?
        </div>
        <SearchBar onChange={handleFilterChange} />
      </div>
      <div className="mb-4 flex justify-center">
        <select
          className="rounded border border-gray-300 px-4 py-2"
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
      <div className="relative w-full">
        {currentItems.length > 0 ? (
          <div className="grid grid-cols-1 justify-center xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {currentItems.map((item) => (
              <Link to={`recipe/${item.Id}`} key={item.Id} className="m-2 my-5">
                <div className="h-full w-full min-w-[256px]">
                  <RecipeCard
                    picture={item.Picture}
                    name={item.Name}
                    prepTime={item.PrepTimeMin}
                    cookTime={item.CookTimeMin}
                  />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="left-0 flex h-full w-full items-center justify-center pt-20">
            <Lottie
              className="max-h-[350px] max-w-[350px]"
              animationData={loadingAnimation}
            />
          </div>
        )}
      </div>
      {currentItems.length > 0 ? (
        <div className="my-4 flex justify-center">
          <button
            type="button"
            className="mr-2 rounded bg-recipecentral px-4 py-2 disabled:opacity-50"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            type="button"
            className="rounded bg-recipecentral px-4 py-2 disabled:opacity-50"
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}

export default Recipes;
