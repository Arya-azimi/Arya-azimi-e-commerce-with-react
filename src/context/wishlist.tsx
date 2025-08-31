import {
  createContext,
  useReducer,
  ReactNode,
  useEffect,
  useContext,
} from "react";

// --- State and Actions ---
type WishlistState = {
  productIds: number[];
};

type WishlistAction =
  | { type: "TOGGLE_ITEM"; payload: number }
  | { type: "SET_WISHLIST"; payload: number[] }
  | { type: "CLEAR_WISHLIST" };

const wishlistReducer = (
  state: WishlistState,
  action: WishlistAction
): WishlistState => {
  switch (action.type) {
    case "TOGGLE_ITEM": {
      const productId = action.payload;
      const isFavorite = state.productIds.includes(productId);
      const newProductIds = isFavorite
        ? state.productIds.filter((id) => id !== productId)
        : [...state.productIds, productId];
      return { ...state, productIds: newProductIds };
    }
    case "SET_WISHLIST":
      return { ...state, productIds: action.payload };
    case "CLEAR_WISHLIST":
      return { ...state, productIds: [] };
    default:
      return state;
  }
};

// --- Context Definition ---
interface WishlistContextType {
  wishlist: number[];
  toggleWishlist: (productId: number) => void;
  setWishlist: (productIds: number[]) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

// --- Provider Component ---
export function WishlistProvider({ children }: { children: ReactNode }) {
  const initialState: WishlistState = {
    productIds: JSON.parse(localStorage.getItem("wishlist") || "[]"),
  };
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  useEffect(() => {
    // Always sync with localStorage. AuthProvider will manage overwriting this for logged-in users.
    localStorage.setItem("wishlist", JSON.stringify(state.productIds));
  }, [state.productIds]);

  const value = {
    wishlist: state.productIds,
    toggleWishlist: (productId: number) =>
      dispatch({ type: "TOGGLE_ITEM", payload: productId }),
    setWishlist: (productIds: number[]) =>
      dispatch({ type: "SET_WISHLIST", payload: productIds }),
    clearWishlist: () => dispatch({ type: "CLEAR_WISHLIST" }),
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

// --- Custom Hook ---
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
