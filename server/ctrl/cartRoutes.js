let { addToCart, getFromCart } = require("./cart");

module.exports = app => {
  app.post("/api/cart", addToCart);
  app.get("/api/cart", getFromCart);
};
