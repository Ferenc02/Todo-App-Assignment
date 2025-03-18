import React, { useEffect } from "react";

const Todo = ({ todo, setCompleted, removeTodo }) => {
  return (
    <>
      {todo ? (
        <li className="todo" key={todo.id}>
          <div className="todo-item" onClick={() => setCompleted(todo.id)}>
            <span>{todo.task}</span>
            <input
              type="checkbox"
              id={`todo-${todo.id}`}
              checked={todo.done}
              onChange={() => setCompleted(todo.id)}
            />
          </div>

          <button className="todo-delete" onClick={() => removeTodo(todo.id)}>
            ❌
          </button>
        </li>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Todo;
