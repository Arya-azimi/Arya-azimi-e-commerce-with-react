import { Card } from "../../components";
import { useProducts } from "../../hooks";

function Home() {
  const { products, loading, error } = useProducts();
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 10);

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;

  return (
    <div>
      <div className="container mx-auto md:px-4 md:py-8">
        <div className="bg-black bg-right-top bg-no-repeat h-[60vh] flex items-center justify-center mb-8 bg-[url(https://wallpapers.com/images/high/lebron-james-in-red-nba-desktop-cx5cgw7ex8nh4oi4.webp)] md:h-[50vh] md:rounded-lg"></div>
        <h2 className="text-3xl font-bold mb-6">محصولات پرفروش</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export { Home };
