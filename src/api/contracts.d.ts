type SelectedType = {
  name: string;
};

type RecipeResponseDto = {
  Message: string;
  Success: boolean;
  RecipeDTOs: RecipeDTO[];
};

type RecipeDTO = {
  Id: ObjectId;
  Name: string;
  SpicyLevel: number;
  Description: string;
  CookTimeMin: number;
  Ingredients: string[];
  DifOfIngredient: number | null;
  Steps: string[];
  rating: number | null;
  Comments: string[];
  createdDate: Date;
};
