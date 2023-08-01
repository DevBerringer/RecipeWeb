// ButtonDropdowns.js

import React from 'react';

function ButtonDropdowns() {
  const foodCategories = [
    { name: 'Breakfast' },
    { name: 'Lunch' },
    { name: 'Dinner' },
    { name: 'Dessert' },
    { name: 'Snack' },
    // Add more food categories as needed
  ];

  return (
    <div className="flex flex-wrap justify-center">
      {foodCategories.map((category, index) => (
        <button
          type="button"
          key={index}
          className="bg-recipecentral hover:bg-black hover:text-white my-2 mx-2 py-2 px-4 rounded-md focus:outline-none focus:ring-2"
          style={{ minWidth: '100px' }}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}

export default ButtonDropdowns;
