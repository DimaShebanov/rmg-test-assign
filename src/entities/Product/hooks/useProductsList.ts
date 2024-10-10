import { useContext } from "react";
import { ProductsListContext } from "../providers/ProductsListProvider";

export const useProductsList = () => useContext(ProductsListContext);
