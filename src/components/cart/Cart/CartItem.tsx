import React from "react";
import { Product, ProductSku } from "../../../entities/Product/types";

interface Props {
  product: Product;
  price: number;
  quantity: number;
  onQuantityChange: (sku: ProductSku, newQuantity: number) => void;
  onDelete: (sku: ProductSku) => void;
}

const CartItem = ({
  product,
  price,
  quantity,
  onDelete,
  onQuantityChange,
}: Props) => {
  const { title, thumbnail, sku } = product;

  // no need to wrap with useCallback since we're passing to an element here
  const handleDelete = () => {
    onDelete(sku);
  };

  // no need to wrap with useCallback since we're passing to an element here
  const handleDecrease = () => {
    onQuantityChange(sku, quantity - 1);
  };

  // no need to wrap with useCallback since we're passing to an element here
  const handleIncrease = () => {
    onQuantityChange(sku, quantity + 1);
  };

  return (
    <div className="flex items-center py-3 px-2 gap-4 border border-gray-200 rounded-md">
      <img src={thumbnail} alt={title} className="size-14 rounded-md" />
      <div className="grow">{title}</div>

      <div className="flex flex-col gap-2 items-end">
        <div className="font-semibold">${price}</div>

        <div className="flex items-center gap-2 rounded-lg">
          <button
            onClick={handleDecrease}
            className="leading-4 rounded-md border border-gray-200 size-5 flex place-content-center"
          >
            -
          </button>
          <span className="w-10 flex justify-center border-b">{quantity}</span>
          <button
            onClick={handleIncrease}
            className="leading-4 rounded-md border border-gray-200 size-5 flex place-content-center"
          >
            +
          </button>
        </div>
      </div>

      <button
        onClick={handleDelete}
        className="leading-4 rounded-full size-5 text-red-500 ml-auto"
      >
        X
      </button>
    </div>
  );
};

export default CartItem;
