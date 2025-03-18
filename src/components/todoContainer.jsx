import React, { useEffect, useState } from "react";
import Todo from "./todo";
import AddTodo from "./addTodo";
import SortButton from "./sortButton";

const TodoContainer = () => {
  const [todo, setTodo] = useState([]);
  const [loading, setLoading] = useState(true);

  const [initialized, setInitialized] = useState(false);

  const fetchApiKey = async () => {
    const response = await fetch(
      `https://random-todos.azurewebsites.net/keys?email=ferenc.sziraki@medieinstitutet.se`
    );
    const data = await response.text();
    return data;
  };

  const fetchRandomTodo = async (number) => {
    try {
      const key = await fetchApiKey();
      const response = await fetch(
        `https://random-todos.azurewebsites.net/todos?apikey=${key}&amount=${number}&randomdone=true`
      );
      let data = await response.json();

      return data;
    } catch (error) {
      console.log("Error getting data", error);
    }
  };

  const getCurrentTimestamp = () => {
    const date = new Date();
    return date.getTime();
  };
  const setCompleted = (id) => {
    setTodo(
      todo.map((item) => {
        if (item.id === id) {
          return { ...item, done: !item.done };
        }
        return item;
      })
    );
  };

  const addTodo = (title) => {
    const newTodo = {
      id: getCurrentTimestamp(),
      task: title,
      done: false,
      date: getCurrentTimestamp(),
    };

    setTodo([...todo, newTodo]);
  };

  const removeTodo = (id) => {
    setTodo(todo.filter((item) => item.id !== id));
  };

  const fetchAndAddRandomTodo = async (number) => {
    const fetchedTodos = await fetchRandomTodo(Number(number) || 1);

    const updatedTodos = fetchedTodos.map((todo) => ({
      ...todo,
      id: getCurrentTimestamp() + Math.random(),
      date: getCurrentTimestamp(),
    }));

    setTodo([...todo, ...updatedTodos]);
  };

  const sortTodos = (type) => {
    let sortedTodos = [...todo];
    switch (type) {
      case "default":
        sortedTodos.sort((itemA, itemB) => itemA.id - itemB.id);
        break;

      case "alphabetical":
        sortedTodos.sort((itemA, itemB) =>
          itemA.task.localeCompare(itemB.task)
        );

        break;

      case "reverse":
        sortedTodos.sort((itemA, itemB) =>
          itemB.task.localeCompare(itemA.task)
        );

        break;

      case "date":
        sortedTodos.sort((itemA, itemB) => itemB.date - itemA.date);

        break;

      case "completed":
        sortedTodos.sort((itemA, itemB) => itemB.done - itemA.done);

        break;

      case "incompleted":
        sortedTodos.sort((itemA, itemB) => itemA.done - itemB.done);

        break;

      default:
        break;
    }

    localStorage.setItem(
      "sorted",
      document.querySelector(".sort-todo")?.value || "default"
    );
    setTodo(sortedTodos);
  };

  useEffect(() => {
    if (initialized) {
      localStorage.setItem("todos", JSON.stringify(todo));
    }
  }, [todo, initialized]);

  useEffect(() => {
    const loadTodos = async () => {
      setLoading(true);

      const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];

      if (storedTodos.length > 0) {
        setTodo(storedTodos);
      } else {
        await fetchAndAddRandomTodo(4);
      }

      setLoading(false);
      setInitialized(true);
    };

    loadTodos();

    const sorted = localStorage.getItem("sorted");

    if (sorted) {
      document.querySelector(".sort-todo").value = sorted;
    } else {
      document.querySelector(".sort-todo").value = "default";
    }
  }, []);

  return (
    <>
      <div className="todo-header">
        <SortButton sortTodos={sortTodos} />
        <h1 className="title">✨ Todo List ✨</h1>
      </div>
      <AddTodo
        addTodo={addTodo}
        fetchAndAddRandomTodo={fetchAndAddRandomTodo}
      />
      <ul className="todo-container">
        {loading ? (
          <p>Loading... 🚀</p>
        ) : todo.length === 0 ? (
          <p>No todos found 😢</p>
        ) : (
          todo.map((item) => (
            <Todo
              key={item.id}
              todo={item}
              setCompleted={setCompleted}
              removeTodo={removeTodo}
            />
          ))
        )}
      </ul>
    </>
  );
};

export default TodoContainer;
