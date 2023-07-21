type SelectedType = {
  name: string;
};

type RecipeResponseDTO = {
  Message: string;
  Success: boolean;
  RecipeDTOs: Recipe[];
};

type Recipe = {
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
  Rating: number[];
  Comments: string[];
  CreatedDate: Date;
};

type User = {
  Id: objectId;
  Email: string;
  Username: string;
};
