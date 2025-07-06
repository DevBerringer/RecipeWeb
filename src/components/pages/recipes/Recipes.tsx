import { useEffect, useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import loadingAnimation from '../../../assets/cookingPotAnimation.json';
import { getPagedRecipes } from '../../../api/api';
import RecipeCard from './RecipeCard';

interface Recipe {
  Id: string;
  Name: string;
  SelectedImage: string | null;
  PrepTimeMin: number;
  CookTimeMin: number;
}

function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filter, setFilter] = useState<string>(''); // ✅ filter is a string, never null
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerPage = 10;

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

  const handleNextPage = () => {
    if (hasMore) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const filteredDisplayRecipes = recipes.filter((item) =>
    item.Name.toLowerCase().includes(filter.toLowerCase())
  );

  const renderContent = () => {
    if (loading) {
      return (
        <div className="left-0 flex h-full w-full flex-col items-center justify-center">
          <Lottie
            className="max-h-[350px] max-w-[350px]"
            animationData={loadingAnimation}
          />
          <p className="mt-4 text-gray-600">Loading recipes...</p>
        </div>
      );
    }

    if (filteredDisplayRecipes.length > 0) {
      return (
        <div className="grid grid-cols-1 justify-center xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filteredDisplayRecipes.map((item) => (
            <Link to={`recipe/${item.Id}`} key={item.Id} className="m-2 my-5">
              <div className="h-full w-full min-w-[256px]">
                <RecipeCard
                  picture={item.SelectedImage}
                  name={item.Name}
                  prepTime={item.PrepTimeMin}
                  cookTime={item.CookTimeMin}
                />
              </div>
            </Link>
          ))}
        </div>
      );
    }

    return (
      <div className="left-0 flex h-full w-full flex-col items-center justify-center">
        <Lottie
          className="max-h-[350px] max-w-[350px]"
          animationData={loadingAnimation}
        />
        <p className="mt-4 text-gray-600">
          No recipes found matching your criteria.
        </p>
      </div>
    );
  };

  return (
    <div>
      {/* Filter input */}
      <div className="my-6 flex justify-center">
        <input
          type="text"
          placeholder="Search recipes..."
          value={filter}
          onChange={handleFilterChange}
          className="rounded border border-gray-300 px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-recipecentral"
        />
      </div>

      <div className="relative w-full">{renderContent()}</div>

      {!loading && (
        <div className="my-8 flex justify-center gap-6">
          <button
            type="button"
            onClick={handlePreviousPage}
            disabled={currentPage === 0}
            className={`flex items-center gap-2 rounded-lg px-5 py-3 text-lg font-medium shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              currentPage === 0
                ? 'cursor-not-allowed bg-gray-300 text-gray-500'
                : 'bg-recipecentral text-white hover:bg-recipecentral-dark focus:ring-blue-500'
            }`}
          >
            <ArrowLeft size={20} />
            Previous
          </button>

          <button
            type="button"
            onClick={handleNextPage}
            disabled={!hasMore}
            className={`flex items-center gap-2 rounded-lg px-5 py-3 text-lg font-medium shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              !hasMore
                ? 'cursor-not-allowed bg-gray-300 text-gray-500'
                : 'bg-recipecentral text-white hover:bg-recipecentral-dark focus:ring-blue-500'
            }`}
          >
            Next
            <ArrowRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}

export default Recipes;
