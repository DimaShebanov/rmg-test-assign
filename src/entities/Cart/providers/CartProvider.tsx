import {
  createContext,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from "react";
import {
  CartActionsContextType,
  CartContextType,
  SelectedProductsMap,
} from "../types";
import omit from "lodash.omit";

export const CartActionsContext = createContext<CartActionsContextType>({
  addProduct: () => {},
  deleteProduct: () => {},
  changeProductQuantity: () => {},
  clearCart: () => {},
});

export const CartContext = createContext<CartContextType>({
  selectedProductsMap: {},
  selectedProductSkus: [],
});

// one of kinda obvious optimizations here is to switch from context to something more sophisticated whenever we have
// more logic than just CRUD in one state

// also, I'd possibly suggest to persist cart state either in localStorage (as minimum) or in user data on BE so that
// it'd be the same cart for all user logins
const CartProvider = ({ children }: PropsWithChildren) => {
  const [selectedProductsMap, setSelectedProductsMap] =
    useState<SelectedProductsMap>({});

  const selectedProductSkus = useMemo(
    () => Object.keys(selectedProductsMap),
    [selectedProductsMap],
  );

  const addProduct: CartActionsContextType["addProduct"] = useCallback(
    (sku, quantityToAdd = 1) => {
      setSelectedProductsMap((productsMap) => ({
        ...productsMap,
        // if there's already selected product - taking its quantity, if no - fallback to 0
        // and add the user desired quantity to this number
        [sku]: (productsMap[sku] ?? 0) + quantityToAdd,
      }));
    },
    [],
  );

  const deleteProduct: CartActionsContextType["deleteProduct"] = useCallback(
    (sku) => setSelectedProductsMap((productsMap) => omit(productsMap, sku)),
    [],
  );

  const changeProductQuantity: CartActionsContextType["changeProductQuantity"] =
    useCallback(
      (sku, newQuantity) => {
        if (newQuantity > 0) {
          setSelectedProductsMap((productsMap) => ({
            ...productsMap,
            [sku]: newQuantity,
          }));
        } else {
          deleteProduct(sku);
        }
      },
      [deleteProduct],
    );

  const clearCart: CartActionsContextType["clearCart"] = useCallback(
    () => setSelectedProductsMap({}),
    [],
  );

  const cartValue = useMemo(
    () => ({
      selectedProductsMap,
      selectedProductSkus,
    }),
    [selectedProductSkus, selectedProductsMap],
  );

  const cartActionsValue = useMemo(
    () => ({
      addProduct,
      deleteProduct,
      changeProductQuantity,
      clearCart,
    }),
    [addProduct, changeProductQuantity, clearCart, deleteProduct],
  );

  return (
    <CartContext.Provider value={cartValue}>
      <CartActionsContext.Provider value={cartActionsValue}>
        {children}
      </CartActionsContext.Provider>
    </CartContext.Provider>
  );
};

export default CartProvider;
