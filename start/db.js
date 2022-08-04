const mongoose = require("mongoose");

module.exports = function (config) {
  mongoose
    .connect(config.get("db"), { useNewUrlParser: true })
    .then(() => console.log("Connected"))
    .catch(() => console.log("Could not connected"));
};
