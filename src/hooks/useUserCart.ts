import { useCart } from "./useCart";

function useUserCart() {
  const { items } = useCart();
  return { items };
}

export { useUserCart };
