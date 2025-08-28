import { useSearchParams } from "react-router-dom";
import { useProducts } from "./useProducts";
import { useFilterAndSort } from "./useFilterAndSort";

function useProductsPage() {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const sortOption = searchParams.get("sort") || "newest";

  const { products, loading, error } = useProducts();

  const { sortedAndFilteredProducts } = useFilterAndSort(
    products,
    searchTerm,
    sortOption
  );

  return {
    loading,
    error,
    sortedAndFilteredProducts,
  };
}

export { useProductsPage };
