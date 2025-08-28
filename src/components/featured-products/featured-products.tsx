import { useProducts } from "../../hooks";
import { Card, Loading, Error } from "../"; // Import other components

function FeaturedProducts() {
  const { products, loading, error } = useProducts();

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 10);

  return (
    <section>
      <h2 className="text-3xl font-bold mb-6">محصولات پرفروش</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredProducts.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export { FeaturedProducts };
