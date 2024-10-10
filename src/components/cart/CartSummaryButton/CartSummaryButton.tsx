import React, { useMemo } from "react";
import { useCartContext } from "../../../entities/Cart/hooks/useCartContext";
import { useCartStateContext } from "../../../entities/Cart/hooks/useCartStateContext";
import Cart from "../Cart/Cart";

const CartSummaryButton = () => {
  const { isCartOpen, toggleCart } = useCartStateContext();
  const { selectedProductSkus, selectedProductsMap } = useCartContext();

  const selectedProductsCount = useMemo(
    () =>
      selectedProductSkus.reduce(
        (acc, sku) => acc + selectedProductsMap[sku],
        0,
      ),
    [selectedProductSkus, selectedProductsMap],
  );

  return (
    <div className="relative">
      <button
        className="rounded-full bg-amber-100 px-4 py-2 flex gap-1"
        onClick={toggleCart}
      >
        Cart:
        <span className="font-bold">{selectedProductsCount}</span>
        items
      </button>
      {isCartOpen && <Cart />}
    </div>
  );
};

export default CartSummaryButton;
