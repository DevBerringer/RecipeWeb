import { ChangeEvent, KeyboardEvent } from 'react';

type Props = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
};

export default function SearchBox({ value, onChange, onSearch }: Props) {
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="rounded-2xl border-2 border-dashed border-amber-900/30 bg-amber-50/60 p-3 shadow-sm">
      <label className="mb-2 block text-sm font-semibold text-amber-900">Search</label>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search recipes..."
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyPress}
          className="flex-1 rounded-md border border-amber-900/20 bg-white px-3 py-2 text-base shadow-inner focus:outline-none focus:ring-2 focus:ring-amber-700/30"
        />
        <button
          type="button"
          onClick={onSearch}
          className="handWritten rounded-md bg-recipecentral px-4 py-2 text-white font-semibold shadow-sm hover:bg-recipecentral-dark transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-recipecentral focus:ring-offset-2"
        >
          🔍 Search
        </button>
      </div>
    </div>
  );
}


