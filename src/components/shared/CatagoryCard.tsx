import { ReactComponent as NoodleSVG } from '../../assets/NoodleCategory.svg';

interface CategoryCardProps {
  name: string;
  childComponent?: React.ComponentType;
}

export default function CategoryCard({
  name,
  childComponent: Child,
}: CategoryCardProps) {
  return (
    <div className="flex items-center hover:bg-recipecentral-light">
      <div className="mx-10 mb-10 cursor-pointer text-center">
        {Child && <Child />} {name}
      </div>
    </div>
  );
}

CategoryCard.defaultProps = {
  childComponent: null,
};
