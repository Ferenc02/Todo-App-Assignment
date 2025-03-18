import { useEffect } from "react";

const ThemeSwitcher = () => {
  useEffect(() => {
    const themeToggle = document.getElementById("theme-toggle");
    const html = document.querySelector("html");

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      html.classList.add("light");
      themeToggle.checked = true;
    } else {
      html.classList.remove("light");
      themeToggle.checked = false;
    }

    const handleThemeChange = () => {
      if (themeToggle.checked) {
        html.classList.add("light");
        localStorage.setItem("theme", "light");
      } else {
        html.classList.remove("light");
        localStorage.setItem("theme", "dark");
      }
    };

    themeToggle.addEventListener("change", handleThemeChange);

    return () => {
      themeToggle.removeEventListener("change", handleThemeChange);
    };
  }, []);

  return (
    <div className="theme-switcher">
      <input type="checkbox" id="theme-toggle" />
      <label htmlFor="theme-toggle" className="light-mode">
        ☀️
      </label>
      <label htmlFor="theme-toggle" className="dark-mode">
        🌙
      </label>
    </div>
  );
};

export default ThemeSwitcher;
