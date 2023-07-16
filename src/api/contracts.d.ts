type SelectedType = {
  name: string;
};

type RecipeResponseDTO = {
  Message: string;
  Success: boolean;
  RecipeDTOs: RecipeDTO[];
};

type RecipeDTO = {
  Id: ObjectId | null;
  Name: string;
  FoodTypes: string[];
  Picture: string;
  SpicyLevel: boolean;
  Description: string;
  CookTimeMin: number;
  PrepTimeMin: number;
  Ingredients: string[];
  DifOfIngredient: number | null;
  Steps: string[];
  Rating: number | null;
  Comments: string[];
  CreatedDate: Date;
};
