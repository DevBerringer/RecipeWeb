import axios from 'axios';

// Function to get the axios instance with the current config
const getRecipeApi = () => {
  if (!window.$env) {
    throw new Error(
      'window.$env is not defined. Check your index.html script block.'
    );
  }

  return axios.create({
    baseURL: `https://${window.$env.hosts.baseUrl}`,
    withCredentials: true, // Add this globally here
  });
};

// Security

export const Signin = async (User: { username: string; password: string }) => {
  try {
    const response = await getRecipeApi().post(
      window.$env.hosts.auth.login,
      User,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error Logging in:', error);
    throw error;
  }
};

export const SignOut = async () => {
  try {
    const response = await getRecipeApi().post(
      window.$env.hosts.auth.signOut,
      null
    );
    return response.data;
  } catch (error) {
    console.error('Error Signing out:', error);
    throw error;
  }
};

export const Register = async (User: {
  username: string;
  email: string;
  password: string;
  roles: string[];
}) => {
  try {
    const response = await getRecipeApi().post(
      window.$env.hosts.auth.register,
      User,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error Registering:', error);
    throw error;
  }
};

// Auth
export const getAuthentication = async () => {
  try {
    const response = await getRecipeApi().get(window.$env.hosts.auth.check);
    return response.data;
  } catch (error) {
    console.error('Error Authenticating:', error);
    throw error;
  }
};

// Users
export const getUsers = async () => {
  try {
    const response = await getRecipeApi().get(window.$env.hosts.apis.users);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const updateProfile = async (userUpdate: {
  Id: string | undefined;
  ImagePath: string | null;
  Description: string;
}) => {
  try {
    const response = await getRecipeApi().post(
      window.$env.hosts.apis.updateUser,
      userUpdate,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

// Recipes
export const getRecipes = async () => {
  try {
    const response = await getRecipeApi().get(window.$env.hosts.apis.recipes);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

export const getRecipeById = async (id: string | undefined) => {
  if (!id) {
    throw new Error('Recipe ID is required');
  }
  try {
    const url = window.$env.hosts.apis.recipe.replace('{id}', id);
    const response = await getRecipeApi().get(url);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch recipe with ID ${id}:`, error);
    throw error;
  }
};

export const getPagedRecipes = async (page = 0, pageSize = 4) => {
  try {
    const response = await getRecipeApi().get(
      `${window.$env.hosts.apis.pagedRecipes}?page=${page}&pageSize=${pageSize}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching paginated recipes:', error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await getRecipeApi().get(
      window.$env.hosts.apis.categories
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const addRecipe = async (recipe: {
  Id: null;
  Name: string;
  SelectedImage: string | null;
  SpicyLevel: boolean;
  Description: string;
  CookTimeMin: number;
  PrepTimeMin: number;
  FoodTypes: string[];
  Ingredients: string[];
  Steps: string[];
  Rating: number[] | null;
  CreatedBy: string | undefined;
  MealTypes: string[];
  CuisineTypes: string[];
  IsVegetarian: boolean;
  Serves: number;
}) => {
  try {
    const response = await getRecipeApi().post(
      window.$env.hosts.apis.addRecipe,
      recipe,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error adding recipe:', error);
    throw error;
  }
};

export const uploadRecipeImage = async (file: File | null) => {
  if (file == null) {
    return '';
  }
  const formData = new FormData();
  formData.append('image', file);

  const response = await getRecipeApi().post(
    `${window.$env.hosts.apis.uploadImage}`,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true,
    }
  );

  return response.data; // this is the image URL
};
