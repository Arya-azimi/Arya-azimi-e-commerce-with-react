import { useProductDetail } from "../../hooks";
import { ProductImage, ProductInfo, Loading, Error } from "../../components";

function ProductDetail() {
  const { product, loading, error } = useProductDetail();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  if (!product) {
    return <div className="text-center p-8">محصول یافت نشد.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <ProductImage imageUrl={product.imageUrl} name={product.name} />
        <ProductInfo product={product} />
      </div>
    </div>
  );
}

export { ProductDetail };
