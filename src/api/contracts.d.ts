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
  Serves: string;
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
  CreatedDate: Date;
};

type User = {
  Id: string;
  Email: string;
  Username: string;
  ImagePath: string;
  Description: string;
  Groups: Group[];
  Roles: string[];
};

type UserUpdate = {
  Id: string;
  ImagePath: string;
  Description: string;
};

type Group = {
  id: string;
  owner: User;
  members: User[];
};
