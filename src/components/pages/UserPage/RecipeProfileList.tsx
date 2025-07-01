import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UseRecipe } from '../../../contexts/recipesContext';
import RecipeCardProfile from './RecipeCardProfile';

interface RecipeProfileListProps {
  createdByFilter: string | null;
}

function RecipeProfileList({ createdByFilter }: RecipeProfileListProps) {
  const { recipe } = UseRecipe();
  const [filter, setFilter] = useState('');

  // Filter recipes based on the selected food type and created by (if createdByFilter is not null)
  const filteredRecipes = recipe.filter(
    (item) =>
      (!createdByFilter || item.CreatedBy === createdByFilter) &&
      item.Name.toLowerCase().includes(filter.toLowerCase())
  );

  // Handle filtering change for recipe name
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="mt-4 flex">
          <input
            type="text"
            id="recipeNameFilter"
            className="flex-2 focus:shadow-outline appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            placeholder="Enter recipe name..."
            value={filter}
            onChange={handleFilterChange}
          />
        </div>
        <div className="pt-2 text-right text-2xl">
          Recipes {filteredRecipes?.length}
        </div>
      </div>
      {filteredRecipes.length > 0 ? (
        filteredRecipes.map((item) => (
          <div key={item.Id}>
            <div className="h-[1px] w-full bg-gray-300" />
            <Link
              to={`${`../../recipes/${item.Id}`}`}
              key={item.Id}
              className="m-2 my-5"
            >
              <div className="grid w-full grid-cols-4 gap-4">
                <div className="col-span-4 flex max-h-[400px] max-w-lg flex-col justify-between pt-10 text-lg">
                  <div>
                    <p className="text-2xl font-bold">{item.Description}</p>
                  </div>
                  <div className="pt-3">
                    Categories: {item.FoodTypes.join(', ')}
                  </div>{' '}
                  <div className=" pt-3 text-right">
                    PrepTime: {item.PrepTimeMin} min.
                  </div>
                  <div className="pt-3 text-right">
                    CookTime: {item.CookTimeMin} min.
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-gray-500">Created Date: </span>
                {new Date(item.CreatedDate).toLocaleDateString()}
              </div>
            </Link>
          </div>
        ))
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

export default RecipeProfileList;
