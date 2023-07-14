import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from '@material-tailwind/react';

interface RecipeCardProps {
  name: string;
  description: string;
  cookTime: string;
}

export default function RecipeCard({
  name,
  description,
  cookTime,
}: RecipeCardProps) {
  return (
    <Card className="w-96 bg-recipecentral rounded-lg shadow-lg">
      <Typography variant="h4" color="blue-gray" className=" text-center mb-2">
        {name}
      </Typography>
      <CardHeader floated={false} className="h-80">
        <img src="public\assets\NoFoodPicture.jpg" alt="Recipe" />
      </CardHeader>
      <CardBody className="text-center">
        <Typography color="blue" className="font-medium" textGradient>
          {description}
        </Typography>
      </CardBody>
      <CardFooter className="flex justify-center gap-7 pt-2">
        <Typography color="blue" className="font-medium" textGradient>
          CookTime: {cookTime}
        </Typography>
      </CardFooter>
    </Card>
  );
}
