import React from "react";
import Header from "../components/Header";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

const TodoPage = () => {
  return (
    <div className="h-screen m-auto flex flex-col items-center w-full">
      <Header />
      <TodoForm />
      <TodoList />
    </div>
  );
};

export default TodoPage;
