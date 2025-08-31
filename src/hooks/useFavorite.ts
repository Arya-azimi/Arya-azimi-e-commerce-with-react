import { useWishlist } from ".";
import { useNotification } from "./useNotification";
import { Product } from "../domain";

function useFavorite(product: Product) {
  const { showNotification } = useNotification();
  const { wishlist, toggleWishlist } = useWishlist();

  const isFavorite = wishlist.includes(product.id);

  const handleToggleFavorite = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    toggleWishlist(product.id);
    showNotification(
      isFavorite ? "از علاقه‌مندی‌ها حذف شد" : "به علاقه‌مندی‌ها اضافه شد",
      isFavorite ? "error" : "success"
    );
  };

  return { isFavorite, handleToggleFavorite };
}

export { useFavorite };
