const { validate } = require("../models/users");
const validateObjectId = require("../middleware/validateObjectId");
const validateUsername = require("../middleware/validateUsername");
const validateMiddleware = require("../middleware/validate");
const auth = require("../middleware/auth");
const userController = require("../controllers/userController");
const express = require("express");
const router = express.Router();

router.get("/me", auth, userController.user_me);

router.post(
  "/",
  [auth, validateUsername, validateMiddleware(validate)],
  userController.user_create
);

router.put(
  "/me",
  [auth, validateUsername, validateMiddleware(validate)],
  userController.user_update
);

router.delete("/me", [auth], userController.user_delete);

module.exports = router;
