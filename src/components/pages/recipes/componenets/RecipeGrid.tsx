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
    <div className="grid grid-cols-1 justify-center xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {recipes.map((item) => (
        <Link to={`recipe/${item.Id}`} key={item.Id} className="m-2 my-5">
          <div className="h-full w-full min-w-[256px]">
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


