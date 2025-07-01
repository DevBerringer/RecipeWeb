import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCategories } from '../api/api'; // adjust path if needed
import { CategoriesData } from '../index'; // adjust if you have a central types file

export type Category = {
  id: string;
  name: string;
  imagePath: string;
};


type CategoriesContextType = {
  categories: CategoriesData | null;
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
