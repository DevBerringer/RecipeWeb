import { CategoriesData } from '../../../../contexts/CategoriesContext';

type Props = {
  categories: CategoriesData | null;
  selectedMeals: string[];
  setSelectedMeals: (updater: (prev: string[]) => string[]) => void;
  selectedFoods: string[];
  setSelectedFoods: (updater: (prev: string[]) => string[]) => void;
  selectedRegions: string[];
  setSelectedRegions: (updater: (prev: string[]) => string[]) => void;
};

export default function CategoryFilters({
  categories,
  selectedMeals,
  setSelectedMeals,
  selectedFoods,
  setSelectedFoods,
  selectedRegions,
  setSelectedRegions,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Meal Types */}
      <div className="rounded-2xl border-2 border-dashed border-emerald-900/30 bg-emerald-50/60 p-3 shadow-sm">
        <label className="mb-2 block text-sm font-semibold text-emerald-900">Meal</label>
        <div className="flex flex-wrap gap-2">
          {categories?.MealCategories.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() =>
                setSelectedMeals((prev) =>
                  prev.includes(m.id) ? prev.filter((x) => x !== m.id) : [...prev, m.id]
                )
              }
              className={`rounded-full border px-3 py-1 text-sm transition ${
                selectedMeals.includes(m.id)
                  ? 'border-emerald-700 bg-emerald-200 text-emerald-900'
                  : 'border-emerald-900/20 bg-white text-emerald-900 hover:border-emerald-700'
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>
      </div>

      {/* Food Types */}
      <div className="rounded-2xl border-2 border-dashed border-fuchsia-900/30 bg-fuchsia-50/60 p-3 shadow-sm">
        <label className="mb-2 block text-sm font-semibold text-fuchsia-900">Food</label>
        <div className="flex flex-wrap gap-2">
          {categories?.FoodCategories.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() =>
                setSelectedFoods((prev) =>
                  prev.includes(f.id) ? prev.filter((x) => x !== f.id) : [...prev, f.id]
                )
              }
              className={`rounded-full border px-3 py-1 text-sm transition ${
                selectedFoods.includes(f.id)
                  ? 'border-fuchsia-700 bg-fuchsia-200 text-fuchsia-900'
                  : 'border-fuchsia-900/20 bg-white text-fuchsia-900 hover:border-fuchsia-700'
              }`}
            >
              {f.name}
            </button>
          ))}
        </div>
      </div>

      {/* Regions */}
      <div className="rounded-2xl border-2 border-dashed border-amber-900/30 bg-amber-50/60 p-3 shadow-sm">
        <label className="mb-2 block text-sm font-semibold text-amber-900">Cuisine</label>
        <div className="flex flex-wrap gap-2">
          {categories?.RegionCategories.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() =>
                setSelectedRegions((prev) =>
                  prev.includes(r.name) ? prev.filter((x) => x !== r.name) : [...prev, r.name]
                )
              }
              className={`rounded-full border px-3 py-1 text-sm transition ${
                selectedRegions.includes(r.name)
                  ? 'border-amber-700 bg-amber-200 text-amber-900'
                  : 'border-amber-900/20 bg-white text-amber-900 hover:border-amber-700'
              }`}
            >
              {r.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}


