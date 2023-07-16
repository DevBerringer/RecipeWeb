import axios from 'axios';

const recipeApi = axios.create({
  baseURL: `http://${window.$env.hosts.baseUrl}`,
});

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
  Ingredients: any[];
  DifOfIngredient: null;
  Steps: any[];
  rating: null;
  createdDate: Date;
}) => {
  try {
    const response = await recipeApi.post(
      window.$env.hosts.apis.addRecipe,
      recipe,
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data;
  } catch (error) {
    console.error('Error adding recipe:', error);
    throw error;
  }
};
