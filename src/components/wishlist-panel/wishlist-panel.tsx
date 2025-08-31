import { useWishlist } from "../../hooks";
import { useProducts } from "../../hooks";
import { Loading, Error } from "..";
import { Link } from "react-router-dom";

interface WishlistPanelProps {
  onClose: () => void;
}

export function WishlistPanel({ onClose }: WishlistPanelProps) {
  const { wishlist, toggleWishlist } = useWishlist();
  const { products, loading, error } = useProducts();

  if (loading)
    return (
      <div className="p-4">
        <Loading />
      </div>
    );
  if (error)
    return (
      <div className="p-4">
        <Error message={error} />
      </div>
    );

  const favoriteProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div
      className="fixed inset-0 w-full bg-black bg-opacity-50 z-50 overflow-y-auto md:bg-transparent md:right-0 md:top-16 md:w-96 md:h-auto md:inset-auto"
      onClick={onClose}
    >
      <div
        className="bg-white h-full md:rounded-lg shadow-xl md:border md:w-full md:ml-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">علاقه‌مندی‌ها</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-4">
          {favoriteProducts.length === 0 ? (
            <p className="text-gray-500">لیست علاقه‌مندی‌های شما خالی است.</p>
          ) : (
            <div className="space-y-4">
              {favoriteProducts.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-16 h-16 ml-2 object-cover rounded-md"
                  />
                  <div className="flex-grow">
                    <Link
                      to={`/products/${item.slug}`}
                      onClick={onClose}
                      className="font-semibold hover:underline"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm text-gray-600">
                      {item.price.toFixed(2)} هزار تومان
                    </p>
                  </div>
                  <button
                    onClick={() => toggleWishlist(item.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    حذف
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
