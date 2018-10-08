let product = require("./ctrl/productRoutes");
let cart = require("./ctrl/cartRoutes");
let loginCtrl = require("./ctrl/loginCtrl");
let middlewares = require("./ctrl/middlewares");

module.exports = app => {
  middlewares(app);
  product(app);
  cart(app);
  loginCtrl(app);
};
