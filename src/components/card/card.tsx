import { Product } from "../../domain";
import { Link } from "react-router-dom";
import { useCart, useNotification } from "../../hooks";
import { useWishlist } from "../../context";

type ProductCardProps = {
  product: Product;
};

export function Card({ product }: ProductCardProps) {
  const { addItem, removeItem, items } = useCart();
  const { showNotification } = useNotification();
  const { wishlist, toggleWishlist } = useWishlist();

  const itemInCart = items.find((item) => item.id === product.id);
  const quantityInCart = itemInCart?.quantity || 0;
  const isFavorite = wishlist.includes(product.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    showNotification(`${product.name} اضافه شد`, "success");
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    removeItem(product.id);
    showNotification(`${product.name} حذف شد`, "error");
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    showNotification(
      isFavorite ? "از علاقه‌مندی‌ها حذف شد" : "به علاقه‌مندی‌ها اضافه شد",
      isFavorite ? "error" : "success"
    );
  };

  return (
    <div className="group block overflow-hidden rounded-lg shadow-md transition-shadows border-2 hover:shadow-xl relative">
      <button
        onClick={handleToggleWishlist}
        className="absolute top-2 right-2 z-10 p-2 bg-white/70 rounded-full backdrop-blur-sm transition-opacity opacity-0 group-hover:opacity-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 transition-colors ${
            isFavorite ? "text-red-500" : "text-gray-500 hover:text-red-400"
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

      <Link to={`/products/${product.slug}`}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
        <p className="mt-1 text-gray-600">
          {product.price.toFixed(2)} هزار تومان
        </p>

        {quantityInCart === 0 ? (
          <button
            onClick={handleAdd}
            className="mt-4 w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            خرید
          </button>
        ) : (
          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={handleRemove}
              className="bg-red-500 text-white rounded-full w-8 h-8 font-bold text-lg"
            >
              -
            </button>
            <span className="font-bold text-lg">{quantityInCart}</span>
            <button
              onClick={handleAdd}
              className="bg-green-500 text-white rounded-full w-8 h-8 font-bold text-lg"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
