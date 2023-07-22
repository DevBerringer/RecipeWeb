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
  users: User[];
  setUsers: (search: User[]) => void;
  search: string;
  setSearch: (search: string) => void;
} {
  type UsersState = {
    users: User[];
    search: string;
  };
  type UsersAction =
    | { type: 'setUsers'; payload: User[] }
    | { type: 'setSearch'; payload: string };

  const [{ users, search }, dispatch] = useReducer(
    (state: UsersState, action: UsersAction) => {
      switch (action.type) {
        case 'setUsers':
          return { ...state, users: action.payload };
        case 'setSearch':
          return { ...state, search: action.payload };
      }
    },
    {
      users: [],
      search: '',
    }
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getUsers();
        dispatch({ type: 'setUsers', payload: fetchedData.UserDTOs });
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

  const setUsers = useCallback((newUser: User[]) => {
    dispatch({
      type: 'setUsers',
      payload: newUser,
    });
  }, []);

  const filteredUser = useMemo(
    () =>
      users
        .filter((p) => p.username.toLowerCase().includes(search.toLowerCase()))
        .slice(0, 20),
    [users, search]
  );

  const sortedUser = useMemo(
    () =>
      [...filteredUser].sort((a, b) => a.username.localeCompare(b.username)),
    [filteredUser]
  );

  return { users: sortedUser, setUsers, search, setSearch };
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
