import { Link } from 'react-router-dom';
import Logo from '../shared/Logo';

import { UseAuth } from '../../contexts/authContext';
import ProfileNav from './ProfileNav';

function Navbar() {
  const { user } = UseAuth();

  return (
    <nav className="shadow-lg text-lg bg-white fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Logo />
        <div className="flex items-center space-x-4">
          <Link to="categories">Categories</Link>
          <Link to="recipes">Recipes</Link>
          {!user ? (
            <div className="text-black">
              <Link
                to="login"
                className="inline-block py-2 px-4 bg-recipecentral rounded hover:bg-recipecentral-dark text-black hover:text-white shadow-2xl hover:shadow-lg"
              >
                Login
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <div>
                <Link
                  to="../newRecipe"
                  className="inline-block py-2 px-4 bg-recipecentral rounded hover:bg-recipecentral-dark text-black hover:text-white shadow-2xl hover:shadow-lg"
                >
                  Add a new recipe!
                </Link>
              </div>
              <div className="pt-2 px-5 rounded-lg hover:bg-gray-100">
                <ProfileNav />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
