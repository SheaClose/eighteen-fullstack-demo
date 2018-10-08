let { addToCart, getFromCart, deleteFromCart } = require("./cart");

module.exports = app => {
  app.get("/api/cart", getFromCart);
  app.post("/api/cart", addToCart);
  app.delete("/api/cart/:id", deleteFromCart);
};
