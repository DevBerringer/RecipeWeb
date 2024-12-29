import React, { useState } from 'react';

interface CategoryCardProps {
  name: string;
  imgPath: string;
}

export default function CategoryCard({ name, imgPath }: CategoryCardProps) {
  const [isClicked, setIsClicked] = useState(false);

  const addUnderline = () => {
    setIsClicked((prevIsClicked) => !prevIsClicked); // Toggle the value of isClicked
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    // Check if the Enter key is pressed (key code 13)
    if (event.key === 'Enter') {
      addUnderline();
    }
  };

  return (
    <div
      onClick={addUnderline}
      onKeyDown={handleKeyPress} // Add the onKeyDown event listener
      role="button"
      tabIndex={0}
      className={`flex-col items-center rounded-xl hover:border-opacity-30 hover:bg-recipecentral-light ${
        isClicked ? 'underline' : ''
      }`}
    >
      <div className="h-[100px] w-[100px]">
        {imgPath !== '' ? (
          <img src={imgPath} alt="no Pic" />
        ) : (
          <img src="public\assets\commingSoon.jpg" alt="no Pic" />
        )}
      </div>
      <div className="text-center">{name}</div>
      <div className="mx-10 mb-10 cursor-pointer text-center" />
    </div>
  );
}
