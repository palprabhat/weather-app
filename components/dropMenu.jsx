import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDarkTheme } from "../context/themeContext";
import findByType from "../utils/findByType";

const Title = () => null;
const Items = () => null;

const RenderTitle = ({ children }) => {
  const title = findByType(children, Title);

  if (!title) return null;

  return <>{title.props.children}</>;
};

const RenderItems = ({ children, closeOnItemSelect, darkTheme }) => {
  const items = findByType(children, Items);

  if (!items) return null;

  return (
    <>
      {items.props.children.map((child, i) => {
        return (
          <div
            key={i}
            className={`${
              darkTheme
                ? "bg-gray-800 hover:bg-gray-700 focus:bg-gray-700"
                : "bg-white"
            }`}
            onClick={(e) => (!closeOnItemSelect ? e.stopPropagation() : null)}
          >
            {child}
          </div>
        );
      })}
    </>
  );
};

const DropMenu = ({ children, closeOnItemSelect = true }) => {
  const [open, setOpen] = useState(false);
  const darkTheme = useDarkTheme();

  useEffect(() => {
    if (open) {
      const handleWindowClick = () => setOpen(false);

      window.addEventListener("click", handleWindowClick);
      return () => window.removeEventListener("click", handleWindowClick);
    }
  }, [open]);

  return (
    <div className="relative">
      <button
        className="select-none outline-none focus:outline-none"
        onClick={() => setOpen(!open)}
      >
        <RenderTitle>{children}</RenderTitle>
      </button>

      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.15 }}
          className={`absolute overflow-hidden right-0 z-10 border rounded-md shadow-sm focus:outline-none ${
            darkTheme ? "bg-gray-800 border-gray-600" : "bg-white"
          }`}
        >
          <RenderItems
            closeOnItemSelect={closeOnItemSelect}
            darkTheme={darkTheme}
          >
            {children}
          </RenderItems>
        </motion.div>
      )}
    </div>
  );
};

DropMenu.Title = Title;
DropMenu.Items = Items;

export default DropMenu;
