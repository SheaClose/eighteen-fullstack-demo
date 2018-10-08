const { SECRET: secret } = process.env;
const session = require("express-session");
const { json } = require("body-parser");

module.exports = app => {
  app.use(json());
  app.use(
    session({
      secret,
      resave: true,
      saveUninitialized: true
    })
  );
};
