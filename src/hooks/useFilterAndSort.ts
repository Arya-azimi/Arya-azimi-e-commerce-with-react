import { useMemo } from "react";
import { Product } from "../domain";

function useFilterAndSort(products: Product[], sortOption: string) {
  const sortedProducts = useMemo(() => {
    const productsToSort = [...products];

    switch (sortOption) {
      case "newest":
        return productsToSort.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "oldest":
        return productsToSort.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case "price-asc":
        return productsToSort.sort((a, b) => a.price - b.price);
      case "price-desc":
        return productsToSort.sort((a, b) => b.price - a.price);
      default:
        return productsToSort;
    }
  }, [products, sortOption]);

  return { sortedProducts };
}

export { useFilterAndSort };
