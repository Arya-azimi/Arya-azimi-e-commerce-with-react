import { Product } from "../../domain";
import { useFavorite } from "../../hooks";

interface FavoriteButtonProps {
  product: Product;
  className?: string;
}

export function FavoriteButton({
  product,
  className = "",
}: FavoriteButtonProps) {
  const { isFavorite, handleToggleFavorite } = useFavorite(product);

  return (
    <button
      onClick={handleToggleFavorite}
      className={`p-3 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors ${className}`}
      aria-label="Toggle Favorite"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-6 w-6 transition-colors ${
          isFavorite ? "text-red-500" : "text-gray-500"
        }`}
        fill={isFavorite ? "currentColor" : "none"}
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
    </button>
  );
}
