import { useSearchParams } from "react-router-dom";
import { useProducts } from "../../hooks/";
import { Loading, Error, ProductList, ProductFilter } from "../../components";
import { useFilterAndSort } from "../../hooks/useFilterAndSort";
import { UI_MESSAGES } from "../../constants/messages";

function Products() {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const sortOption = searchParams.get("sort") || "newest";

  const { products, loading, error } = useProducts();
  const { sortedAndFilteredProducts } = useFilterAndSort(
    products,
    searchTerm,
    sortOption
  );

  if (loading) {
    return (
      <>
        <div className="container mx-auto px-4 py-8">
          <Loading />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <div className="container mx-auto px-4 py-8">
          <Error message={UI_MESSAGES.FETCH_PRODUCTS} />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <ProductFilter />
        <ProductList products={sortedAndFilteredProducts} />
      </div>
    </>
  );
}

export { Products };
