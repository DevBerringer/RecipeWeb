import { useEffect, useState, ChangeEvent, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Lottie from 'lottie-react';
import loadingAnimation from '../../../assets/cookingPotAnimation.json';
import { getPagedRecipes } from '../../../api/api';
import { UseAuth } from '../../../contexts/authContext';
import { useCategories } from '../../../contexts/CategoriesContext';
import SearchBox from './componenets/SearchBox';
import CategoryFilters from './componenets/CategoryFilters';
import AttributeFilters from './componenets/AttributeFilters';
import RecipeGrid from './componenets/RecipeGrid';
import PaginationControls from '../../shared/PaginationControls';

interface Recipe {
  Id: string;
  Name: string;
  SelectedImage: string | null;
  PrepTimeMin: number;
  CookTimeMin: number;
}

function Recipes() {
  const { user } = UseAuth();
  const [searchParams] = useSearchParams();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchInput, setSearchInput] = useState<string>(''); // Input value
  const [filter, setFilter] = useState<string>(''); // Applied filter
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const requestIdRef = useRef(0);
  const itemsPerPage = 10;

  // Filters
  const { categories } = useCategories();
  const [selectedMeals, setSelectedMeals] = useState<string[]>([]);
  const [selectedFoods, setSelectedFoods] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [isVegetarian, setIsVegetarian] = useState<boolean | null>(null);
  const [isSpicy, setIsSpicy] = useState<boolean | null>(null);
  const [maxCookTime, setMaxCookTime] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Handle URL parameters for filtering
  useEffect(() => {
    const foodType = searchParams.get('foodType');
    const mealType = searchParams.get('mealType');
    const regionType = searchParams.get('regionType');

    // Clear existing filters first
    setSelectedFoods([]);
    setSelectedMeals([]);
    setSelectedRegions([]);

    // Set new filters from URL parameters
    if (foodType) {
      setSelectedFoods([foodType]);
    }
    if (mealType) {
      setSelectedMeals([mealType]);
    }
    if (regionType) {
      setSelectedRegions([regionType]);
    }
  }, [searchParams]);

  const fetchRecipes = async (page: number) => {
    const currentRequestId = ++requestIdRef.current;
    setLoading(true);
    
    try {
      const data = await getPagedRecipes(page, itemsPerPage, {
        search: filter || undefined,
        meals: selectedMeals,
        foods: selectedFoods,
        regions: selectedRegions,
        vegetarian: isVegetarian,
        spicy: isSpicy,
        maxCookTime: maxCookTime,
      });
      
      // Only update state if this is still the latest request
      if (currentRequestId === requestIdRef.current) {
        const newRecipes: Recipe[] = data.RecipeDTOs || [];
        setRecipes(newRecipes);
        setHasMore(newRecipes.length === itemsPerPage);
      }
    } catch (error) {
      console.error('Failed to fetch recipes:', error);
      // Only update state if this is still the latest request
      if (currentRequestId === requestIdRef.current) {
        setHasMore(false);
      }
    } finally {
      // Only update loading state if this is still the latest request
      if (currentRequestId === requestIdRef.current) {
        setLoading(false);
      }
    }
  };

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

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    setFilter(searchInput);
  };

  // Handle page changes
  useEffect(() => {
    if (!user) {
      setRecipes([]);
      setHasMore(false);
      return;
    }
    fetchRecipes(currentPage);
  }, [currentPage, user]);

  // Handle filter changes - reset page and fetch
  useEffect(() => {
    if (!user) return;
    setCurrentPage(0);
    fetchRecipes(0);
  }, [filter, selectedMeals, selectedFoods, selectedRegions, isVegetarian, isSpicy, maxCookTime, searchParams]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="left-0 flex h-full w-full flex-col items-center justify-center">
        <Lottie
          className="max-h-[250px] -mt-4 translate-y-[-100px]"
          animationData={loadingAnimation}
        />
          <p className="mt-4 text-gray-600 translate-y-[-100px]">Loading recipes...</p>
        </div>
      );
    }

    if (recipes.length > 0) {
      return <RecipeGrid recipes={recipes} />;
    }

    return (
      <div className="left-0 flex h-full w-full flex-col items-center justify-center">
        <Lottie
          className="max-h-[250px] -mt-4 translate-y-[-100px]"
          animationData={loadingAnimation}
        />
        <p className="mt-4 text-gray-600 translate-y-[-100px]">
          No recipes found matching your criteria.
        </p>
      </div>
    );
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center">
        <div>          
          <div className="mb-6 w-full max-w-2xl px-4">
            <img
              src="/assets/register.jpg"
              alt="Please login or register"
              className="max-h-96 w-full rounded-md object-contain"
              />
          </div>
          </div>
        <p className="mb-4 text-lg text-gray-700">Please log in to view recipes.</p>
        <div className="flex gap-4">
          <Link
            to="/login"
            className="rounded-md bg-recipecentral px-5 py-3 text-white hover:bg-recipecentral-dark"
            >
            Go to Login
          </Link>
          <Link
            to="/login/register"
            className="rounded-md border border-recipecentral px-5 py-3 text-recipecentral hover:bg-recipecentral hover:text-white"
          >
            Create Account
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Filters */}
        <div className="my-6 max-w-6xl mx-auto px-4">
        {/* Search Box at the top */}
        <div className="mb-4">
          <SearchBox value={searchInput} onChange={handleSearchInputChange} onSearch={handleSearch} />
        </div>

        {/* Filters Dropdown */}
        <div className="mb-4">
          <div
            onClick={() => setShowFilters((prev) => !prev)}
            className="inline-flex cursor-pointer items-center gap-2 text-amber-800 transition hover:text-amber-900"
            role="button"
            aria-expanded={showFilters}
            aria-controls="filters-panel"
          >
            <span className="text-sm font-semibold tracking-wide underline-offset-4 hover:underline">
              Filters
            </span>
            <svg
              className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.188l3.71-3.957a.75.75 0 111.08 1.04l-4.25 4.53a.75.75 0 01-1.08 0l-4.25-4.53a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {showFilters && (
            <div
              id="filters-panel"
              className="mx-auto mt-3 max-w-6xl rounded-2xl border border-amber-900/20 bg-white/70 p-4 shadow-md backdrop-blur-sm"
            >
          	  <div className="grid gap-4 grid-cols-1">
                <CategoryFilters
                  categories={categories ?? null}
                  selectedMeals={selectedMeals}
                  setSelectedMeals={setSelectedMeals}
                  selectedFoods={selectedFoods}
                  setSelectedFoods={setSelectedFoods}
                  selectedRegions={selectedRegions}
                  setSelectedRegions={setSelectedRegions}
                />
                <div className="max-h-80 overflow-auto pr-1 md:max-h-96">
                  <AttributeFilters
                    isVegetarian={isVegetarian}
                    setIsVegetarian={setIsVegetarian}
                    isSpicy={isSpicy}
                    setIsSpicy={setIsSpicy}
                    maxCookTime={maxCookTime}
                    setMaxCookTime={setMaxCookTime}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="relative w-full">{renderContent()}</div>

      <PaginationControls
        currentPage={currentPage}
        hasMore={hasMore}
        loading={loading}
        onPrev={handlePreviousPage}
        onNext={handleNextPage}
      />
    </div>
  );
}

export default Recipes;
