let product = require("./ctrl/productRoutes");
let cart = require("./ctrl/cartRoutes");

module.exports = app => {
  product(app);
  cart(app);
};
