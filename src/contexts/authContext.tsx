import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getAuthentication } from '../api/api';

function useAuthSource(): {
  user: User | null; // Allow 'null' as a valid value for 'user'
  setUser: (search: User | null) => void;
  refetchUserData: () => void; // Step 1: Add the refetchUsersData function
} {
  const [user, setUser] = useState<User | null>(null); // Provide the initial value as 'null'

  const fetchData = useCallback(async () => {
    try {
      const fetchedData = await getAuthentication();
      setUser(fetchedData);
    } catch (error) {
      // Handle authentication errors gracefully
      // If 401, tokens will be cleared by interceptor and user redirected
      // For other errors, just clear user state
      if ((error as any)?.response?.status !== 401) {
        setUser(null);
      }
      // Don't log here as interceptor handles logging and redirects
      // Silently fail - user is not authenticated
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetchUserData = useCallback(() => {
    fetchData(); // Step 1: Implement the refetchUsersData function by calling fetchData
  }, [fetchData]);

  return { user, setUser, refetchUserData };
}

export const AuthContext = createContext<ReturnType<typeof useAuthSource>>(
  {} as unknown as ReturnType<typeof useAuthSource>
);

export function UseAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthContext.Provider value={useAuthSource()}>
      {children}
    </AuthContext.Provider>
  );
}
