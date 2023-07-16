import { ReactComponent as NoodleSVG } from '../../assets/NoodleCategory.svg';

interface CategoryCardProps {
  name: string;
  picture: string;
}

export default function CategoryCard({ name, picture }: CategoryCardProps) {
  return (
    <div className="flex items-center">
      <div className="mb-10 cursor-pointer text-center">
        <NoodleSVG className="h-40 w-40" />
        Soup
      </div>
    </div>
  );
}
