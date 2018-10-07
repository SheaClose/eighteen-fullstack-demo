let { getProducts } = require("./products");

module.exports = app => {
  app.get("/api/products", getProducts);
};
