import { createContext, useContext, useState, ReactNode } from 'react';

export type RecipeDraft = {
  name: string;
  cuisineTypes: string[];
  mealTypes: string[];
  foodTypes: string[];
  isVegetarian: boolean | null;
  isSpicy: boolean | null;
  cookTimeMin: number;
  prepTimeMin: number;
  serves: number;
  description: string;
  ingredients: string[];
  steps: string[];
  selectedImage: string | null;
  imageFile: File | null;
};

type RecipeDraftContextType = {
  recipeDraft: RecipeDraft;
  setRecipeDraft: React.Dispatch<React.SetStateAction<RecipeDraft>>;
};

const defaultRecipeDraft: RecipeDraft = {
  name: '',
  cuisineTypes: [],
  mealTypes: [],
  foodTypes: [],
  isVegetarian: null,
  isSpicy: null,
  cookTimeMin: 0,
  prepTimeMin: 0,
  serves: 0,
  description: '',
  ingredients: Array(4).fill(''),
  steps: Array(2).fill(''),
  selectedImage: null,
  imageFile: null,
};

const RecipeDraftContext = createContext<RecipeDraftContextType | undefined>(
  undefined
);

export const useRecipeDraft = () => {
  const context = useContext(RecipeDraftContext);
  if (!context) {
    throw new Error('useRecipeDraft must be used within a RecipeDraftProvider');
  }
  return context;
};

export function RecipeDraftProvider({ children }: { children: ReactNode }) {
  const [recipeDraft, setRecipeDraft] =
    useState<RecipeDraft>(defaultRecipeDraft);

  return (
    <RecipeDraftContext.Provider value={{ recipeDraft, setRecipeDraft }}>
      {children}
    </RecipeDraftContext.Provider>
  );
}
