const { User } = require("../models/users");
const Joi = require("joi");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(404).send("User not found!");
  const hashed = await bcrypt.compare(req.body.password, user.password);
  if (!hashed) return res.status(404).send("username or password wrong!");
  const token = user.generateToken();
  res.json(token);
};

function validateLogin(login) {
  const schema = Joi.object({
    username: Joi.string().required().min(3).max(20),
    password: Joi.string().required().min(5),
  });
  return schema.validate(login);
}
