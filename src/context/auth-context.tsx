import { useState, useEffect, createContext, ReactNode } from "react";
import { signIn, signUp, getCart, saveCart, logoutUser } from "../services";
import { User, CartItem } from "../domain";
import { useCart } from "../hooks";

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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { setCart, clearCart, items: localCartItems } = useCart();

  useEffect(() => {
    setLoading(true);
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        getCart(parsedUser.userId).then((items) => {
          if (items) setCart(items);
        });
      }
    } catch (e) {
      console.error("Failed to initialize auth from storage", e);
      setUser(null);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mergeCarts = (
    serverCart: CartItem[],
    localCart: CartItem[]
  ): CartItem[] => {
    const merged = [...serverCart];
    localCart.forEach((localItem) => {
      const serverItem = merged.find((item) => item.id === localItem.id);
      if (serverItem) {
        serverItem.quantity += localItem.quantity;
      } else {
        merged.push(localItem);
      }
    });
    return merged;
  };

  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const { user: authUser } = await signIn(username, password);
      const newUser: User = {
        username: authUser.username,
        userId: authUser.id.toString(),
      };
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));

      const serverCart = await getCart(newUser.userId);
      const mergedCart = mergeCarts(serverCart, localCartItems);
      setCart(mergedCart);
      await saveCart(newUser.userId, mergedCart);

      localStorage.removeItem("cartItems");
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطا در ورود.");
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const signup = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const { user: authUser } = await signUp(username, password);
      const newUser: User = {
        username: authUser.username,
        userId: authUser.id.toString(),
      };
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطا در ثبت‌نام.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    if (user) {
      await saveCart(user.userId, localCartItems);
      await logoutUser();
    }
    setUser(null);
    localStorage.removeItem("user");
    clearCart();
  };

  const updateUserState = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const value = {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    updateUserState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
