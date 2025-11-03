export {};

declare global {
  interface Window {
    $env: {
      name: string;
      hosts: {
        baseUrl: string;
        auth: {
          login: string;
          signOut: string;
          register: string;
          check: string;
          forgotPassword: string;
          refresh: string; // Bearer token refresh endpoint
        };
        apis: {
          updateUser: string;
          recipe: string;
          pagedRecipes: string;
          addRecipe: string;
          uploadImage: string;
          categories: string;
          users: string;
        };
      };
    };
  }
}

export type Recipe = {
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

export type ImageItem = {
  src: string;
  alt: string;
};

export type CustomCarouselProps = {
  images: ImageItem[];
};

export type CategoriesData = {
  id: string;
  RegionCategories: Regions[];
  FoodCategories: Meals[];
  MealCategories: Foods[];
};

export type Regions = {
  id: string;
  name: string;
  dishes: string[];
  imagePath: string;
};

export type Meals = {
  id: string;
  name: string;
  imagePath: string;
};

export type Foods = {
  id: string;
  name: string;
  imagePath: string;
};
