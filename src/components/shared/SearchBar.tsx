function SearchBar() {
  return (
    <div className="my-auto align-self-middle align-middle right-0 mr-0 text-black">
      <label htmlFor="searchId" className="relative block">
        <span className="sr-only">Search</span>
        <span className="absolute inset-y-0 left-0 flex items-center pl-2" />
        <input
          className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
          placeholder="Search for anything..."
          type="text"
          name="search"
          id="searchId"
        />
      </label>
    </div>
  );
}

export default SearchBar;
