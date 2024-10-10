import { useContext } from "react";
import { CartActionsContext } from "../providers/CartProvider";

export const useCartActionsContext = () => useContext(CartActionsContext);
