/* eslint-disable jsx-a11y/img-redundant-alt */
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from '@material-tailwind/react';

interface RecipeCardProps {
  name: string;
  picture: string;
  rating: number;
  cookTime: string;
}

export default function RecipeCard({
  name,
  rating,
  picture,
  cookTime,
}: RecipeCardProps) {
  return (
    <div className="w-full md:w-64 lg:w-72 shadow shadow-slate-400 rounded-lg flex flex-col justify-between cursor-pointer transition-transform group hover:shadow-slate-400 transform hover:scale-105">
      <div className="">
        <img
          src={picture || 'assets/NoFoodPicture.jpg'}
          alt="No picture Uploaded"
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <h2 className="p-4">{name}</h2>
        <p className="p-4">CookTime: {cookTime}</p>
      </div>
      <button
        type="button"
        className="p-4 font-semibold text-lg m-4 border-2 border-recipecentral group-hover:bg-recipecentral group-hover:border-black transition duration-150 ease-in"
      >
        View Recipe
      </button>
    </div>
  );
}
