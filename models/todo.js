const mongoose = require("mongoose");
const Joi = require("joi");

const todoSchema = new mongoose.Schema({
  user: {
    username: { type: String, required: true, minlength: 3, maxlength: 20 },
  },
  todo: { type: String, required: true },
  finished: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now() },
});

const ToDo = mongoose.model("Todo", todoSchema);

function validateToDo(todo) {
  const schema = Joi.object({
    todo: Joi.string().required(),
  });
  return schema.validate(todo);
}

module.exports = {
  ToDo: ToDo,
  validate: validateToDo,
};
