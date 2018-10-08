import { createContext } from "react";

let cartContext = createContext({
  cart: [],
  getCart() {}
});

export const CartProvider = cartContext.Provider;
export const CartConsumer = cartContext.Consumer;
