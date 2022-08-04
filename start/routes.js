const todo = require("../routes/todo");
const login = require("../routes/login");
const error = require("../middleware/error");
const user = require("../routes/user");
const express = require("express");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/users/", user);
  app.use("/api/todo/", todo);
  app.use("/api/login/", login);
  app.use(error);
};
