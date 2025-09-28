import React, { createContext, useContext, useState, useCallback } from 'react';
import { ValidationError, RecipeFormData, validateRecipe, getFieldError, hasFieldError } from '../utils/validation';

interface ValidationContextType {
  errors: ValidationError[];
  validateField: (field: string, value: any) => void;
  validateTimeFields: (prepTime: number, cookTime: number) => void;
  validateAll: (recipeData: RecipeFormData) => boolean;
  clearErrors: () => void;
  clearFieldError: (field: string) => void;
  getFieldError: (field: string) => string | undefined;
  hasFieldError: (field: string) => boolean;
  setErrors: (errors: ValidationError[]) => void;
}

const ValidationContext = createContext<ValidationContextType | undefined>(undefined);

export function ValidationProvider({ children }: { children: React.ReactNode }) {
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const validateField = useCallback((field: string, value: any) => {
    setErrors(prev => prev.filter(error => error.field !== field));
    
    // Basic field validation
    if (field === 'name') {
      if (!value || value.trim().length === 0) {
        setErrors(prev => [...prev, { field, message: 'Recipe name is required' }]);
      } else if (value.trim().length < 3) {
        setErrors(prev => [...prev, { field, message: 'Recipe name must be at least 3 characters long' }]);
      }
    } else if (field === 'description') {
      if (!value || value.trim().length === 0) {
        setErrors(prev => [...prev, { field, message: 'Recipe description is required' }]);
      } else if (value.trim().length < 10) {
        setErrors(prev => [...prev, { field, message: 'Description must be at least 10 characters long' }]);
      }
    } else if (field === 'prepTimeMin' || field === 'cookTimeMin') {
      if (value < 0) {
        setErrors(prev => [...prev, { field, message: 'Time cannot be negative' }]);
      } else if (value > 1440) {
        setErrors(prev => [...prev, { field, message: 'Time cannot exceed 24 hours (1440 minutes)' }]);
      }
    } else if (field === 'serves') {
      if (value <= 0) {
        setErrors(prev => [...prev, { field, message: 'Number of servings must be at least 1' }]);
      } else if (value > 50) {
        setErrors(prev => [...prev, { field, message: 'Number of servings cannot exceed 50' }]);
      }
    }
  }, []);

  const validateTimeFields = useCallback((prepTime: number, cookTime: number) => {
    // Clear existing time field errors
    setErrors(prev => prev.filter(error => 
      error.field !== 'prepTimeMin' && 
      error.field !== 'cookTimeMin' && 
      error.field !== 'totalTime'
    ));

    // Handle undefined values (empty inputs)
    const safePrepTime = prepTime === undefined ? 0 : prepTime;
    const safeCookTime = cookTime === undefined ? 0 : cookTime;

    // Validate individual fields
    if (safePrepTime < 0) {
      setErrors(prev => [...prev, { field: 'prepTimeMin', message: 'Prep time cannot be negative' }]);
    } else if (safePrepTime > 1440) {
      setErrors(prev => [...prev, { field: 'prepTimeMin', message: 'Prep time cannot exceed 24 hours (1440 minutes)' }]);
    }

    if (safeCookTime < 0) {
      setErrors(prev => [...prev, { field: 'cookTimeMin', message: 'Cook time cannot be negative' }]);
    } else if (safeCookTime > 1440) {
      setErrors(prev => [...prev, { field: 'cookTimeMin', message: 'Cook time cannot exceed 24 hours (1440 minutes)' }]);
    }

    // Check total time validation
    if (safePrepTime === 0 && safeCookTime === 0) {
      setErrors(prev => [
        ...prev,
        { field: 'prepTimeMin', message: 'Either prep time or cook time must be greater than 0' },
        { field: 'cookTimeMin', message: 'Either prep time or cook time must be greater than 0' }
      ]);
    }
  }, []);

  const validateAll = useCallback((recipeData: RecipeFormData): boolean => {
    const result = validateRecipe(recipeData);
    setErrors(result.errors);
    console.log(errors);
    return result.isValid;
  }, []);

  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);

  const clearFieldError = useCallback((field: string) => {
    setErrors(prev => prev.filter(error => error.field !== field));
  }, []);

  const getFieldErrorCallback = useCallback((field: string) => {
    return getFieldError(errors, field);
  }, [errors]);

  const hasFieldErrorCallback = useCallback((field: string) => {
    return hasFieldError(errors, field);
  }, [errors]);

  const setErrorsCallback = useCallback((newErrors: ValidationError[]) => {
    setErrors(newErrors);
  }, []);

  return (
    <ValidationContext.Provider
      value={{
        errors,
        validateField,
        validateTimeFields,
        validateAll,
        clearErrors,
        clearFieldError,
        getFieldError: getFieldErrorCallback,
        hasFieldError: hasFieldErrorCallback,
        setErrors: setErrorsCallback,
      }}
    >
      {children}
    </ValidationContext.Provider>
  );
}

export function useValidation() {
  const context = useContext(ValidationContext);
  if (context === undefined) {
    throw new Error('useValidation must be used within a ValidationProvider');
  }
  return context;
}
