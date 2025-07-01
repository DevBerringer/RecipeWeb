import { Card, CardHeader, Typography } from '@material-tailwind/react';

interface RecipeCardProps {
  name: string;
  picture: string;
}

export default function RecipeCard({ name, picture }: RecipeCardProps) {
  return (
    <div className="recipe-card-container h-full">
      <Card className="border-red">
        <Typography variant="h4" className="mx-6 mb-2 text-3xl">
          {name}
        </Typography>
        <CardHeader className="max-w-[450px]">
          <img
            src={picture || '/assets/noFood.jpg'}
            alt="Recipe"
            className="max-h-[300px] w-[450px] object-fill"
          />
        </CardHeader>
      </Card>
    </div>
  );
}
