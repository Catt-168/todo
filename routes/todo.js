const { validate } = require("../models/todo");
const auth = require("../middleware/auth");
const validateObjectId = require("../middleware/validateObjectId");
const validateMiddleware = require("../middleware/validate");
const todoController = require("../controllers/todoController");
const express = require("express");
const router = express.Router();

router.get("/", auth, todoController.todo_lists);

router.get("/:id", [auth, validateObjectId], todoController.todo_details);

router.post(
  "/",
  [auth, validateMiddleware(validate)],
  todoController.todo_create
);

router.put(
  "/:id",
  [auth, validateMiddleware(validate)],
  todoController.todo_update
);

module.exports = router;
