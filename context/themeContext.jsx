import { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const ThemeContext = createContext();
const ThemeUpdateContext = createContext();

export const useDarkTheme = () => {
  return useContext(ThemeContext);
};

export const useThemeToggle = () => {
  return useContext(ThemeUpdateContext);
};

export const ThemeProvider = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(null);
  const [darkThemeLoc, setDarkThemeLoc] = useLocalStorage("darkTheme", null);

  const toggleTheme = () => {
    setDarkTheme((prevTheme) => !prevTheme);
  };

  useEffect(() => {
    const body = document.body;
    darkTheme
      ? body.setAttribute("dark", "true")
      : body.removeAttribute("dark");

    if (darkTheme !== null) setDarkThemeLoc(darkTheme);
  }, [darkTheme]);

  useEffect(() => {
    const darkMediaMatch =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");

    if (darkThemeLoc === null) {
      darkMediaMatch.matches ? setDarkTheme(true) : setDarkTheme(false);
    } else {
      setDarkTheme(darkThemeLoc);
    }

    const handler = ({ matches }) => {
      matches ? setDarkTheme(true) : setDarkTheme(false);
    };

    darkMediaMatch.addEventListener("change", handler);
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
