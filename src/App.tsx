import React from "react";
import ProductsListProvider from "./entities/Product/providers/ProductsListProvider";
import CartProvider from "./entities/Cart/providers/CartProvider";
import ProductsListPage from "./pages/ProductsListPage/ProductsListPage";
import CartStateProvider from "./entities/Cart/providers/CartStateProvider";

const App = () => (
  <ProductsListProvider>
    <CartStateProvider>
      <CartProvider>
        <ProductsListPage />
      </CartProvider>
    </CartStateProvider>
  </ProductsListProvider>
);

export default App;
