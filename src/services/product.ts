import { Product } from "../domain";
import apiClient from "./apiClient";

interface GetProductsParams {
  isFeatured?: boolean;
  slug?: string;
  searchTerm?: string;
}

export async function getProducts(
  params?: GetProductsParams
): Promise<Product[]> {
  const query = new URLSearchParams();

  if (params) {
    if (params.isFeatured !== undefined) {
      query.append("isFeatured", String(params.isFeatured));
    }
    if (params.slug) {
      query.append("slug", params.slug);
    }
    if (params.searchTerm) {
      query.append("q", params.searchTerm);
    }
  }

  const endpoint = `products?${query.toString()}`;
  return apiClient.get<Product[]>(endpoint);
}

export async function getProductBySlug(slug: string): Promise<Product> {
  const products = await getProducts({ slug });
  if (products.length === 0) {
    throw new Error(`محصول با اسلاگ "${slug}" پیدا نشد.`);
  }
  return products[0];
}
