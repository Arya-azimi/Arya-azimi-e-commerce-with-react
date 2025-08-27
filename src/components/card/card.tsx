import { Product } from "../../types";
import { Link } from "react-router-dom";
import { useAddToCart } from "../../hooks";

type ProductCardProps = {
  product: Product;
};

function Card({ product }: ProductCardProps) {
  const { handleAddToCart } = useAddToCart();

  return (
    <Link
      to={`/products/${product.slug}`}
      className="block overflow-hidden rounded-lg shadow-md transition-shadows border-2 ho hover:shadow-xl"
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
        <p className="mt-1 text-gray-600">${product.price.toFixed(2)}</p>
        <button
          onClick={(e) => handleAddToCart(product, e)}
          className="mt-4 w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          خرید
        </button>
      </div>
    </Link>
  );
}

export { Card };
