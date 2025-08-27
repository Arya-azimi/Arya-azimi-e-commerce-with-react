import { Product } from "../domain";
import { API_URL } from "../constants";

async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
}

async function getFeaturedProducts(): Promise<Product[]> {
  const response = await fetch(`${API_URL}/products?isFeatured=true`);
  if (!response.ok) {
    throw new Error("Failed to fetch featured products");
  }
  return response.json();
}

async function getProductBySlug(slug: string): Promise<Product> {
  const response = await fetch(`${API_URL}/products/${slug}`);
  const data = await response.json();
  if (!response.ok || data.length === 0) {
    throw new Error(`محصول با اسلاگ "${slug}" پیدا نشد.`);
  }
  return data[0];
}

export { getProducts, getFeaturedProducts, getProductBySlug };
