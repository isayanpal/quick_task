import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todoSlice";
import { FaPenClip } from "react-icons/fa6";

const TodoForm = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTodo({ text }));
    setText("");
  };

  return (
    <div className="sm:w-[27rem] w-[20rem] px-4  rounded-[1.6rem] py-10 ">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="bg-[#E8E8E8] w-full px-2 py-2 rounded-xl flex flex-row gap-2 items-center">
          <FaPenClip />
          <input
            className="bg-transparent w-full"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a new task"
          />
        </div>

        <button
          className="bg-[#3A31D8] px-5 py-2 rounded-3xl text-[#FFFFFF] font-semibold w-full"
          type="submit"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
