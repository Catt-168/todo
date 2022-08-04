const JWT = require("jsonwebtoken");
const mongoose = require("mongoose");
const config = require("config");

const Joi = require("joi");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, minlength: 3, maxlength: 20 },
  firstName: { type: String, required: true, minlength: 3, maxlength: 20 },
  lastName: { type: String, required: true, minlength: 2, maxlength: 20 },
  password: { type: String, required: true, minlength: 5 },
  user_created: { type: Date, default: Date.now() },
});

userSchema.methods.generateToken = function () {
  return JWT.sign(
    { _id: this._id, username: this.username },
    config.get("jsonprivateKey")
  );
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    username: Joi.string().required().min(3).max(20),
    firstName: Joi.string().required().min(3).max(20),
    lastName: Joi.string().required().min(2).max(20),
    password: Joi.string().required().min(5),
    confirm: Joi.string().required().min(5),
  });
  return schema.validate(user);
}

module.exports = {
  User: User,
  validate: validateUser,
};
