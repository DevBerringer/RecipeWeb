import { ReactComponent as NoodleSVG } from '../../assets/NoodleCategory.svg';

interface CategoryCardProps {
  name: string;
  imgPath: string;
}

export default function CategoryCard({ name, imgPath }: CategoryCardProps) {
  return (
    <div className="flex-col items-center rounded-xl hover:border-opacity-30 hover:bg-recipecentral-light">
      <div className="h-[164px] w-[164px]">
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
