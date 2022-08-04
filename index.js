const express = require("express");
const config = require("config");
const app = express();

require("./start/exceptions")();
require("./start/jwt")(config);
require("./start/routes")(app);
require("./start/db")(config);
require("./start/validation")();

const port = config.get("PORT");
app.listen(port, () => {
  console.log(`Running on Port ${port}`);
});
