import React, { useMemo } from "react";
import { useCartContext } from "../../../entities/Cart/hooks/useCartContext";
import { useProductsList } from "../../../entities/Product/hooks/useProductsList";
import CartItem from "./CartItem";
import { calculateCartItemPrice } from "../../../entities/Cart/utils/calculateCartItemPrice";
import { normalizeNumber } from "../../../utils/normalizeNumber";
import { useCartStateContext } from "../../../entities/Cart/hooks/useCartStateContext";

const Cart = () => {
  const { productsMap } = useProductsList();
  const {
    selectedProductSkus,
    selectedProductsMap,
    deleteProduct,
    clearCart,
    changeProductQuantity,
  } = useCartContext();
  const { closeCart } = useCartStateContext();

  // decided to keep it here instead of context because it didn't make sense
  // to keep this calculation in context since it's used only in one place, but
  // will be recalculated on each context change even when there's no need
  // instead it will be recalculated only when cart is open
  const cartProductItems = useMemo(
    () =>
      selectedProductSkus.map((sku) => {
        const product = productsMap[sku];
        const quantity = selectedProductsMap[sku];
        const price = calculateCartItemPrice(product, quantity);

        return {
          product,
          quantity,
          price,
        };
      }),
    [productsMap, selectedProductSkus, selectedProductsMap],
  );
  const hasSelectedProducts = !!cartProductItems?.length;

  const total = useMemo(
    () =>
      normalizeNumber(
        cartProductItems.reduce((acc, { price }) => acc + price, 0),
      ),
    [cartProductItems],
  );

  const handleClearClick = () => {
    clearCart();
    closeCart();
  };

  // nice to have ClickAwayListener that will close the cart when user clicks outside of it
  return (
    <div className="absolute top-full mt-2 overflow-hidden right-0 max-h-128 bg-white pt-4 shadow border border-gray-200 rounded-md w-max flex flex-col">
      <div className="flex flex-col gap-2 overflow-auto px-4 pb-4">
        {hasSelectedProducts ? (
          cartProductItems?.map(({ product, quantity, price }) => (
            <CartItem
              product={product}
              price={price}
              quantity={quantity}
              onDelete={deleteProduct}
              onQuantityChange={changeProductQuantity}
            />
          ))
        ) : (
          <div className="flex place-content-center">Cart is empty</div>
        )}
      </div>
      {hasSelectedProducts && (
        <div className="border-t border-gray-200 p-4 flex justify-between items-center gap-4">
          <button
            className="bg-red-500 text-white rounded-full px-4 py-1"
            onClick={handleClearClick}
          >
            Clear cart
          </button>
          <div className="ml-auto">
            Total: <span className="font-bold">${total}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
