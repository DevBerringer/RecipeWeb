import { Link } from 'react-router-dom';
import Logo from '../shared/Logo';

function Navbar() {
  return (
    <nav className="shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Logo />
        <div className="flex items-center space-x-4">
          <div className="relative flex">
            <input
              type="text"
              placeholder="Search"
              className="py-2 px-4 bg-white rounded-l text-black font-semibold shadow-md focus:outline-none"
            />
            <button
              type="button"
              className="bg-recipecentral hover:bg-recipecentral-dark text-black hover:text-white rounded-r px-4 font-semibold shadow-md focus:outline-none"
            >
              Search
            </button>
          </div>
          <Link to="groups">Groups</Link>
          <Link to="recipes">Recipes</Link>
          <Link to="about">About</Link>
          <div className="text-black">
            <Link
              to="login"
              className="inline-block py-2 px-4 bg-recipecentral rounded hover:bg-recipecentral-dark text-black hover:text-white font-semibold shadow-2xl hover:shadow-lg"
            >
              Login
            </Link>
          </div>
          <div>
            <Link
              to="../newRecipe"
              className="inline-block py-2 px-4 bg-recipecentral rounded hover:bg-recipecentral-dark text-black hover:text-white font-semibold shadow-2xl hover:shadow-lg"
            >
              Add a new recipe!
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
