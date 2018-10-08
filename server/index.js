require("dotenv").config();
const { CONNECTION_STRING } = process.env;
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const massive = require("massive");
const masterRoutes = require("./masterRoutes");
masterRoutes(app);

(async () => {
  let db = await massive(CONNECTION_STRING);
  app.set("db", db);
  app.listen(port, () => {
    console.log(`listening on port: ${port}`);
  });
})();
