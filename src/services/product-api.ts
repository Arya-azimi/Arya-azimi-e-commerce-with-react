import { Product } from "../domain";
import apiClient from "./apiClient";

function getProducts(): Promise<Product[]> {
  return apiClient.get<Product[]>("products");
}

function getFeaturedProducts(): Promise<Product[]> {
  return apiClient.get<Product[]>("products?isFeatured=true");
}

async function getProductBySlug(slug: string): Promise<Product> {
  const products = await apiClient.get<Product[]>(`products?slug=${slug}`);
  if (products.length === 0) {
    throw new Error(`محصول با اسلاگ "${slug}" پیدا نشد.`);
  }
  return products[0];
}

export { getProducts, getFeaturedProducts, getProductBySlug };
