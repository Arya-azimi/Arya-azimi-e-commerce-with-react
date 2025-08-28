import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../domain";
import { getProductBySlug } from "../../services";
import { useAddToCart } from "../../hooks";

function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { handleAddToCart } = useAddToCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) {
        setError("Product slug is missing.");
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const data = await getProductBySlug(slug);
        setProduct(data);
      } catch (err) {
        setError("Failed to load product.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  if (loading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="text-center p-8">Product not found.</div>;
  }

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full rounded-lg shadow-md"
            />
          </div>
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
              onClick={() => handleAddToCart(product)}
              className="mt-8 px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
            >
              خرید
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ProductDetail };
