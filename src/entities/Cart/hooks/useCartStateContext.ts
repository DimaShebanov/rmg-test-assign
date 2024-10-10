import { useContext } from "react";
import { CartStateContext } from "../providers/CartStateProvider";

export const useCartStateContext = () => useContext(CartStateContext);
