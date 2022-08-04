const { User } = require("../models/users");
const { ToDo } = require("../models/todo");
const bcrypt = require("bcrypt");
const _ = require("lodash");

exports.user_me = async (req, res) => {
  res.send(
    await User.findOne({ _id: req.user._id }).select(
      "username firstName lastName _id"
    )
  );
};

exports.user_create = async (req, res) => {
  const userObj = {
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  };
  if (req.body.password !== req.body.confirm)
    return res.status(400).send("Passwords not match!");
  const saltRounds = await bcrypt.genSalt(10);
  userObj.password = await bcrypt.hash(req.body.password, saltRounds);
  const user = new User(userObj);
  await user.save();
  const token = user.generateToken();
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["username", "firstName", "lastName"]));
};

exports.user_update = async (req, res) => {
  const updateUser = {
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  };
  try {
    const user = await User.findByIdAndUpdate(req.user._id, updateUser, {
      new: true,
    });
    res.send(_.pick(user, ["username", "firstName", "lastName"]));
  } catch (e) {
    res.status(400).send("Something Wrong!");
  }
};

exports.user_delete = async (req, res) => {
  const user = await User.findById(req.user._id);
  await ToDo.deleteMany({ user: user.username });
  res.send("Delete Successfully");
};
