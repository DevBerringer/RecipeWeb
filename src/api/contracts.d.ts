type SelectedType = {
  name: string;
};

type RecipeResponseDTO = {
  Message: string;
  Success: boolean;
  RecipeDTOs: Recipe[];
};

type Recipe = {
  Id: string | null;
  Name: string;
  Picture: string;
  SpicyLevel: boolean;
  Description: string;
  CookTimeMin: number;
  PrepTimeMin: number;
  Ingredients: string[];
  FoodTypes: string[];
  Steps: string[];
  Rating: number[];
  Comments: string[];
  CreatedBy: string;
};

type User = {
  id: string;
  email: string;
  username: string;
  roles: string[];
};
