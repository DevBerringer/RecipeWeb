import { Link } from 'react-router-dom';

import CategoryCard from '../recipes/CategoryCard';
import { Foods, Meals, Regions } from '../..';

interface CategoriesListProps {
  categoryList: Regions[] | Meals[] | Foods[] | undefined;
}

function CategoriesList({ categoryList }: CategoriesListProps) {
  return (
    <div className="flex flex-wrap justify-center">
      {categoryList && categoryList.length > 0 ? (
        categoryList.map((item) => (
          <Link to="../recipes" key={item.id} className="m-2">
            <CategoryCard imgPath={item.imgPath} name={item.name} />
          </Link>
        )) // <-- Add the closing parenthesis here
      ) : (
        <div className="my-4 flex items-center justify-center">
          <div className="max-w-lg rounded border border-gray-300 bg-gray-100 p-4 text-center text-lg text-gray-500">
            No recipes found
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoriesList;
