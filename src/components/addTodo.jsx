import React from "react";
import { useState } from "react";

const AddTodo = ({ addTodo, fetchAndAddRandomTodo }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a todo"
        className="input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit">✨ Add ✨</button>
      <button type="button" onClick={fetchAndAddRandomTodo}>
        ❓ Random ❓
      </button>
    </form>
  );
};

export default AddTodo;
