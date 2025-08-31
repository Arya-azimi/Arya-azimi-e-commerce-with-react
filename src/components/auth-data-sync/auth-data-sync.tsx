import { useEffect, useRef } from "react";
import { useAuth } from "../../hooks";
import { useWishlist } from "../../hooks";
import { getWishlist, updateWishlist } from "../../services";

export function AuthDataSync() {
  const { user } = useAuth();
  const { setWishlist, wishlist, clearWishlist } = useWishlist();

  const isInitialMount = useRef(true);

  useEffect(() => {
    const handleAuthChange = async () => {
      if (user) {
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
        clearWishlist();
      }
    };

    handleAuthChange();
  }, [user, setWishlist, clearWishlist]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (user) {
      updateWishlist(user.userId, wishlist);
    }
  }, [wishlist, user]);

  return null;
}
