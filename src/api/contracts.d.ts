type SelectedType = {
  name: string;
};

type RecipeResponseDto = {
  Message: string;
  Success: boolean;
  RecipeDTOs: RecipeDTO[];
};

type RecipeDTO = {
  Id: ObjectId | null;
  Name: string;
  Picture: string;
  SpicyLevel: boolean;
  Description: string;
  CookTimeMin: number;
  Ingredients: string[];
  DifOfIngredient: number | null;
  Steps: string[];
  Rating: number | null;
  Comments: string[];
  CreatedDate: Date;
};
