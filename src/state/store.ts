import { create } from "zustand";
import { Product } from "../domain";

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
  setCart: (items: CartItem[]) => void;
}

const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (product) => {
    set((state) => {
      const existingItem = state.items.find((item) => item.id === product.id);
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return { items: [...state.items, { ...product, quantity: 1 }] };
      }
    });
  },
  removeItem: (productId) => {
    set((state) => {
      const existingItem = state.items.find((item) => item.id === productId);
      if (existingItem && existingItem.quantity > 1) {
        return {
          items: state.items.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        };
      } else {
        return { items: state.items.filter((item) => item.id !== productId) };
      }
    });
  },
  clearCart: () => set({ items: [] }),
  setCart: (items) => set({ items }),
}));

export { useCartStore };
