import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { tokenStorage, LoginResponse, RefreshTokenResponse } from './tokenStorage';

// Track if we're currently refreshing to avoid multiple simultaneous refresh requests
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

/**
 * Function to get the axios instance with Bearer token authentication
 * 
 * Features:
 * - Automatically adds Authorization header with Bearer token
 * - Handles 401 errors by attempting token refresh
 * - Queues requests during token refresh to prevent race conditions
 * - Clears tokens and redirects on auth failure
 */
const getRecipeApi = () => {
  if (!window.$env) {
    throw new Error(
      'window.$env is not defined. Check your index.html script block.'
    );
  }

  const instance = axios.create({
    baseURL: `http://${window.$env.hosts.baseUrl}`,
    // Removed: withCredentials: true (no longer using cookies)
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor: Add Bearer token to all requests
  instance.interceptors.request.use(
    (config) => {
      const token = tokenStorage.getAccessToken();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor: Handle 401 errors with automatic token refresh
  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

      // If we get a 401 and haven't already retried
      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          // If already refreshing, queue this request
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              return instance(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        const refreshToken = tokenStorage.getRefreshToken();

        if (!refreshToken) {
          // No refresh token available, clear everything
          isRefreshing = false;
          tokenStorage.clearAllTokens();
          processQueue(new Error('No refresh token available'), null);
          
          // Don't redirect - let the app handle unauthenticated state gracefully
          return Promise.reject(error);
        }

        try {
          // Attempt to refresh the token
          const refreshResponse = await axios.post<RefreshTokenResponse>(
            `http://${window.$env.hosts.baseUrl}${window.$env.hosts.auth.refresh}`,
            { refreshToken },
            {
              headers: { 'Content-Type': 'application/json' },
            }
          );

          const newAccessToken = refreshResponse.data.accessToken;
          
          if (newAccessToken) {
            // Store the new access token
            tokenStorage.setAccessToken(newAccessToken);
            
            // Update refresh token if rotated
            if (refreshResponse.data.refreshToken) {
              tokenStorage.setRefreshToken(refreshResponse.data.refreshToken);
            }

            // Update the original request with new token
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            }

            // Process queued requests
            isRefreshing = false;
            processQueue(null, newAccessToken);

            // Retry the original request
            return instance(originalRequest);
          } else {
            throw new Error('No access token in refresh response');
          }
        } catch (refreshError) {
          // Refresh failed - clear tokens
          isRefreshing = false;
          tokenStorage.clearAllTokens();
          processQueue(refreshError, null);
          
          // Don't redirect - let the app handle auth failure gracefully
          return Promise.reject(refreshError);
        }
      }

      // For non-401 errors, just reject
      return Promise.reject(error);
    }
  );

  return instance;
};

// Security

/**
 * Sign in user and store access/refresh tokens
 * 
 * Expected Spring backend response format:
 * {
 *   accessToken: string,
 *   refreshToken: string,
 *   // ... other user data
 * }
 * 
 * Also supports alternative formats:
 * - { token: string, refreshToken: string }
 * - { access_token: string, refresh_token: string }
 */
export const Signin = async (User: { username: string; password: string }) => {
  try {
    const response = await getRecipeApi().post<LoginResponse>(
      window.$env.hosts.auth.login,
      User,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    const data = response.data;

    // Extract and store tokens (support multiple response formats)
    const accessToken = data.accessToken || data.token || data.access_token;
    const refreshToken = data.refreshToken || data.refresh_token;

    if (accessToken) {
      tokenStorage.setAccessToken(accessToken);
    } else {
      console.warn('No access token received in login response');
    }

    if (refreshToken) {
      tokenStorage.setRefreshToken(refreshToken);
    } else {
      console.warn('No refresh token received in login response');
    }

    return response.data;
  } catch (error) {
    console.error('Error Logging in:', error);
    // Clear any partial token storage on login failure
    tokenStorage.clearAllTokens();
    throw error;
  }
};

/**
 * Sign out user and clear all tokens
 * 
 * Clears tokens even if the API call fails to ensure
 * proper logout on the client side
 */
export const SignOut = async () => {
  try {
    const response = await getRecipeApi().post(
      window.$env.hosts.auth.signOut,
      null
    );
    
    // Always clear tokens, even if API call succeeds
    tokenStorage.clearAllTokens();
    
    return response.data;
  } catch (error) {
    console.error('Error Signing out:', error);
    // Still clear tokens even if API call fails
    tokenStorage.clearAllTokens();
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

// Forgot Password - request reset link (always returns generic message)
export const ForgotPassword = async (email: string) => {
  try {
    const response = await getRecipeApi().post(
      window.$env.hosts.auth.forgotPassword,
      { email },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data;
  } catch (error) {
    // We still want to present a generic success message to avoid user enumeration.
    console.error('Error requesting password reset:', error);
    // Return a safe generic response shape so the UI can proceed uniformly
    return { message: 'If an account exists for that email, we will send a reset link shortly.' };
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

export const getPagedRecipes = async (
  page = 0,
  pageSize = 4,
  filters?: {
    search?: string;
    meals?: string[];
    foods?: string[];
    regions?: string[];
    vegetarian?: boolean | null;
    spicy?: boolean | null;
    maxCookTime?: number | null;
  }
) => {
  try {
    const params = new URLSearchParams();
    params.set('page', String(page));
    params.set('pageSize', String(pageSize));
    if (filters?.search) params.set('search', filters.search);
    if (filters?.meals && filters.meals.length)
      params.set('meals', filters.meals.join(','));
    if (filters?.foods && filters.foods.length)
      params.set('foods', filters.foods.join(','));
    if (filters?.regions && filters.regions.length)
      params.set('regions', filters.regions.join(','));
    if (filters?.vegetarian !== null && filters?.vegetarian !== undefined)
      params.set('vegetarian', String(filters.vegetarian));
    if (filters?.spicy !== null && filters?.spicy !== undefined)
      params.set('spicy', String(filters.spicy));
    if (filters?.maxCookTime !== null && filters?.maxCookTime !== undefined)
      params.set('maxCookTime', String(filters.maxCookTime));

    const response = await getRecipeApi().get(
      `${window.$env.hosts.apis.pagedRecipes}?${params.toString()}`
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
      // Removed: withCredentials: true (Bearer token in header instead)
      // Note: Content-Type will be set automatically by axios for FormData
    }
  );

  return response.data; // this is the image URL
};
