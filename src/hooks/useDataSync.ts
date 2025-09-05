import { useEffect } from "react";
import { useAuth } from "./useAuth";
import { useCart } from "./useCart";
import { useWishlist } from "./useWishlist";
import { getCart, saveCart, getWishlist, updateWishlist } from "../services";
import { CartItem } from "../domain";

export function useDataSync() {
  const { user } = useAuth();
  const { items: localCart, setCart, clearCart } = useCart();
  const { wishlist: localWishlist, setWishlist, clearWishlist } = useWishlist();

  useEffect(() => {
    const syncData = async () => {
      if (user) {
        // Sync Cart
        const serverCart = await getCart(user.userId);
        const mergedCart: CartItem[] = [...serverCart];
        localCart.forEach((localItem) => {
          const serverItem = mergedCart.find(
            (item) => item.id === localItem.id
          );
          if (serverItem) {
            serverItem.quantity += localItem.quantity;
          } else {
            mergedCart.push(localItem);
          }
        });
        await saveCart(user.userId, mergedCart);
        setCart(mergedCart);
        localStorage.removeItem("cartItems");

        // Sync Wishlist
        const serverWishlist = await getWishlist(user.userId);
        const mergedWishlist = [
          ...new Set([...serverWishlist, ...localWishlist]),
        ];
        if (localWishlist.length > 0) {
          await updateWishlist(user.userId, mergedWishlist);
        }
        setWishlist(mergedWishlist);
        localStorage.removeItem("wishlist");
      } else {
        clearCart();
        clearWishlist();
      }
    };

    syncData();
  }, [user]);
}
