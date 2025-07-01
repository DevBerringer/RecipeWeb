import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCategories } from '../api/api'; // adjust path if needed
// Removed: import { CategoriesData } from '../index'; // This was causing confusion if CategoriesData was defined elsewhere

export type Category = {
  id: string;
  name: string;
  imagePath: string;
};

export type Meals = Category;

export type Foods = Category;

export type Regions = Category;

// Renamed from CategoriesDataMealFood to CategoriesData for consistency
export type CategoriesData = {
  id: string;
  RegionCategories: Regions[];
  FoodCategories: Meals[];
  MealCategories: Foods[];
};

type CategoriesContextType = {
  categories: CategoriesData | null; // Now refers to the exported CategoriesData
  loading: boolean;
  error: string | null;
  refreshCategories: () => void;
};

const CategoriesContext = createContext<CategoriesContextType | undefined>(
  undefined
);

export const useCategories = () => {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error('useCategories must be used within a CategoriesProvider');
  }
  return context;
};

export const CategoriesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [categories, setCategories] = useState<CategoriesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await getCategories();
      setCategories(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch categories.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoriesContext.Provider
      value={{ categories, loading, error, refreshCategories: fetchCategories }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};