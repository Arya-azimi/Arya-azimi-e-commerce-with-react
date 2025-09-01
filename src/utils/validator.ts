import { Product } from "../domain";

function isProduct(item: any): item is Product {
  return (
    item &&
    typeof item.id === "number" &&
    typeof item.name === "string" &&
    item.name.trim() !== "" &&
    typeof item.price === "number" &&
    !isNaN(item.price) &&
    typeof item.slug === "string" &&
    item.slug.trim() !== "" &&
    typeof item.imageUrl === "string" &&
    typeof item.isFeatured === "boolean" &&
    typeof item.category === "string" &&
    typeof item.description === "string" &&
    typeof item.createdAt === "string"
  );
}

export function validateProducts(data: any[]): Product[] {
  if (!Array.isArray(data)) {
    console.error("Received data is not an array.");
    return [];
  }

  const validProducts = data.filter((item) => {
    const isValid = isProduct(item);
    if (!isValid) {
      console.warn("Invalid product data filtered out:", item);
    }
    return isValid;
  });

  return validProducts;
}
