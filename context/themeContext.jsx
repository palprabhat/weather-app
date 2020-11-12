import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();
const ThemeUpdateContext = createContext();

export const useDarkTheme = () => {
  return useContext(ThemeContext);
};

export const useThemeToggle = () => {
  return useContext(ThemeUpdateContext);
};

export const ThemeProvider = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(false);
  const toggleTheme = () => {
    setDarkTheme((prevTheme) => !prevTheme);
  };

  useEffect(() => {
    const body = document.body;

    darkTheme
      ? body.setAttribute("dark", "true")
      : body.removeAttribute("dark");
  }, [darkTheme]);

  useEffect(() => {
    const darkMwdiaMatch =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");

    if (darkMwdiaMatch.matches) {
      setDarkTheme(true);
    } else {
      setDarkTheme(false);
    }

    const handler = ({ matches }) => {
      if (matches) {
        setDarkTheme(true);
      } else {
        setDarkTheme(false);
      }
    };
    darkMwdiaMatch.addEventListener("change", handler);
    return () => {
      window.removeEventListener("change", handler);
    };
  }, []);

  return (
    <ThemeContext.Provider value={darkTheme}>
      <ThemeUpdateContext.Provider value={toggleTheme}>
        {children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
};
