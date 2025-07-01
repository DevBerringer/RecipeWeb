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
        };
        apis: {
          users: string;
          updateUser: string;
          recipes: string;
          addRecipe: string;
          categories: string;
        };
      };
    };
  }
}

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
  imgPath: string;
};

export type Meals = {
  id: string;
  name: string;
  imgPath: string;
};

export type Foods = {
  id: string;
  name: string;
  imgPath: string;
};
