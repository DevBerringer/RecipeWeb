import { useRecipeDraft } from '../../../../../contexts/RecipeDraftContext';
import { useCategories } from '../../../../../contexts/CategoriesContext';
import RecipeTag from '../../componenets/RecipeTag';

export default function RecipeTags() {
  const { recipeDraft } = useRecipeDraft();
  const { categories } = useCategories();

  if (!categories) return null;

  const tagSections = [
    {
      title: '🍽️ Cuisines',
      tags: recipeDraft.cuisineTypes.map(
        (id) => categories.RegionCategories.find((c) => c.id === id)?.name || id
      ),
      baseColor: 'bg-amber-50 text-amber-800',
      borderColor: 'rgba(100, 70, 0, 0.2)',
      shadowColor: 'rgba(100, 70, 0, 0.08)',
    },
    {
      title: '🍱 Meal Types',
      tags: recipeDraft.mealTypes.map(
        (id) => categories.MealCategories.find((m) => m.id === id)?.name || id
      ),
      baseColor: 'bg-amber-50 text-amber-800',
      borderColor: 'rgba(0, 70, 0, 0.2)',
      shadowColor: 'rgba(0, 70, 0, 0.08)',
    },
    {
      title: '🍞 Food Types',
      tags: recipeDraft.foodTypes.map(
        (id) => categories.FoodCategories.find((f) => f.id === id)?.name || id
      ),
      baseColor: 'bg-amber-50 text-amber-800',
      borderColor: 'rgba(70, 0, 70, 0.2)',
      shadowColor: 'rgba(70, 0, 70, 0.08)',
    },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
      {tagSections
        .filter((section) => section.tags.length > 0)
        .map(({ title, tags, baseColor, borderColor, shadowColor }, idx) => (
          <div key={idx} className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <div className="flex flex-wrap gap-3">
              {tags.map((tag, tagIdx) => (
                <RecipeTag
                  key={tagIdx}
                  label={tag}
                  idx={tagIdx}
                  baseColor={baseColor}
                  borderColor={borderColor}
                  shadowColor={shadowColor}
                />
              ))}
            </div>
          </div>
        ))}
    </section>
  );
}
