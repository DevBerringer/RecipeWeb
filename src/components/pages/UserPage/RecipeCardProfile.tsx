/* eslint-disable react/prop-types */
/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Card, CardHeader, Typography } from '@material-tailwind/react';

type RecipeCardProps = React.ComponentProps<typeof Card> & {
  name: string;
  picture: string;
};

export default function RecipeCard({
  name,
  picture,
  className,
  ...rest
}: RecipeCardProps) {
  return (
    <div className={`recipe-card-container h-full ${className ?? ''}`}>
      <Card className="border border-red-500" {...rest}>
        <CardHeader
          floated={false}
          color="transparent"
          className="max-w-[450px] p-0"
          children={undefined}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <img
            src={picture || '/assets/noFood.jpg'}
            alt="Recipe"
            className="max-h-[300px] w-full object-cover"
          />
        </CardHeader>
        <div className="p-6">
          <Typography variant="h4" color="blue-gray" className="mb-2">
            {name}
          </Typography>
        </div>
      </Card>
    </div>
  );
}
