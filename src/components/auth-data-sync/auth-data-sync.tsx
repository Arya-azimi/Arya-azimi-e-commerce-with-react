import { useEffect, useRef } from "react";
import { useAuth } from "../../hooks";
import { useWishlist } from "../../context";
import { getWishlist, updateWishlist } from "../../services";

export function AuthDataSync() {
  const { user } = useAuth();
  const { setWishlist, wishlist } = useWishlist();
  const isInitialMount = useRef(true);
  const isSyncing = useRef(false);

  useEffect(() => {
    if (user) {
      getWishlist(user.userId).then((productIds) => setWishlist(productIds));
    }
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const syncWishlist = async () => {
      if (isSyncing.current) return;
      isSyncing.current = true;

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
        }
      } else {
        const localWishlist = JSON.parse(
          localStorage.getItem("wishlist") || "[]"
        );
        setWishlist(localWishlist);
      }
      isSyncing.current = false;
    };

    syncWishlist();
  }, [user, setWishlist]);

  useEffect(() => {
    if (user && !isInitialMount.current && !isSyncing.current) {
      updateWishlist(user.userId, wishlist);
    }
  }, [wishlist, user]);

  return null;
}
