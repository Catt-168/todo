const { User } = require("../models/users");

module.exports = async function (req, res, next) {
  const oldUser = await User.findOne({ username: req.body.username });
  if (oldUser)
    return res
      .status(409)
      .json("username already exists! Try Different Username");
  next();
};
