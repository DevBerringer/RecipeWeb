import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCategories } from '../../../contexts/CategoriesContext';
import { ChevronDown } from 'lucide-react';

export default function RecipesDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [touchUsed, setTouchUsed] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { categories, loading } = useCategories();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setTouchUsed(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true); // Only open, don't toggle
    // Reset touch flag after a short delay
    setTimeout(() => setTouchUsed(false), 100);
  };

  if (loading || !categories) {
    return (
      <div className="relative">
        <Link 
          to="recipes" 
          className="px-4 hover:underline flex items-center gap-1"
        >
          Recipes
          <ChevronDown size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div 
      ref={dropdownRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button 
        className="px-4 hover:underline flex items-center gap-1 text-left"
        onTouchStart={handleTouchStart}
        onClick={(e) => {
          e.preventDefault();
          if (touchUsed) {
            setTouchUsed(false);
            return;
          }
          setIsOpen(true); // Only open, don't toggle
        }}
      >
        Recipes
        <ChevronDown 
          size={16} 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full mt-2 w-[90vw] sm:w-[600px] md:w-[800px] bg-white rounded-2xl shadow-2xl border border-recipecentral-dark overflow-hidden z-50">
          <div className="p-4 sm:p-6 md:p-10">
            <h3 className="handWritten text-lg font-bold text-gray-900 mb-4 text-center">
              🍽️ Recipe Categories
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
            {/* Category Block */}
            {[{
                title: '🥘 Food Types',
                items: categories.FoodCategories,
                queryKey: 'foodType',
                showImage: true
            }, {
                title: '🕐 Meal Types',
                items: categories.MealCategories,
                queryKey: 'mealType',
                showImage: true
            }, {
                title: '🌍 Cuisine Regions',
                items: categories.RegionCategories,
                queryKey: 'regionType',
                showImage: false,
                useName: true,
                isRegions: true
            }].map(({ title, items, queryKey, showImage, useName, isRegions }) => (
                items?.length > 0 && (
                <div key={title} className="min-w-0">
                    <h4 className="handWritten text-base md:text-lg font-semibold text-amber-700 mb-6 text-center">
                    {title}
                    </h4>
                     <div className={isRegions ? "flex flex-wrap gap-2" : "grid grid-cols-2 md:grid-cols-3 gap-2"}>
                     {items.map((item) => (
                        <Link
                        key={item.id}
                        to={`/recipes?${queryKey}=${encodeURIComponent(useName ? item.name : item.id)}`}
                        className={`group flex items-center gap-2 rounded-lg hover:bg-recipecentral-light transition-colors duration-200 ${
                            isRegions 
                                ? 'flex-row min-w-0 px-2 py-3' 
                                : 'flex-col aspect-square px-3 py-2'
                        }`}
                        onClick={() => setIsOpen(false)}
                        >
                        {showImage && (
                            <div className="w-12 h-10 rounded-lg">
                            <img
                                src={item.imagePath || '/assets/noFood.jpg'}
                                alt={item.name}
                                className="w-full h-full object-cover"
                            />
                            </div>
                        )}
                        <span className={`handWritten font-medium text-gray-700 group-hover:text-amber-800 leading-tight ${
                            isRegions 
                                ? 'text-sm whitespace-nowrap' 
                                : 'text-sm text-center'
                        }`}>
                            {item.name}
                        </span>
                        </Link>
                    ))}
                    </div>
                </div>
                )
            ))}
            </div>
            
            {/* View All Link */}
            <div className="mt-4 pt-4 border-t border-recipecentral">
              <Link
                to="/recipes"
                className="handWritten block w-full text-center py-3 px-4 bg-recipecentral hover:bg-recipecentral-dark hover:text-white font-semibold rounded-xl transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                View All Recipes →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
