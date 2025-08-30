import { createContext, useReducer, ReactNode, useEffect } from "react";
import { Product } from "../domain";

interface CartItem extends Product {
  quantity: number;
}
interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: { productId: number } }
  | { type: "SET_CART"; payload: CartItem[] }
  | { type: "CLEAR_CART" };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { ...state, items: [...state.items, { ...product, quantity: 1 }] };
    }
    case "REMOVE_ITEM": {
      const { productId } = action.payload;
      const existingItem = state.items.find((item) => item.id === productId);
      // اگر تعداد محصول بیشتر از ۱ بود، یکی کم کن
      if (existingItem && existingItem.quantity > 1) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        };
      }
      // در غیر این صورت، محصول را کامل حذف کن
      return {
        ...state,
        items: state.items.filter((item) => item.id !== productId),
      };
    }
    case "SET_CART":
      return { ...state, items: action.payload };
    case "CLEAR_CART":
      return { ...state, items: [] };
    default:
      return state;
  }
};

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
  setCart: (items: CartItem[]) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function CartProvider({ children }: { children: ReactNode }) {
  // خواندن اطلاعات اولیه سبد خرید از localStorage
  const initialState: CartState = {
    items: JSON.parse(localStorage.getItem("cartItems") || "[]"),
  };

  const [state, dispatch] = useReducer(cartReducer, initialState);

  // هر بار که سبد خرید تغییر کرد، آن را در localStorage ذخیره کن
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(state.items));
  }, [state.items]);

  const value = {
    items: state.items,
    addItem: (product: Product) =>
      dispatch({ type: "ADD_ITEM", payload: product }),
    removeItem: (productId: number) =>
      dispatch({ type: "REMOVE_ITEM", payload: { productId } }),
    clearCart: () => {
      dispatch({ type: "CLEAR_CART" });
    },
    setCart: (items: CartItem[]) =>
      dispatch({ type: "SET_CART", payload: items }),
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export { CartContext, CartProvider };
