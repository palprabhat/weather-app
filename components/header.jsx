import ToggleThemeSwitch from "./toggleThemeSwitch";
import ToggleSwitch from "./toggleSwitch";
import { useDarkTheme, useThemeToggle } from "../context/themeContext";
import { useMetric, useUnitToggle } from "../context/unitContext";
import DropMenu from "./dropMenu";
import { AiOutlineSetting, AiOutlineGithub } from "react-icons/ai";

const MenuItems = ({ title, children }) => {
  return (
    <div className={"flex justify-between items-center px-4 py-3 select-none"}>
      <div className="mr-4">{title}</div>
      {children}
    </div>
  );
};

const Header = () => {
  const darkTheme = useDarkTheme();
  const toggleTheme = useThemeToggle();
  const toggleUnit = useUnitToggle();
  const metric = useMetric();

  return (
    <header
      className={`flex justify-between items-center py-4 px-3 shadow-sm  ${
        darkTheme ? " border-b border-gray-800" : ""
      }`}
    >
      <div></div>
      <h1>Weather App</h1>

      <div className="flex justify-between items-center">
        <a
          href="https://github.com/palprabhat/weather-app"
          target="_blank"
          rel="noreferrer"
        >
          <AiOutlineGithub fontSize="1.25rem" />
        </a>

        <DropMenu closeOnItemSelect={false} className="ml-4">
          <DropMenu.Title>
            <div className="flex justify-center items-center px-3 py-2">
              <AiOutlineSetting fontSize="1.25rem" />
            </div>
          </DropMenu.Title>
          <DropMenu.Items className="w-56">
            <MenuItems title={`Appearance: ${darkTheme ? "Dark" : "Light"}`}>
              <ToggleThemeSwitch
                id="theme-toggle"
                size="0.5rem"
                checked={darkTheme}
                onChange={toggleTheme}
              />
            </MenuItems>
            <MenuItems title={`Units: ${metric ? "Metric" : "Imperial"}`}>
              <ToggleSwitch
                id="unit-toggle"
                size="0.5rem"
                checked={metric}
                onChange={toggleUnit}
              />
            </MenuItems>
          </DropMenu.Items>
        </DropMenu>
      </div>
    </header>
  );
};

export default Header;
