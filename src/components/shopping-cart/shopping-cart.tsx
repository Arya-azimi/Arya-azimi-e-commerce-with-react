import { useState } from "react";
import { useCart } from "../../hooks";
import { ShoppingCartIcon } from "../shopping-cart-icon";
import { ShoppingCartPanel } from "../shopping-cart-panel";

export function ShoppingCart() {
  const { items, removeItem } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ShoppingCartIcon
        itemCount={items.length}
        onClick={() => setIsOpen(true)}
      />
      <ShoppingCartPanel
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        items={items}
        onRemoveItem={removeItem}
      />
    </>
  );
}
