import { Link } from 'react-router-dom';
import Logo from './Logo';

import { UseAuth } from '../../contexts/authContext';
import ProfileNav from './ProfileNav';

function Navbar() {
  const { user } = UseAuth();

  return (
    <nav className=" fixed left-0 right-0 top-0 z-50 bg-white text-lg shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Logo />
        <div className="flex items-center space-x-4">
          <Link to="categories" className="hover:underline">
            Categories
          </Link>
          <Link to="recipes" className="hover:underline">
            Recipes
          </Link>
          {!user ? (
            <div className="text-black">
              <Link
                to="login"
                className="inline-block rounded bg-recipecentral px-4 py-2 text-black shadow-2xl hover:bg-recipecentral-dark hover:text-white hover:shadow-lg"
              >
                Login
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <div>
                <Link
                  to="../newRecipe"
                  className="inline-block rounded bg-recipecentral px-4 py-2 text-black shadow-2xl hover:bg-recipecentral-dark hover:text-white hover:shadow-lg"
                >
                  Add a new recipe!
                </Link>
              </div>
              <ProfileNav />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
