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
    <div className="recipe-card-container h-full">
      <Card className="border-red w-2/4">
        <Typography variant="h4" className="text-center mb-2">
          {name}
        </Typography>
        <CardHeader>
          <img
            src={picture || '/assets/parchment-paper-background.jpg'}
            alt="Recipe"
            className="w-full h-40 object-cover"
          />
        </CardHeader>
        <CardBody className="text-center">
          {[1, 2, 3, 4, 5].map((index) => (
            <span
              key={index}
              className={`${
                index <= rating ? 'text-yellow-500' : 'text-gray-300'
              } fa fa-star`}
            />
          ))}
        </CardBody>
        <CardFooter className="flex justify-center items-center gap-7 pt-2">
          <Typography color="blue" className="font-medium">
            CookTime: {cookTime}
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
}
