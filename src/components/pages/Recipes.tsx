import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRecipes } from '../../api/api';
import RecipeCard from '../shared/RecipeCard';
import SearchBar from '../shared/SearchBar';

const DEFAULT = {
  Message: '',
  Success: false,
  RecipeDTOs: [],
};

function Recipes() {
  const [data, setData] = useState(DEFAULT);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedData = await getRecipes();
        setData(fetchedData);
      } catch (error) {
        // Handle error, e.g., show an error message or retry
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <div>
      <div className="relative flex mx-auto mb-4">
        <div className="px-4 py-2 text-gray-600 text-lg">
          Can't find what you are looking for?
        </div>
        <SearchBar />
      </div>
      {loading ? (
        <div className="h-screen">Loading...</div>
      ) : (
        <div>
          {data.RecipeDTOs.length > 0 ? (
            data.RecipeDTOs.map((item) => (
              <Link to={`${item.Id}`} key={item.Id}>
                <RecipeCard
                  name={item.Name}
                  description={item.Description}
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
      )}
    </div>
  );
}

export default Recipes;
