import { useMemo } from "react";
import { Product } from "../domain";

function useFilterAndSort(
  products: Product[],
  searchTerm: string,
  sortOption: string
) {
  const sortedAndFilteredProducts = useMemo(() => {
    const filtered = products.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortOption) {
      case "newest":
        return filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "oldest":
        return filtered.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case "price-asc":
        return filtered.sort((a, b) => a.price - b.price);
      case "price-desc":
        return filtered.sort((a, b) => b.price - a.price);
      default:
        return filtered;
    }
  }, [products, searchTerm, sortOption]);

  return { sortedAndFilteredProducts };
}

export { useFilterAndSort };
