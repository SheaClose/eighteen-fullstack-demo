let { getProducts, getProductsByCat } = require("./products");

module.exports = app => {
  app.get("/api/products", getProducts);
  app.get("/api/products/:cat", getProductsByCat);
};
