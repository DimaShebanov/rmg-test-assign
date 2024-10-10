import { Product, ProductsGetResponse } from "./types";

export const fetchProducts = (): Promise<Product[]> =>
  fetch("https://dummyjson.com/products?limit=40")
    .then((res) => res.json())
    .then((data: ProductsGetResponse) => data.products);
