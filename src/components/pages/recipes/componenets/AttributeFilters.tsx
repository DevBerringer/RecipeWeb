type Props = {
  isVegetarian: boolean | null;
  setIsVegetarian: (v: boolean | null) => void;
  isSpicy: boolean | null;
  setIsSpicy: (v: boolean | null) => void;
  maxCookTime: number | null;
  setMaxCookTime: (n: number | null) => void;
};

export default function AttributeFilters({
  isVegetarian,
  setIsVegetarian,
  isSpicy,
  setIsSpicy,
  maxCookTime,
  setMaxCookTime,
}: Props) {
  return (
    <div className="mx-auto mt-4 grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-3">
      <div className="rounded-2xl border-2 border-dashed border-lime-900/30 bg-lime-50/60 p-3 shadow-sm">
        <label className="mb-2 block text-sm font-semibold text-lime-900">Diet</label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setIsVegetarian(true)}
            className={`rounded-md border px-3 py-1 text-sm ${
              isVegetarian === true
                ? 'border-lime-700 bg-lime-200 text-lime-900'
                : 'border-lime-900/20 bg-white text-lime-900 hover:border-lime-700'
            }`}
          >
            Vegetarian
          </button>
          <button
            type="button"
            onClick={() => setIsVegetarian(false)}
            className={`rounded-md border px-3 py-1 text-sm ${
              isVegetarian === false
                ? 'border-lime-700 bg-lime-200 text-lime-900'
                : 'border-lime-900/20 bg-white text-lime-900 hover:border-lime-700'
            }`}
          >
            Not Vegetarian
          </button>
          <button
            type="button"
            onClick={() => setIsVegetarian(null)}
            className="rounded-md border border-lime-900/20 bg-white px-3 py-1 text-sm text-lime-900 hover:border-lime-700"
          >
            Any
          </button>
        </div>
      </div>

      <div className="rounded-2xl border-2 border-dashed border-rose-900/30 bg-rose-50/60 p-3 shadow-sm">
        <label className="mb-2 block text-sm font-semibold text-rose-900">Spicy</label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setIsSpicy(true)}
            className={`rounded-md border px-3 py-1 text-sm ${
              isSpicy === true
                ? 'border-rose-700 bg-rose-200 text-rose-900'
                : 'border-rose-900/20 bg-white text-rose-900 hover:border-rose-700'
            }`}
          >
            Spicy
          </button>
          <button
            type="button"
            onClick={() => setIsSpicy(false)}
            className={`rounded-md border px-3 py-1 text-sm ${
              isSpicy === false
                ? 'border-rose-700 bg-rose-200 text-rose-900'
                : 'border-rose-900/20 bg-white text-rose-900 hover:border-rose-700'
            }`}
          >
            Not Spicy
          </button>
          <button
            type="button"
            onClick={() => setIsSpicy(null)}
            className="rounded-md border border-rose-900/20 bg-white px-3 py-1 text-sm text-rose-900 hover:border-rose-700"
          >
            Any
          </button>
        </div>
      </div>

      <div className="rounded-2xl border-2 border-dashed border-sky-900/30 bg-sky-50/60 p-3 shadow-sm">
        <label className="mb-2 block text-sm font-semibold text-sky-900">Max Cook Time (min)</label>
        <input
          type="number"
          min={0}
          value={maxCookTime ?? ''}
          onChange={(e) => setMaxCookTime(e.target.value ? Number(e.target.value) : null)}
          className="w-full rounded-md border border-sky-900/20 bg-white px-3 py-2 text-base shadow-inner focus:outline-none focus:ring-2 focus:ring-sky-700/30"
        />
      </div>
    </div>
  );
}


