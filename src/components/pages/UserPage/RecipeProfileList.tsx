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
      <div className="mb-8 flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <div className="flex w-full max-w-md items-center">
          <div className="relative w-full">
            <input
              type="text"
              id="recipeNameFilter"
              className="handWritten w-full rounded-2xl border-2 border-dashed border-amber-900/30 bg-amber-50/60 px-6 py-4 text-center text-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-700/30"
              placeholder="🔍 Search recipes..."
              value={filter}
              onChange={handleFilterChange}
            />
          </div>
        </div>
        <div className="handWritten text-center text-2xl font-semibold text-stone-700">
          📚 {filteredRecipes?.length} Recipe{filteredRecipes?.length !== 1 ? 's' : ''}
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
        <div className="my-8 flex items-center justify-center">
          <div className="handWritten max-w-lg rounded-2xl border-2 border-dashed border-stone-300 bg-stone-50/60 p-8 text-center text-xl text-stone-600 shadow-sm">
            📝 No recipes found in this cookbook
          </div>
        </div>
      )}

      {/* Pagination Controls */}
      {!loading && (
        <div className="my-8 flex justify-center gap-6">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 0}
            className={`handWritten rounded-xl border-2 border-dashed px-6 py-3 text-lg font-semibold shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-700/30 ${
              currentPage === 0
                ? 'cursor-not-allowed border-stone-300 bg-stone-100 text-stone-400'
                : 'border-amber-900/30 bg-amber-50/60 text-stone-700 hover:bg-amber-100/60'
            }`}
          >
            ← Previous Page
          </button>
          <button
            onClick={handleNextPage}
            disabled={!hasMore}
            className={`handWritten rounded-xl border-2 border-dashed px-6 py-3 text-lg font-semibold shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-700/30 ${
              !hasMore
                ? 'cursor-not-allowed border-stone-300 bg-stone-100 text-stone-400'
                : 'border-amber-900/30 bg-amber-50/60 text-stone-700 hover:bg-amber-100/60'
            }`}
          >
            Next Page →
          </button>
        </div>
      )}
    </div>
  );
}

export default RecipeProfileList;
