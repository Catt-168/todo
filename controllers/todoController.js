const { ToDo } = require("../models/todo");

exports.todo_lists = async  (req, res) => {
  const { username } = req.user;
  const todo = await ToDo.find({ "user.username": username }).select(
    "-_id todo created_at"
  );
  res.send(todo);
};

exports.todo_details = async  (req, res) =>{
  const todo = await ToDo.findById(req.params.id).select(
    "user.username todo finished"
  );
  if (todo.user.username !== req.user.username)
    return res.status(405).send("Don't Have Permisson to View Other User List");
  res.send(todo);
};

exports.todo_create = async (req, res) => {
  const todo = new ToDo({
    user: req.user,
    todo: req.body.todo,
  });
  await todo.save();
  res.send(todo);
};

exports.todo_update = async (req, res) => {
  const todo = await ToDo.findOneAndUpdate(
    { _id: req.params.id, "user.username": req.user.username },
    { $set: { todo: req.body.todo } },
    { new: true }
  );
  res.send(todo);
};
