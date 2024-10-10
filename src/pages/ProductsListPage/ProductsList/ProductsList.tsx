import React, { useCallback } from "react";
import { Product, ProductSku } from "../../../entities/Product/types";
import ProductsListItem from "./ProductsListItem";
import { useCartActionsContext } from "../../../entities/Cart/hooks/useCartActionsContext";
import { useCartStateContext } from "../../../entities/Cart/hooks/useCartStateContext";

interface Props {
  products: Product[];
}

// potential must have optimisations: virtualization + inifinite scroll/pagination
// consider react-window for virtualization
// and react-visibility-sensor + tanstack/query for infinite scroll/pagination
const ProductsList = ({ products }: Props) => {
  const { openCart } = useCartStateContext();
  const { addProduct } = useCartActionsContext();

  const onAddProduct = useCallback(
    (sku: ProductSku) => {
      addProduct(sku);
      openCart();
    },
    [addProduct, openCart],
  );

  return (
    <div className="grid gap-4 auto-rows-min grid-cols-1 xxl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
      {products.map((product) => (
        <ProductsListItem product={product} onAddToCartClick={onAddProduct} />
      ))}
    </div>
  );
};

export default ProductsList;
