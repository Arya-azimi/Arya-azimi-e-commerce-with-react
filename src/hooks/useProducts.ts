import { useState, useEffect } from "react";
import { Product } from "../domain";
import { getProducts } from "../services";

function useProducts(searchTerm?: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getProducts({ searchTerm });
        setProducts(data);
      } catch (err) {
        setError("Failed to load products.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [searchTerm]);

  return { products, loading, error };
}

export { useProducts };
