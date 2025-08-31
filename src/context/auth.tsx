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

  const logout = async () => {
    // از try...finally استفاده می‌کنیم تا مطمئن شویم کدهای خروج در هر حالتی اجرا می‌شوند
    try {
      if (user) {
        // سعی می‌کنیم سبد خرید را ذخیره کنیم اما اگر خطا داد، مشکلی نیست
        await saveCart(user.userId, localCartItems).catch((err) => {
          console.error("Failed to save cart on logout:", err);
        });
        await logoutUser(); // درخواست خروج را به سرور می‌فرستیم
      }
    } finally {
      // این بخش همیشه اجرا می‌شود، حتی اگر try با خطا مواجه شود
      setUser(null);
      localStorage.removeItem("user");
      clearCart();
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser); // ابتدا کاربر را تنظیم می‌کنیم تا UI سریع نمایش داده شود

      // سپس با دریافت سبد خرید، نشست کاربر را تایید می‌کنیم
      getCart(parsedUser.userId)
        .then((items) => setCart(items))
        .catch((err) => {
          // اگر این درخواست با خطا مواجه شد (مثلا 401)، یعنی نشست منقضی شده
          console.error("Session check failed, logging out client-side:", err);
          // پس کاربر را از سمت کلاینت خارج می‌کنیم
          setUser(null);
          localStorage.removeItem("user");
          clearCart();
        });
    }
    setLoading(false);
  }, [setCart, clearCart]); // فقط یک بار در زمان مونت شدن اجرا می‌شود

  const login = async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { user: authUser } = await signIn(username, password);
      const newUser: User = {
        username: authUser.username,
        userId: authUser.id.toString(),
      };

      const serverCart = await getCart(newUser.userId);
      const mergedCart: CartItem[] = [...serverCart];
      localCartItems.forEach((localItem) => {
        const serverItem = mergedCart.find((item) => item.id === localItem.id);
        if (serverItem) {
          serverItem.quantity += localItem.quantity;
        } else {
          mergedCart.push(localItem);
        }
      });
      setCart(mergedCart);
      await saveCart(newUser.userId, mergedCart);

      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      localStorage.removeItem("cartItems");
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطا در ورود.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      // پس از ثبت‌نام موفق، مستقیم کاربر را لاگین می‌کنیم
      await signUp(username, password);
      await login(username, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطا در ثبت‌نام.");
      throw err;
    } finally {
      setLoading(false);
    }
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

export { AuthProvider, AuthContext };
