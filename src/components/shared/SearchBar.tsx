import { UseRecipe } from '../../contexts/recipesContext';

function SearchBar() {
  const { search, setSearch } = UseRecipe();

  return (
    <div className="items-center justify-center">
      <input
        type="text"
        placeholder="Search..."
        className="px-4 py-2 border border-gray-300 rounded focus:outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
