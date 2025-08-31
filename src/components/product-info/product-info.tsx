import { Product } from "../../domain";
import { CartButton, FavoriteButton } from "../../components"; // FavoriteButton را ایمپورت می‌کنیم

interface ProductInfoProps {
  product: Product;
}

function ProductInfo({ product }: ProductInfoProps) {
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
        <CartButton product={product} className="flex-grow py-1" />

        <FavoriteButton product={product} />
      </div>
    </div>
  );
}

export { ProductInfo };
