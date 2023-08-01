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
  refetchUsersData: () => void; // Step 1: Add the refetchUsersData function
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
        default:
          return state; // Add a default case to handle any unknown actions
      }
    },
    {
      users: [],
      search: '',
    }
  );

  const fetchData = useCallback(async () => {
    try {
      const fetchedData = await getUsers();
      dispatch({ type: 'setUsers', payload: fetchedData.UserDTOs });
    } catch (error) {
      // Handle error, e.g., show an error message or retry
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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

  const refetchUsersData = useCallback(() => {
    fetchData(); // Step 1: Implement the refetchUsersData function by calling fetchData
  }, [fetchData]); // Step 1: Make sure to include fetchData in the dependencies

  const filteredUser = useMemo(
    () =>
      users
        .filter((p) => p.Username.toLowerCase().includes(search.toLowerCase()))
        .slice(0, 20),
    [users, search]
  );

  const sortedUser = useMemo(
    () =>
      [...filteredUser].sort((a, b) => a.Username.localeCompare(b.Username)),
    [filteredUser]
  );

  return { users: sortedUser, setUsers, search, setSearch, refetchUsersData }; // Step 2: Include the refetchUsersData in the returned object
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
