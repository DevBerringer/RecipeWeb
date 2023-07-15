import { createContext } from 'react';

interface RecipeContextType {
  selectedImage: '';
  setSelectedImage: (title: string) => Promise<void>;
  name: '';
  setName: (title: string) => Promise<void>;
  spicyLevel: false;
  setSpicyLevel: (title: boolean) => Promise<void>;
  description: '';
  setDescription: (title: string) => Promise<void>;
  cookTimeMin: 0;
  setCookTimeMin: (title: number) => Promise<void>;
  ingredients: [];
  setIngredients: (title: string[]) => Promise<void>;
  steps: [];
  setSteps: (title: string[]) => Promise<void>;
}

const RecipesContext = createContext<RecipeContextType | null>(null);

export default RecipesContext;
