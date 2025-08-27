import { Product } from "../../domain";
import { Card } from "../card";
import { UI_MESSAGES } from "../../constants/messages";

type ProductListProps = {
  products: Product[];
};

export function ProductList({ products }: ProductListProps) {
  if (products.length === 0) {
    return (
      <div className="text-center p-8 text-gray-600">
        <p>{UI_MESSAGES.NO_PRODUCTS}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product.id} product={product} />
      ))}
    </div>
  );
}
