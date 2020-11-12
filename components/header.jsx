import ToggleThemeSwitch from "./toggleThemeSwitch/index";
import { useDarkTheme, useThemeToggle } from "../context/themeContext";
import { motion } from "framer-motion";
import { useMertic, useUnitToggle } from "../context/unitContext";
import { useState } from "react";

const Header = () => {
  const darkTheme = useDarkTheme();
  const toggleTheme = useThemeToggle();
  const toggleUnit = useUnitToggle();
  const metric = useMertic();

  const [open, setOpen] = useState(false);

  return (
    <header
      className={`flex justify-between items-center py-4 px-3 shadow-sm ${
        darkTheme ? " border-b border-gray-800" : ""
      }`}
    >
      <div></div>
      <h1>Weather App</h1>

      <div className="relative">
        <div className="select-none" onClick={() => setOpen(!open)}>
          <div>Settings</div>
        </div>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={{ duration: 0.15 }}
            className={`absolute overflow-hidden right-0 z-10 border rounded-md shadow-sm focus:outline-none ${
              darkTheme ? "bg-gray-800 border-gray-700" : "bg-white"
            }`}
          >
            <div
              className={`flex justify-between items-center px-4 py-3 focus:outline-none ${
                darkTheme
                  ? "bg-gray-800 border-gray-700 hover:bg-gray-600 focus:bg-gray-600"
                  : "bg-white"
              }`}
            >
              <div className="mr-4">Appearance</div>
              <ToggleThemeSwitch
                id="theme-toggle"
                size="0.5rem"
                checked={darkTheme}
                onChange={toggleTheme}
              />
            </div>
            <div
              className={`flex justify-between items-center px-4 py-3 focus:outline-none ${
                darkTheme
                  ? "bg-gray-800 border-gray-700 hover:bg-gray-600 focus:bg-gray-600"
                  : "bg-white"
              }`}
            >
              <div className="mr-4">Unit</div>
              <ToggleThemeSwitch
                id="metric-toggle"
                size="0.5rem"
                checked={metric}
                onChange={toggleUnit}
              />
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
