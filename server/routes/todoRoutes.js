const express = require("express");
const {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController.js");
const { protect } = require("../middleware/authMiddleware.js");
const router = express.Router();

router.route("/").get(protect, getTodos).post(protect, addTodo);

router.route("/:id").put(protect, updateTodo).delete(protect, deleteTodo);

module.exports = router;
