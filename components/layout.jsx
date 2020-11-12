import { ThemeProvider } from "../context/themeContext";
import { UnitProvider } from "../context/unitContext";
import Header from "./header";

const Layout = ({ children }) => {
  return (
    <ThemeProvider>
      <UnitProvider>
        <Header />
        <div className="container mx-auto mt-3 px-3">{children}</div>
      </UnitProvider>
    </ThemeProvider>
  );
};

export default Layout;
