import { useState } from "react";
import { useWishlist } from "../../context";
import { WishlistPanel } from "../wishlist-panel";

export function Wishlist() {
  const { wishlist } = useWishlist();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="relative mx-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 absolute -top-4 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 21l-7.682-7.318a4.5 4.5 0 010-6.364z"
          />
        </svg>
        {wishlist.length > 0 && (
          <span className="absolute -top-7 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {wishlist.length}
          </span>
        )}
      </button>
      {isOpen && <WishlistPanel onClose={() => setIsOpen(false)} />}
    </>
  );
}
