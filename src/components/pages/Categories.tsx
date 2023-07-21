import { useState } from 'react';
import { Link } from 'react-router-dom';
import CategoryCard from '../shared/CatagoryCard';
import SearchBar from '../shared/SearchBar';

import { ReactComponent as NoodleSVG } from '../../assets/NoodleCategory.svg';
import { ReactComponent as SnackSVG } from '../../assets/SnackCategory.svg';
import { ReactComponent as SandwichSVG } from '../../assets/SandwichCategory.svg';
import { ReactComponent as DessertSVG } from '../../assets/DessertCategory.svg';
import { ReactComponent as RiceSVG } from '../../assets/RiceCategory.svg';
import { ReactComponent as WrapSVG } from '../../assets/WrapCategory.svg';

function SVGNoodle() {
  return <NoodleSVG />;
}
function SVGSandwich() {
  return <SandwichSVG />;
}
function SVGRice() {
  return <RiceSVG />;
}
function SVGWrap() {
  return <WrapSVG />;
}
function SVGSnack() {
  return <SnackSVG />;
}
function SVGDessert() {
  return <DessertSVG />;
}

function Categories() {
  const [filter, setFilter] = useState('');

  const categories = [
    {
      id: 0,
      name: 'Noodle',
      catImage: '/assets/categories/NoodleCategory.jpg',
      childComponent: SVGNoodle,
    },
    {
      id: 1,
      name: 'Sandwich',
      catImage: '/assets/categories/SandwichCategory.jpg',
      childComponent: SVGSandwich,
    },
    {
      id: 2,
      name: 'Rice',
      catImage: '/assets/categories/RiceCategory.jpg',
      childComponent: SVGRice,
    },
    {
      id: 3,
      name: 'Wrap',
      catImage: '/assets/categories/WrapCategory.jpg',
      childComponent: SVGWrap,
    },
    {
      id: 4,
      name: 'Snack',
      catImage: '/assets/categories/SnackCategory.jpg',
      childComponent: SVGSnack,
    },

    {
      id: 5,
      name: 'Dessert',
      catImage: '/assets/categories/DessertCategory.jpg',
      childComponent: SVGDessert,
    },
    // Add more categories as needed
  ];

  // Filter recipes based on the selected food type
  const filteredCategories = categories.filter((item) =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );

  // Handle filtering change
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div>
      <h1 className=" text-center text-4xl font-extrabold text-black">
        <span className="drop-shadow-lg">Welcome to Family Cookbook!</span>
      </h1>
      <div className="flex justify-end mx-auto mb-4">
        <div className="px-4 py-2 text-gray-600 text-lg">Search:</div>
        <SearchBar onChange={handleFilterChange} />
      </div>
      <div className="flex flex-wrap justify-center">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((item) => (
            <Link to="../recipes" key={item.id} className="m-2">
              <CategoryCard
                catImage={item.catImage}
                name={item.name}
                childComponent={
                  item.childComponent ? (
                    item.childComponent
                  ) : (
                    <img
                      src={item.catImage}
                      alt="Login photos"
                      className="h-40 w-40"
                    />
                  )
                }
              />
            </Link>
          ))
        ) : (
          <div className="flex items-center justify-center my-4">
            <div className="max-w-lg bg-gray-100 border border-gray-300 rounded p-4 text-gray-500 text-lg text-center">
              No recipes found
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Categories;
