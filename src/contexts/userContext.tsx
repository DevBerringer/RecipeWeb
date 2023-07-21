import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { getUsers } from '../api/api';

function useUserSource(): {
  user: User[];
  setUser: (search: User[]) => void;
  search: string;
  setSearch: (search: string) => void;
} {
  type UserState = {
    user: User[];
    search: string;
  };
  type UserAction =
    | { type: 'setUser'; payload: User[] }
    | { type: 'setSearch'; payload: string };
  const [{ user, search }, dispatch] = useReducer(
    (state: UserState, action: UserAction) => {
      switch (action.type) {
        case 'setUser':
          return { ...state, user: action.payload };
        case 'setSearch':
          return { ...state, search: action.payload };
      }
    },
    {
      user: [],
      search: '',
    }
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getUsers();
        console.log(JSON.stringify(fetchData));
        dispatch({ type: 'setUser', payload: fetchedData.UserDTOs });
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

  const setUser = useCallback((newUser: User[]) => {
    dispatch({
      type: 'setUser',
      payload: newUser,
    });
  }, []);

  const filteredUser = useMemo(
    () =>
      user
        .filter((p) => p.Username.toLowerCase().includes(search.toLowerCase()))
        .slice(0, 20),
    [user, search]
  );

  const sortedUser = useMemo(
    () =>
      [...filteredUser].sort((a, b) => a.Username.localeCompare(b.Username)),
    [filteredUser]
  );

  return { user: sortedUser, setUser, search, setSearch };
}

const UsersListContext = createContext<ReturnType<typeof useUserSource>>(
  {} as unknown as ReturnType<typeof useUserSource>
);

export const UsersContext = createContext<User[]>([]);

export function UseUser() {
  return useContext(UsersListContext);
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  return (
    <UsersListContext.Provider value={useUserSource()}>
      {children}
    </UsersListContext.Provider>
  );
}
