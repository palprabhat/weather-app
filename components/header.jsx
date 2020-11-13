import ToggleThemeSwitch from "./toggleThemeSwitch";
import ToggleSwitch from "./toggleSwitch";
import { useDarkTheme, useThemeToggle } from "../context/themeContext";
import { useMertic, useUnitToggle } from "../context/unitContext";
import DropMenu from "./dropMenu";
import { AiOutlineSetting } from "react-icons/ai";

const MenuItems = ({ title, children }) => {
  return (
    <div
      className={"flex justify-between items-center px-4 py-3 w-48 select-none"}
    >
      <div className="mr-4">{title}</div>
      {children}
    </div>
  );
};

const Header = () => {
  const darkTheme = useDarkTheme();
  const toggleTheme = useThemeToggle();
  const toggleUnit = useUnitToggle();
  const metric = useMertic();

  return (
    <header
      className={`flex justify-between items-center py-4 px-3 shadow-sm  ${
        darkTheme ? " border-b border-gray-800" : ""
      }`}
    >
      <div></div>
      <h1>Weather App</h1>

      <DropMenu closeOnItemSelect={false}>
        <DropMenu.Title>
          <div className="flex justify-center items-center px-3 py-2">
            <AiOutlineSetting fontSize="1.25rem" />
          </div>
        </DropMenu.Title>
        <DropMenu.Items>
          <MenuItems title="Appearance">
            <ToggleThemeSwitch
              id="theme-toggle"
              size="0.5rem"
              checked={darkTheme}
              onChange={toggleTheme}
            />
          </MenuItems>
          <MenuItems title={`Unit: ${metric ? "Metric" : "Imperial"}`}>
            <ToggleSwitch
              id="unit-toggle"
              size="0.5rem"
              checked={metric}
              onChange={toggleUnit}
            />
          </MenuItems>
        </DropMenu.Items>
      </DropMenu>
    </header>
  );
};

export default Header;
