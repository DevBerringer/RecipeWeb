import { useContext } from 'react';

import { ReactComponent as NoodleSVG } from '../../assets/NoodleCategory.svg';
import { ReactComponent as SnackSVG } from '../../assets/SnackCategory.svg';
import { ReactComponent as SandwichSVG } from '../../assets/SandwichCategory.svg';
import { ReactComponent as DessertSVG } from '../../assets/DessertCategory.svg';
import { ReactComponent as RiceSVG } from '../../assets/RiceCategory.svg';
import { ReactComponent as WrapSVG } from '../../assets/WrapCategory.svg';
import { RecipesContext } from '../../contexts/recipesContext';

function CategorySelector() {
  const recipeContext = useContext(RecipesContext);

  const categories = [
    {
      id: 0,
      name: 'Noodle',
      SVGComp: <NoodleSVG className="fill-current h-full w-full" />,
    },
    {
      id: 1,
      name: 'Sandwich',
      SVGComp: <SandwichSVG className="fill-current h-full w-full" />,
    },
    {
      id: 2,
      name: 'Rice',
      SVGComp: <RiceSVG className="fill-current h-full w-full" />,
    },
    {
      id: 3,
      name: 'Wrap',
      SVGComp: <WrapSVG className="fill-current h-full w-full" />,
    },
    {
      id: 4,
      name: 'Snack',
      SVGComp: <SnackSVG className="fill-current h-full w-full" />,
    },
    {
      id: 5,
      name: 'Dessert',
      SVGComp: <DessertSVG className="fill-current h-full w-full" />,
    },
    // Add more categories as needed
  ];

  const handleCategorySelection = (category) => {
    let updatedFoodTypes = [...recipeContext?.foodTypes];
    if (!updatedFoodTypes.includes(category.name)) {
      updatedFoodTypes.push(category.name);
    } else {
      updatedFoodTypes = updatedFoodTypes.filter(
        (item) => item !== category.name
      );
    }
    recipeContext?.setFoodTypes(updatedFoodTypes);
  };

  return (
    <div className="text-center mx-auto">
      <label htmlFor="Category" className="mr-2 text-3xl font-semibold">
        Select all Relevant Categories:
      </label>
      <div className="justify-center flex flex-wrap">
        {categories.map((category) => (
          <div
            id="Category"
            onClick={() => handleCategorySelection(category)}
            key={category.id}
            className={`mb-10 mx-1 h-32 w-32 cursor-pointer text-center text-recipecentral ${
              recipeContext?.foodTypes.includes(category.name)
                ? 'text-black bg-gray-50 rounded-t-xl'
                : ''
            }`}
          >
            {category.SVGComp || ''}
            <div
              className={`cursor-pointer text-center ${
                recipeContext?.foodTypes.includes(category.name)
                  ? 'text-black underline bg-gray-50 rounded-b-xl'
                  : ''
              }`}
            >
              {category.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategorySelector;
