import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="pt-28 flex flex-col items-center justify-center px-4">
      {/* Animated Cooking Pot */}
      <div className="relative mb-8">
        <div className="text-8xl md:text-9xl animate-bounce">
          🍳
        </div>
        {/* Floating ingredients */}
        <div className="absolute -top-4 -left-4 text-2xl">🥕</div>
        <div className="absolute -top-2 -right-6 text-xl delay-100">🧄</div>
        <div className="absolute -bottom-2 -left-2 text-lg delay-200">🌶️</div>
        <div className="absolute -bottom-1 -right-4 text-xl delay-300">🧅</div>
      </div>

      {/* Main Content */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="handWritten text-6xl md:text-7xl font-bold text-amber-800 mb-4 drop-shadow-lg">
          404
        </h1>
        <h2 className="handWritten text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          Recipe Not Found! 🍽️
        </h2>
        <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
          Oops! It looks like this recipe has wandered off to the spice rack in the sky! 
          <br />
          <span className="text-amber-700 font-semibold">Don't worry, we'll help you find your way back to deliciousness!</span>
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            type="button"
            onClick={handleGoBack}
            className="handWritten group relative overflow-hidden rounded-2xl border-2 border-dashed border-amber-600 bg-amber-100 px-8 py-4 text-lg font-semibold text-amber-800 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <span className="relative z-10 flex items-center gap-2">
              ← Go Back
            </span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          <Link
            to="/"
            className="handWritten group relative overflow-hidden rounded-2xl border-2 border-dashed border-recipecentral bg-recipecentral px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <span className="relative z-10 flex items-center gap-2">
              🏠 Go Home
            </span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>

          <Link
            to="/recipes"
            className="handWritten group relative overflow-hidden rounded-2xl border-2 border-dashed border-amber-800 bg-amber-800 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <span className="relative z-10 flex items-center gap-2">
              🔍 Browse Recipes
            </span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        </div>
      </div>

      {/* Fun Quote */}
      <div className="mt-12 text-center">
        <p className="handWritten text-md text-recipecentral-dark italic">
          "The best recipes are the ones you discover by accident!"
        </p>
      </div>
    </div>
  );
}
