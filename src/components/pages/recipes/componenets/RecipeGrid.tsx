import { Link } from 'react-router-dom';
import RecipeCard from '../RecipeCard';

type Recipe = {
  Id: string;
  Name: string;
  SelectedImage: string | null;
  PrepTimeMin: number;
  CookTimeMin: number;
};

export default function RecipeGrid({ recipes }: { recipes: Recipe[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4">
      {recipes.map((item) => (
        <Link to={`recipe/${item.Id}`} key={item.Id} className="block">
          <div className="h-full max-w-[300px] min-w-[256px]">
            <RecipeCard
              selectedImage={item.SelectedImage}
              name={item.Name}
              prepTime={item.PrepTimeMin}
              cookTime={item.CookTimeMin}
            />
          </div>
        </Link>
      ))}
    </div>
  );
}

