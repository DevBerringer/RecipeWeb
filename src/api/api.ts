import axios from 'axios';

const recipeApi = axios.create({
  baseURL: `http://${window.$env.hosts.baseUrl}`,
});

// Security

export const Signin = async (User: { username: string; password: string }) => {
  try {
    const response = await recipeApi.post(window.$env.hosts.auth.login, User, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error Logging in:', error);
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
    const response = await recipeApi.post(
      window.$env.hosts.auth.register,
      User,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error Registering recipe:', error);
    throw error;
  }
};

// Auth
export const getAuthentication = async () => {
  try {
    const response = await recipeApi.get(window.$env.hosts.auth.check, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error Logging in:', error);
    throw error;
  }
};

// Users
export const getUsers = async () => {
  try {
    const response = await recipeApi.get(window.$env.hosts.apis.users);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }0
};

// Recipes
export const getRecipes = async () => {
  try {
    const response = await recipeApi.get(window.$env.hosts.apis.recipes);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const addRecipe = async (recipe: {
  Id: null;
  Name: string;
  Picture: null;
  SpicyLevel: boolean;
  Description: string; // ${window.$env.hosts.baseUrl}`,
  CookTimeMin: number;
  Ingredients: string[];
  DifOfIngredient: null;
  Steps: string[];
  rating: null;
  createdDate: Date;
}) => {
  try {
    const response = await recipeApi.post(
      window.$env.hosts.apis.addRecipe,
      recipe,
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error adding recipe:', error);
    throw error;
  }
};
