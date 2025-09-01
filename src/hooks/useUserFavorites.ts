import { useWishlist } from ".";
import { useProducts } from "./useProducts";

function useUserFavorites() {
  const { wishlist } = useWishlist();
  const { products, loading, error } = useProducts();

  const favoriteProducts = products.filter((p) => wishlist.includes(p.id));

  return { favoriteProducts, loading, error };
}

export { useUserFavorites };
