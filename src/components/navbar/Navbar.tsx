import Logo from '../shared/Logo';
import NavItem from '../shared/NavItem';

function Navbar() {
  return (
    <nav className="bg-recipecentral-light shadow-lg fixed top-0 left-0 right-0 z-50">
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
          <NavItem href="/Groups" text="Groups" />
          <NavItem href="/recipes" text="Recipes" />
          <NavItem href="/about" text="About" />
          <div className="text-black">
            <a
              className="inline-block py-2 px-4 bg-recipecentral rounded hover:bg-recipecentral-dark text-black hover:text-white font-semibold shadow-2xl transform transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              href="/login"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
