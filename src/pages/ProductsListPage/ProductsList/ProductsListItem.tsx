import React from "react";
import { Product, ProductSku } from "../../../entities/Product/types";

interface Props {
  product: Product;
  onAddToCartClick: (sku: ProductSku) => void;
}

const ProductsListItem = ({ product, onAddToCartClick }: Props) => {
  const { thumbnail, title, price, sku } = product;

  const handleAddClick = () => {
    onAddToCartClick(sku);
  };

  return (
    <div className="flex h-72 flex-col gap-2 rounded-md border-gray-200 border p-4 pt-2">
      <img
        src={thumbnail}
        alt={title}
        className="block size-40 rounded-md mx-auto grow"
      />
      <span className="text-lg">{title}</span>
      <div className="flex items-center justify-between gap-2">
        <span>${price}</span>
        <button
          className="rounded-full bg-blue-200 px-2 py-1"
          onClick={handleAddClick}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductsListItem;
