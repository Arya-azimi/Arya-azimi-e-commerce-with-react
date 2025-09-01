import { Product } from "../domain";
import apiClient from "./apiClient";
import { validateProducts } from "../utils";

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
  const rawData = await apiClient.get<any[]>(endpoint); // ۲. داده‌ها را به عنوان any دریافت می‌کنیم

  // ۳. داده‌های خام را قبل از بازگشت، اعتبارسنجی و تمیز می‌کنیم
  return validateProducts(rawData);
}
export async function getProductBySlug(slug: string): Promise<Product> {
  const products = await getProducts({ slug });
  if (products.length === 0) {
    throw new Error(`محصول با اسلاگ "${slug}" پیدا نشد.`);
  }
  return products[0];
}
