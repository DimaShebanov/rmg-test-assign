import { useCartActionsContext } from "./useCartActionsContext";
import { useContext } from "react";
import { CartContext } from "../providers/CartProvider";

export const useCartContext = () => {
  const cartActionsContext = useCartActionsContext();
  const cartContext = useContext(CartContext);

  return {
    ...cartContext,
    ...cartActionsContext,
  };
};
