import { useProductsPage } from "../../hooks/";
import { Loading, Error, ProductList, ProductFilter } from "../../components";
import { UI_MESSAGES } from "../../constants/messages";

export function Products() {
  const { loading, error, sortedAndFilteredProducts } = useProductsPage();

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Error message={UI_MESSAGES.FETCH_PRODUCTS} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductFilter />
      <ProductList products={sortedAndFilteredProducts} />
    </div>
  );
}
