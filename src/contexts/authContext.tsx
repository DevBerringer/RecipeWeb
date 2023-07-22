import { createContext, useContext, useEffect, useState } from 'react';
import { getAuthentication } from '../api/api';

function useAuthSource(): {
  user: User | null; // Allow 'null' as a valid value for 'user'
  setUser: (search: User | null) => void;
} {
  const [user, setUser] = useState<User | null>(null); // Provide the initial value as 'null'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getAuthentication();
        setUser(fetchedData);
      } catch (error) {
        // Handle error, e.g., show an error message or retry
      }
    };

    fetchData();
  }, []);

  return { user, setUser };
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
