import { useState } from 'react';

interface SquarePictureButton {
  imageUrl: string;
  name: string;
}

interface SquarePictureButtonProps {
  squarePictureButton: SquarePictureButton;
}

function SquarePictureButtonOut({
  squarePictureButton,
}: SquarePictureButtonProps) {
  const [pictureButtonName, setpictureButtonName] = useState(
    squarePictureButton.name
  );

  return (
    <button
      type="button"
      className=" grid grid-cols-1 w-50 h-50 items-center justify-center rounded-md"
    >
      <img
        src={squarePictureButton.imageUrl}
        alt="Button"
        className=" items-center justify-center"
      />
      <p className="items-center justify-center ">{squarePictureButton.name}</p>
    </button>
  );
}

export default SquarePictureButtonOut;
