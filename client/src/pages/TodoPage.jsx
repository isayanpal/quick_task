import React from "react";
import Header from "../components/Header";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

const TodoPage = () => {
  return (
    <>
      <Header />
      <TodoForm />
      <TodoList />
    </>
  );
};

export default TodoPage;
