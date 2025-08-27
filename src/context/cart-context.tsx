import { createContext, useReducer, ReactNode } from "react";
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
  // ...
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
// ---

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
  setCart: (items: CartItem[]) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const value = {
    items: state.items,
    addItem: (product: Product) =>
      dispatch({ type: "ADD_ITEM", payload: product }),
    removeItem: (productId: number) =>
      dispatch({ type: "REMOVE_ITEM", payload: { productId } }),
    clearCart: () => dispatch({ type: "CLEAR_CART" }),
    setCart: (items: CartItem[]) =>
      dispatch({ type: "SET_CART", payload: items }),
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export { CartContext };
