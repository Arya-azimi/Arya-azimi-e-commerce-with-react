import { Product } from "../../domain";
import { Link } from "react-router-dom";
import { useCart, useNotification } from "../../hooks";

type ProductCardProps = {
  product: Product;
};

function Card({ product }: ProductCardProps) {
  const { addItem, removeItem } = useCart();
  const { showNotification } = useNotification();
  const { items } = useCart();

  const itemInCart = items.find((item) => item.id === product.id);
  const quantityInCart = itemInCart?.quantity || 0;

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

  return (
    <div className="block overflow-hidden rounded-lg shadow-md transition-shadows border-2 hover:shadow-xl">
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

export { Card };
