import { ProductSku } from "../Product/types";

// sku to quantity map
export type SelectedProductsMap = Record<ProductSku, number>;

export interface CartActionsContextType {
  addProduct: (sku: ProductSku, quantityToAdd?: number) => void;
  deleteProduct: (sku: ProductSku) => void;
  changeProductQuantity: (sku: ProductSku, newQuantity: number) => void;
  clearCart: () => void;
}

export interface CartContextType {
  selectedProductsMap: SelectedProductsMap;
  selectedProductSkus: ProductSku[];
}

export interface CartStateContextType {
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}
