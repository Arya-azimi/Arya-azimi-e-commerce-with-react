import { useSearchParams } from "react-router-dom";
import { useProducts } from "./useProducts";
import { useFilterAndSort } from "./useFilterAndSort";
import { useDebounce } from "./useDebounce";

function useProductsPage() {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const sortOption = searchParams.get("sort") || "newest";

  const debounced = useDebounce(searchTerm, 500);

  const { products, loading, error } = useProducts(debounced);

  const { sortedProducts } = useFilterAndSort(products, sortOption);

  return {
    loading,
    error,
    sortedProducts,
  };
}

export { useProductsPage };
