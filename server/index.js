require("dotenv").config();
const {
  SECRET: secret,
  DOMAIN: domain,
  CLIENT_ID: clientID,
  CLIENT_SECRET: clientSecret,
  CONNECTION_STRING
} = process.env;
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const AuthStratgy = require("passport-auth0");
const app = express();
const port = process.env.PORT || 3001;
const massive = require("massive");
const masterRoutes = require("./masterRoutes");
const { json } = require("body-parser");

app.use(json());
massive(CONNECTION_STRING).then(dbInstance => {
  app.set("db", dbInstance);
});

app.use(
  session({
    secret,
    resave: true,
    saveUninitialized: true
  })
);
/** initialize passport/have it use sessions, connect with strategy */
app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new AuthStratgy(
    {
      domain,
      clientID,
      clientSecret,
      callbackURL: process.env.REACT_APP_SERVER + "/login", // Potential breaking point.
      scope: "openid email profile"
    },
    (accessToken, refreshToken, extraParams, profile, done) => {
      return done(null, profile);
    }
  )
);

/** time to  */
passport.serializeUser((user, done) => {
  return done(null, user);
});

passport.deserializeUser((user, done) => {
  return done(null, user);
});

app.get(
  "/login",
  (req, res, next) => {
    next();
  },
  passport.authenticate("auth0", {
    successRedirect: "/auth",
    failureRedirect: "/fail",
    failureFlash: true
  })
);
app.get("/auth", (req, res) => {
  res.status(200).json(req.user);
});
app.get("/fail", (req, res) => {
  res.status(200).json("not logged in");
});
masterRoutes(app);
app.listen(port, () => {});
