import { useState, ChangeEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import { getPagedRecipes } from '../../../api/api';
import loadingAnimation from '../../../assets/cookingPotAnimation.json';

interface RecipeProfileListProps {
  createdByFilter: string | null;
}

interface Recipe {
  Id: string;
  Name: string;
  Description: string;
  Picture: string | null;
  PrepTimeMin: number;
  CookTimeMin: number;
  CreatedBy: string;
  CreatedDate: string;
  FoodTypes: string[];
}

function RecipeProfileList({ createdByFilter }: RecipeProfileListProps) {
  const [filter, setFilter] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 8;

  // Fetch paginated recipes
  const fetchRecipes = async (page: number) => {
    setLoading(true);
    try {
      const data = await getPagedRecipes(page, itemsPerPage);
      const newRecipes: Recipe[] = data.RecipeDTOs || [];
      setRecipes(newRecipes);
      setHasMore(newRecipes.length === itemsPerPage);
    } catch (error) {
      console.error('Failed to fetch recipes:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes(currentPage);
  }, [currentPage]);

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handleNextPage = () => {
    if (hasMore) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) setCurrentPage((prev) => prev - 1);
  };

  // Apply filtering based on name + createdBy on currently loaded page
  const filteredRecipes = recipes.filter(
    (item) =>
      (!createdByFilter || item.CreatedBy === createdByFilter) &&
      item.Name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="mt-4 flex">
          <input
            type="text"
            id="recipeNameFilter"
            className="flex-2 focus:shadow-outline appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            placeholder="Enter recipe name..."
            value={filter}
            onChange={handleFilterChange}
          />
        </div>
        <div className="pt-2 text-right text-2xl">
          Recipes {filteredRecipes?.length}
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center pt-20">
          <Lottie
            className="max-h-[250px] max-w-[250px]"
            animationData={loadingAnimation}
          />
          <p className="mt-4 text-gray-600">Loading recipes...</p>
        </div>
      ) : filteredRecipes.length > 0 ? (
        filteredRecipes.map((item) => (
          <div key={item.Id}>
            <div className="h-[1px] w-full bg-gray-300" />
            <Link to={`../../recipes/${item.Id}`} className="m-2 my-5 block">
              <div className="grid w-full grid-cols-4 gap-4">
                <div className="col-span-4 flex max-h-[400px] max-w-lg flex-col justify-between pt-10 text-lg">
                  <div>
                    <p className="text-2xl font-bold">{item.Description}</p>
                  </div>
                  <div className="pt-3">
                    Categories: {item.FoodTypes.join(', ')}
                  </div>
                  <div className="pt-3 text-right">
                    PrepTime: {item.PrepTimeMin} min.
                  </div>
                  <div className="pt-3 text-right">
                    CookTime: {item.CookTimeMin} min.
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-gray-500">Created Date: </span>
                {new Date(item.CreatedDate).toLocaleDateString()}
              </div>
            </Link>
          </div>
        ))
      ) : (
        <div className="my-4 flex items-center justify-center">
          <div className="max-w-lg rounded border border-gray-300 bg-gray-100 p-4 text-center text-lg text-gray-500">
            No recipes found
          </div>
        </div>
      )}

      {/* Pagination Controls */}
      {!loading && (
        <div className="my-6 flex justify-center space-x-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 0}
            className={`rounded-md px-6 py-3 shadow-md focus:outline-none focus:ring-2 ${
              currentPage === 0
                ? 'cursor-not-allowed bg-gray-300 text-gray-500'
                : 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500 focus:ring-opacity-50'
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={!hasMore}
            className={`rounded-md px-6 py-3 shadow-md focus:outline-none focus:ring-2 ${
              !hasMore
                ? 'cursor-not-allowed bg-gray-300 text-gray-500'
                : 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500 focus:ring-opacity-50'
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default RecipeProfileList;
