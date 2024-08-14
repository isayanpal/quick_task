import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, updateTodo, deleteTodo } from "../features/todoSlice";
import toast from "react-hot-toast";

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.items);
  const loading = useSelector((state) => state.todos.loading);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleToggle = (todo) => {
    dispatch(
      updateTodo({
        id: todo._id,
        text: todo.text,
        completed: !todo.completed,
      })
    );
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
    toast.success("Deleted");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center justify-center gap-5 ">
      <div className="text-white font-bold text-[30px]">
        <h1>TASKS</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
        {todos.map((todo) => (
          <div
            key={todo._id}
            className="flex flex-col justify-center items-center bg-slate-50 rounded-lg p-5 shadow-md"
          >
            <div
              className={`text-lg text-center mb-4 ${
                todo.completed ? "line-through" : "text-black"
              }`}
            >
              {todo.text}
            </div>
            <div className="flex flex-col lg:flex-row gap-3">
              {!todo.completed && (
                <button
                  className="py-2 px-4 bg-green-500 text-white text-[12px] rounded-xl font-medium cursor-pointer"
                  onClick={() => handleToggle(todo)}
                >
                  Done
                </button>
              )}
              <button
                className="py-2 px-4 bg-[#E24A4A] text-white rounded-2xl text-[10px] font-semibold cursor-pointer"
                onClick={() => handleDelete(todo._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
