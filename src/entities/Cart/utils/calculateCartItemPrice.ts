import { Product } from "../../Product/types";
import { normalizeNumber } from "../../../utils/normalizeNumber";

// in util in case logic will get more complicated
export const calculateCartItemPrice = (product: Product, quantity: number) =>
  normalizeNumber(product.price * quantity);
