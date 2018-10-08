const passport = require("passport");
const AuthStratgy = require("passport-auth0");
const {
  DOMAIN: domain,
  CLIENT_ID: clientID,
  CLIENT_SECRET: clientSecret
} = process.env;

module.exports = app => {
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
};
