import { useProductsPage } from "../../hooks/";
import { Loading, Error, ProductList, ProductFilter } from "../../components";
import { UI_MESSAGES } from "../../constants/messages";

function Products() {
  const { loading, error, sortedProducts } = useProductsPage();

  const renderProductContent = () => {
    if (loading) {
      return <Loading />;
    }
    if (error) {
      return <Error message={error || UI_MESSAGES.FETCH_PRODUCTS} />;
    }
    return <ProductList products={sortedProducts} />;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductFilter />
      <div className="mt-6">{renderProductContent()}</div>
    </div>
  );
}

export { Products };
