import { useState, useEffect, createContext, ReactNode, useRef } from "react";
import {
  signIn,
  signUp,
  getCart,
  saveCart,
  logoutUser,
  getWishlist,
  updateWishlist,
} from "../services";
import { User, CartItem } from "../domain";
import { useCart } from "../hooks";
import { useWishlist } from "./wishlist";

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
  const { setWishlist, clearWishlist, wishlist } = useWishlist();
  const isMounted = useRef(false); // To prevent useEffect from running on initial render

  // Effect to load initial user data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      // Fetch data for the logged-in user
      getCart(parsedUser.userId).then((items) => setCart(items));
      getWishlist(parsedUser.userId).then((productIds) =>
        setWishlist(productIds)
      );
    }
    setLoading(false);
  }, [setCart, setWishlist]);

  // Effect to automatically sync wishlist changes to the server
  useEffect(() => {
    // This check prevents the effect from running on the very first render
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    // If there's a logged-in user, save any wishlist changes to the server
    if (user) {
      updateWishlist(user.userId, wishlist);
    }
  }, [wishlist, user]); // This effect runs whenever the wishlist or user changes

  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const { user: authUser } = await signIn(username, password);
      const newUser: User = {
        username: authUser.username,
        userId: authUser.id.toString(),
      };

      // Get local data *before* setting the user
      const localWishlist = JSON.parse(
        localStorage.getItem("wishlist") || "[]"
      );

      // Fetch server data
      const serverWishlist = await getWishlist(newUser.userId);
      const serverCart = await getCart(newUser.userId);

      // Merge wishlists
      const mergedWishlist = [
        ...new Set([...serverWishlist, ...localWishlist]),
      ];
      await updateWishlist(newUser.userId, mergedWishlist);
      setWishlist(mergedWishlist); // Update global state

      // Merge carts
      const mergedCart: CartItem[] = [...serverCart];
      localCartItems.forEach((localItem) => {
        const serverItem = mergedCart.find((item) => item.id === localItem.id);
        if (serverItem) serverItem.quantity += localItem.quantity;
        else mergedCart.push(localItem);
      });
      setCart(mergedCart);
      await saveCart(newUser.userId, mergedCart);

      // Now set the user and clear local data
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      localStorage.removeItem("cartItems");
      localStorage.removeItem("wishlist");
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطا در ورود.");
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
    clearWishlist();
  };

  const signup = async (username: string, password: string) => {
    // This function doesn't need changes
    setLoading(true);
    setError(null);
    try {
      const { user: authUser } = await signUp(username, password);
      const newUser: User = {
        username: authUser.username,
        userId: authUser.id.toString(),
      };
      // After signup, we immediately log the user in
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
