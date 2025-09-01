import { useUserCart } from "../../hooks/useUserCart";
import { ItemsList } from "../items-list";

export function UserCart() {
  const { items } = useUserCart();

  return (
    <ItemsList
      title="سبد خرید شما"
      products={items}
      emptyMessage="سبد خرید شما خالی است."
    />
  );
}
