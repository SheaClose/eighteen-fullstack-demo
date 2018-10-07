import react from "react";
const productsContext = react.createContext({
  products: [],
  readProducts() {},
  getProducts() {}
});

export const Consumer = productsContext.Consumer;
export const Provider = productsContext.Provider;
