const Todo = require("../models/Todo");

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Server Error in getting todos" });
  }
};

const addTodo = async (req, res) => {
  const { text } = req.body;
  try {
    const todo = await Todo.create({ text, user: req.user.id });
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: "Server Error in adding todo" });
  }
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findById(id);
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Not authorized to update" });
    }
    const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: "Server Error in updating todo" });
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Not authorized to delete" });
    }
    await todo.deleteOne({ id });
    res.json({ message: "Todo removed" });
  } catch (error) {
    res.status(500).json({ error: "Server Error in deleting todo" });
    console.log(error);
  }
};

module.exports = { getTodos, addTodo, updateTodo, deleteTodo };
