export interface ValidationError {
  field: string;
  message: string;
}

export interface RecipeValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export interface RecipeFormData {
  name: string;
  description: string;
  prepTimeMin: number;
  cookTimeMin: number;
  serves: number;
  ingredients: string[];
  steps: string[];
  cuisineTypes: string[];
  mealTypes: string[];
  foodTypes: string[];
  selectedImage: string;
}

export function validateRecipe(recipeData: RecipeFormData): RecipeValidationResult {
  const errors: ValidationError[] = [];

  // Recipe name validation
  if (!recipeData.name || recipeData.name.trim().length === 0) {
    errors.push({ field: 'name', message: 'Recipe name is required' });
  } else if (recipeData.name.trim().length < 3) {
    errors.push({ field: 'name', message: 'Recipe name must be at least 3 characters long' });
  } else if (recipeData.name.trim().length > 100) {
    errors.push({ field: 'name', message: 'Recipe name must be less than 100 characters' });
  }

  // Description validation
  if (!recipeData.description || recipeData.description.trim().length === 0) {
    errors.push({ field: 'description', message: 'Recipe description is required' });
  } else if (recipeData.description.trim().length < 10) {
    errors.push({ field: 'description', message: 'Description must be at least 10 characters long' });
  } else if (recipeData.description.trim().length > 500) {
    errors.push({ field: 'description', message: 'Description must be less than 500 characters' });
  }

  // Time validation
  if (recipeData.prepTimeMin < 0) {
    errors.push({ field: 'prepTimeMin', message: 'Prep time cannot be negative' });
  } else if (recipeData.prepTimeMin > 1440) {
    errors.push({ field: 'prepTimeMin', message: 'Prep time cannot exceed 24 hours (1440 minutes)' });
  }

  if (recipeData.cookTimeMin < 0) {
    errors.push({ field: 'cookTimeMin', message: 'Cook time cannot be negative' });
  } else if (recipeData.cookTimeMin > 1440) {
    errors.push({ field: 'cookTimeMin', message: 'Cook time cannot exceed 24 hours (1440 minutes)' });
  }

  // Total time validation
  const totalTime = recipeData.prepTimeMin + recipeData.cookTimeMin;
  if (totalTime === 0) {
    errors.push({ field: 'prepTimeMin', message: 'Either prep time or cook time must be greater than 0' });
    errors.push({ field: 'cookTimeMin', message: 'Either prep time or cook time must be greater than 0' });
  }

  // Serves validation
  if (recipeData.serves <= 0) {
    errors.push({ field: 'serves', message: 'Number of servings must be at least 1' });
  } else if (recipeData.serves > 50) {
    errors.push({ field: 'serves', message: 'Number of servings cannot exceed 50' });
  }

  // Ingredients validation
  const validIngredients = recipeData.ingredients.filter(ingredient => ingredient.trim().length > 0);
  if (validIngredients.length === 0) {
    errors.push({ field: 'ingredients', message: 'At least one ingredient is required' });
  } else if (validIngredients.length > 50) {
    errors.push({ field: 'ingredients', message: 'Cannot have more than 50 ingredients' });
  }

  // Check for empty ingredient entries
  const emptyIngredients = recipeData.ingredients.filter(ingredient => ingredient.trim().length === 0);
  if (emptyIngredients.length > 0) {
    errors.push({ field: 'ingredients', message: 'Please remove empty ingredient entries' });
  }

  // Instructions validation
  const validSteps = recipeData.steps.filter(step => step.trim().length > 0);
  if (validSteps.length === 0) {
    errors.push({ field: 'steps', message: 'At least one instruction step is required' });
  } else if (validSteps.length > 50) {
    errors.push({ field: 'steps', message: 'Cannot have more than 50 instruction steps' });
  }

  // Check for empty instruction entries
  const emptySteps = recipeData.steps.filter(step => step.trim().length === 0);
  if (emptySteps.length > 0) {
    errors.push({ field: 'steps', message: 'Please remove empty instruction entries' });
  }

  // Category validation
  if (recipeData.cuisineTypes.length === 0) {
    errors.push({ field: 'cuisineTypes', message: 'At least one cuisine type must be selected' });
  }

  if (recipeData.mealTypes.length === 0) {
    errors.push({ field: 'mealTypes', message: 'At least one meal type must be selected' });
  }

  if (recipeData.foodTypes.length === 0) {
    errors.push({ field: 'foodTypes', message: 'At least one food type must be selected' });
  }

  // Image validation (optional but if present, should be valid)
  if (recipeData.selectedImage && recipeData.selectedImage.length > 0) {
    // Basic URL validation for data URLs
    if (!recipeData.selectedImage.startsWith('data:image/')) {
      errors.push({ field: 'selectedImage', message: 'Invalid image format' });
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function getFieldError(errors: ValidationError[], field: string): string | undefined {
  return errors.find(error => error.field === field)?.message;
}

export function hasFieldError(errors: ValidationError[], field: string): boolean {
  return errors.some(error => error.field === field);
}
