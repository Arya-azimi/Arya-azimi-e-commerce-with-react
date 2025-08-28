import { Hero, FeaturedProducts } from "../../components";

export function Home() {
  return (
    <div className="container mx-auto md:px-4 md:py-8">
      <Hero />
      <FeaturedProducts />
    </div>
  );
}
