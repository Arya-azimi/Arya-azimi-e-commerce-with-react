import { Product } from "../../domain";
import { useCart } from "../../hooks";

interface CartButtonProps {
  product: Product;
  className?: string;
}

function CartButton({ product, className = "" }: CartButtonProps) {
  const { addItem, removeItem, items } = useCart();

  const itemInCart = items.find((item) => item.id === product.id);
  const quantityInCart = itemInCart?.quantity || 0;

  const handleAdd = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    addItem(product);
  };

  const handleRemove = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    removeItem(product.id);
  };

  if (quantityInCart === 0) {
    return (
      <button
        onClick={handleAdd}
        className={`w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors ${className}`}
      >
        خرید
      </button>
    );
  }

  return (
    <div
      className={`flex items-center justify-between border rounded-lg p-2 ${className}`}
    >
      <button
        onClick={handleRemove}
        className="bg-red-500 text-white rounded-full w-8 h-8 font-bold text-lg transition-transform hover:scale-110"
      >
        -
      </button>
      <span className="font-bold text-lg px-2">{quantityInCart}</span>
      <button
        onClick={handleAdd}
        className="bg-green-500 text-white rounded-full w-8 h-8 font-bold text-lg transition-transform hover:scale-110"
      >
        +
      </button>
    </div>
  );
}

export { CartButton };
