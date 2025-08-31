import { Product } from "../../domain";
import { useWishlist } from "../../context";
import { useNotification, useCart } from "../../hooks";

interface ProductInfoProps {
  product: Product;
}

function ProductInfo({ product }: ProductInfoProps) {
  const { wishlist, toggleWishlist } = useWishlist();
  const { showNotification } = useNotification();
  const { addItem, removeItem, items } = useCart();

  const isFavorite = wishlist.includes(product.id);
  const itemInCart = items.find((item) => item.id === product.id);
  const quantityInCart = itemInCart?.quantity || 0;

  const handleToggleWishlist = () => {
    toggleWishlist(product.id);
    showNotification(
      isFavorite ? "از علاقه‌مندی‌ها حذف شد" : "به علاقه‌مندی‌ها اضافه شد",
      isFavorite ? "error" : "success"
    );
  };

  const handleAdd = () => {
    addItem(product);
    showNotification(`${product.name} اضافه شد`, "success");
  };

  const handleRemove = () => {
    removeItem(product.id);
    showNotification(`${product.name} حذف شد`, "error");
  };

  return (
    <div className="md:w-1/2">
      <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
      <p className="mt-2 text-xl font-semibold text-blue-600">
        {product.price.toFixed(2)} هزار تومان
      </p>
      <p className="mt-4 text-gray-700 leading-relaxed">
        {product.description}
      </p>
      <div className="mt-6">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          {product.category}
        </span>
      </div>

      <div className="mt-8 flex items-center space-x-4 space-x-reverse">
        {quantityInCart === 0 ? (
          <button
            onClick={handleAdd}
            className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors flex-grow"
          >
            خرید
          </button>
        ) : (
          <div className="flex items-center justify-between border rounded-lg p-2 flex-grow">
            <button
              onClick={handleRemove}
              className="bg-red-500 text-white rounded-full w-10 h-10 font-bold text-lg transition-transform hover:scale-110"
            >
              -
            </button>
            <span className="font-bold text-xl px-4">{quantityInCart}</span>
            <button
              onClick={handleAdd}
              className="bg-green-500 text-white rounded-full w-10 h-10 font-bold text-lg transition-transform hover:scale-110"
            >
              +
            </button>
          </div>
        )}

        <button
          onClick={handleToggleWishlist}
          className="p-3 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
          aria-label="Toggle Wishlist"
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
      </div>
    </div>
  );
}

export { ProductInfo };
