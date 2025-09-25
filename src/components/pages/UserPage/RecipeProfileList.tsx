import { useState, ChangeEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from '../recipes/RecipeCard';
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

  const itemsPerPage = 10;

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
            className="flex-2 border shadow-md focus:shadow-outline appearance-none rounded px-3 py-2 leading-tight text-gray-700 focus:outline-none"
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
        <div className="grid grid-cols-1 justify-center gap-4 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredRecipes.map((item) => (
            <Link to={`../../recipes/recipe/${item.Id}`} key={item.Id} className="block">
              <div className="min-w-[256px] min-h-[300px]">
                <RecipeCard
                  selectedImage={(item as any).SelectedImage}
                  name={item.Name}
                  prepTime={item.PrepTimeMin}
                  cookTime={item.CookTimeMin}
                />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="my-4 flex items-center justify-center">
          <div className="max-w-lg rounded bg-gray-100 p-4 text-center text-lg text-gray-500">
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
            className={`rounded-md px-6 py-3 focus:outline-none focus:ring-2 ${
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
            className={`rounded-md px-6 py-3 focus:outline-none focus:ring-2 ${
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
