import { Product } from "../domain";
import { useCart } from "./useCart";
import { useNotification } from "./useNotification";

function useAddToCart() {
  const { addItem } = useCart();
  const { showNotification } = useNotification();

  const handleAddToCart = (product: Product, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    addItem(product);
    showNotification(`${product.name} به سبد خرید اضافه شد`, "success");
  };

  return { handleAddToCart };
}

export { useAddToCart };
