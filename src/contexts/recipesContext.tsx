import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { getRecipes } from '../api/api';

function useRecipeSource(): {
  recipe: Recipe[];
  setRecipe: (search: Recipe[]) => void;
  search: string;
  setSearch: (search: string) => void;
} {
  type RecipeState = {
    recipe: Recipe[];
    search: string;
  };
  type RecipeAction =
    | { type: 'setRecipe'; payload: Recipe[] }
    | { type: 'setSearch'; payload: string };
  const [{ recipe, search }, dispatch] = useReducer(
    (state: RecipeState, action: RecipeAction) => {
      switch (action.type) {
        case 'setRecipe':
          return { ...state, recipe: action.payload };
        case 'setSearch':
          return { ...state, search: action.payload };
      }
    },
    {
      recipe: [],
      search: '',
    }
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getRecipes();
        dispatch({ type: 'setRecipe', payload: fetchedData.RecipeDTOs });
      } catch (error) {
        // Handle error, e.g., show an error message or retry
      }
    };

    fetchData();
  }, []);

  const setSearch = useCallback((search: string) => {
    dispatch({
      type: 'setSearch',
      payload: search,
    });
  }, []);

  const setRecipe = useCallback((newRecipe: Recipe[]) => {
    dispatch({
      type: 'setRecipe',
      payload: newRecipe,
    });
  }, []);

  const filteredRecipe = useMemo(
    () =>
      recipe
        .filter((p) => p.Name.toLowerCase().includes(search.toLowerCase()))
        .slice(0, 20),
    [recipe, search]
  );

  const sortedRecipe = useMemo(
    () => [...filteredRecipe].sort((a, b) => a.Name.localeCompare(b.Name)),
    [filteredRecipe]
  );

  return { recipe: sortedRecipe, setRecipe, search, setSearch };
}

const RecipesListContext = createContext<ReturnType<typeof useRecipeSource>>(
  {} as unknown as ReturnType<typeof useRecipeSource>
);

export const RecipesContext = createContext<Recipe[]>([]);

export function UseRecipe() {
  return useContext(RecipesListContext);
}

export function RecipeProvider({ children }: { children: React.ReactNode }) {
  return (
    <RecipesListContext.Provider value={useRecipeSource()}>
      {children}
    </RecipesListContext.Provider>
  );
}
