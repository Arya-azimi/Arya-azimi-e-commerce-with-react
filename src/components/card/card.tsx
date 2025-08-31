import { Product } from "../../domain";
import { Link } from "react-router-dom";
import { CartButton, FavoriteButton } from "../../components";

type ProductCardProps = {
  product: Product;
};

export function Card({ product }: ProductCardProps) {
  return (
    <div className="group block overflow-hidden rounded-lg shadow-md transition-shadows border-2 hover:shadow-xl relative">
      <div className="absolute top-2 right-2 z-10 transition-opacity opacity-0 group-hover:opacity-100">
        <FavoriteButton
          product={product}
          className="bg-white/70 backdrop-blur-sm"
        />
      </div>

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

        <div className="mt-4">
          <CartButton product={product} />
        </div>
      </div>
    </div>
  );
}
