import { useEffect } from "react";
import "./App.css";

import TodoContainer from "./components/todoContainer.jsx";
import ThemeSwitcher from "./components/themeSwitcher.jsx";

function App() {
  return (
    <>
      <title>Todo App 📝</title>
      <TodoContainer />
      <footer>
        <div></div>
        <p>
          Made with <span>❤️</span> by Ferenc
        </p>
        <div></div>
        <ThemeSwitcher />
      </footer>
    </>
  );
}

export default App;
