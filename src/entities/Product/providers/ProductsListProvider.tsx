import React, {
  createContext,
  PropsWithChildren,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { Product, ProductsListContextType } from "../types";
import { fetchProducts } from "../api";

export const ProductsListContext = createContext<ProductsListContextType>({
  isError: false,
  products: [],
  productsMap: {},
  isLoading: false,
});

// one of main thoughts came to my mind is to switch to tanstack/query just because it handles all the logic for
// loading and error states + has a pretty solid cache options
const ProductsListProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const productsMap = useMemo(
    () =>
      Object.fromEntries(products?.map((product) => [product.sku, product])),
    [products],
  );

  // if we intend to add infinite scroll for example, at this point it seems
  // reasonable to use tanstack/query instead
  // but for now this will work perfectly
  useLayoutEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const productsList = await fetchProducts();
        setProducts(productsList);
      } catch (e) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const contextValue: ProductsListContextType = useMemo(
    () => ({
      isError,
      isLoading,
      products,
      productsMap,
    }),
    [isError, isLoading, products, productsMap],
  );

  return (
    <ProductsListContext.Provider value={contextValue}>
      {children}
    </ProductsListContext.Provider>
  );
};

export default ProductsListProvider;
