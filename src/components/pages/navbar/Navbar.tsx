import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import { UseAuth } from '../../../contexts/authContext';
import ProfileNav from './ProfileNav';
import RecipesDropdown from './RecipesDropdown';

function Navbar() {
  const { user } = UseAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { to: 'recipes', label: 'Recipes', isDropdown: true },
  ];

  return (
    <nav className="handWritten fixed left-0 right-0 top-0 z-50 bg-white text-lg shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Logo />

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center">
          <div className="flex items-center">
            {links.map((link, index) => (
              <div className="flex" key={index}>
                {link.isDropdown ? (
                  <RecipesDropdown />
                ) : (
                  <Link to={link.to} className="px-4 hover:underline">
                    {link.label}
                  </Link>
                )}
                {index < links.length - 1 && (
                  <div className="h-6 border-l border-gray-300" />
                )}
              </div>
            ))}
          </div>

          {!user ? (
            <div className="text-black ml-4">
              <Link
                to="login"
                className="inline-block rounded bg-recipecentral px-4 py-2 text-black shadow-2xl hover:bg-recipecentral-dark hover:text-white hover:shadow-lg"
              >
                Login
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-4 ml-4">
              <Link
                to="../newRecipe/Preview"
                className="inline-block rounded bg-recipecentral px-4 py-2 text-black shadow-2xl hover:bg-recipecentral-dark hover:text-white hover:shadow-lg"
              >
                Add a new recipe!
              </Link>
              <ProfileNav />
            </div>
          )}
        </div>

        {/* Hamburger icon */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile nav menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="flex flex-col p-4 space-y-4">
            {links.map((link, index) => (
              <div key={index}>
                {link.isDropdown ? (
                  <div className="space-y-2">
                    <Link
                      to="/recipes"
                      className="block text-black hover:text-amber-600 hover:underline font-semibold"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Recipes
                    </Link>
                  </div>
                ) : (
                  <Link
                    to={link.to}
                    className="text-black hover:underline"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}

            {!user ? (
              <Link
                to="login"
                className="inline-block rounded bg-recipecentral px-4 py-2 text-black shadow-2xl hover:bg-recipecentral-dark hover:text-white hover:shadow-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            ) : (
              <>
                <Link
                  to="../newRecipe/Preview"
                  className="inline-block rounded bg-recipecentral px-4 py-2 text-black shadow-2xl hover:bg-recipecentral-dark hover:text-white hover:shadow-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Add a new recipe!
                </Link>
                <ProfileNav />
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
