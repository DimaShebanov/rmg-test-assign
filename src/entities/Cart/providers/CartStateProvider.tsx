import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from "react";
import { CartStateContextType } from "../types";

export const CartStateContext = createContext<CartStateContextType>({
  isCartOpen: false,
  openCart: () => {},
  closeCart: () => {},
  toggleCart: () => {},
});

// in context to allow open cart when user adds product in cart
// ideally should be in some global app state that stores other pieces of state for internal app usage
const CartStateProvider = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);

  const closeCart = useCallback(() => setIsOpen(false), []);

  const toggleCart = useCallback(() => setIsOpen((isOpen) => !isOpen), []);

  const contextValue = useMemo(
    () => ({
      isCartOpen: isOpen,
      openCart,
      closeCart,
      toggleCart,
    }),
    [closeCart, isOpen, openCart, toggleCart],
  );

  return (
    <CartStateContext.Provider value={contextValue}>
      {children}
    </CartStateContext.Provider>
  );
};

export default CartStateProvider;
