import { useEffect, useRef } from "react";
import { useAuth, useCart, useWishlist } from "../../hooks";
import { getCart, saveCart, getWishlist, updateWishlist } from "../../services";
import { CartItem } from "../../domain";

function DataSync() {
  const { user } = useAuth();
  const { items: localCart, setCart, clearCart } = useCart();
  const { wishlist, setWishlist, clearWishlist } = useWishlist();
  const isInitialMount = useRef(true);

  useEffect(() => {
    const syncOnAuthChange = async () => {
      if (user) {
        const localCartItems = JSON.parse(
          localStorage.getItem("cartItems") || "[]"
        );
        if (localCartItems.length > 0) {
          const serverCart = await getCart(user.userId);
          const mergedCart: CartItem[] = [...serverCart];
          localCartItems.forEach((localItem: CartItem) => {
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
        } else {
          const serverCart = await getCart(user.userId);
          setCart(serverCart);
        }

        const localWishlist = JSON.parse(
          localStorage.getItem("wishlist") || "[]"
        );
        if (localWishlist.length > 0) {
          const serverWishlist = await getWishlist(user.userId);
          const mergedWishlist = [
            ...new Set([...serverWishlist, ...localWishlist]),
          ];
          await updateWishlist(user.userId, mergedWishlist);
          setWishlist(mergedWishlist);
          localStorage.removeItem("wishlist");
        } else {
          const serverWishlist = await getWishlist(user.userId);
          setWishlist(serverWishlist);
        }
      } else {
        clearCart();
        clearWishlist();
      }
    };

    syncOnAuthChange();
  }, [user]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (user) {
      saveCart(user.userId, localCart);
    }
  }, [localCart, user]);

  useEffect(() => {
    if (isInitialMount.current) {
      return;
    }
    if (user) {
      updateWishlist(user.userId, wishlist);
    }
  }, [wishlist, user]);

  return null;
}

export { DataSync };
