import { Product } from "../../domain";

interface ProductInfoProps {
  product: Product;
  onAddToCart: () => void;
}

function ProductInfo({ product, onAddToCart }: ProductInfoProps) {
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
      <button
        onClick={onAddToCart}
        className="mt-8 px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
      >
        خرید
      </button>
    </div>
  );
}

export { ProductInfo };
