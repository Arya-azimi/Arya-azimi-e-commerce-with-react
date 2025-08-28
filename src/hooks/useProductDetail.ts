import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../domain";
import { getProductBySlug } from "../services";

function useProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  return { product, loading, error };
}

export { useProductDetail };
