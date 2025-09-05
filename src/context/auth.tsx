import {
  useState,
  useEffect,
  createContext,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import { signIn, signUp, logoutUser } from "../services";
import { User } from "../domain";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, password: string) => Promise<void>;
  logout: () => void;
  updateUserState: (newUser: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = useCallback(async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { user: authUser } = await signIn(username, password);
      setUser({
        username: authUser.username,
        userId: authUser.id.toString(),
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "خطا در ورود.";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const signup = useCallback(
    async (username: string, password: string) => {
      setLoading(true);
      setError(null);
      try {
        await signUp(username, password);
        await login(username, password);
      } catch (err) {
        const message = err instanceof Error ? err.message : "خطا در ثبت‌نام.";
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [login]
  );

  const logout = useCallback(async () => {
    await logoutUser();
    setUser(null);
  }, []);

  const updateUserState = useCallback((newUser: User) => {
    setUser(newUser);
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      error,
      login,
      signup,
      logout,
      updateUserState,
    }),
    [user, loading, error, login, signup, logout, updateUserState]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthProvider, AuthContext };
