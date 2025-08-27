import { useNavigate } from "react-router-dom";
import { Product } from "../types/";
import { useCart } from "./useCart";
import { useAuth } from "./useAuth";

export function useAddToCart() {
  const { user } = useAuth();
  const { addItem } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (product: Product, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
    }

    if (user) {
      addItem(product);
    } else {
      navigate("/login");
    }
  };

  return { handleAddToCart };
}
