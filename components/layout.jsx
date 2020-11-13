import { ThemeProvider } from "../context/themeContext";
import { UnitProvider } from "../context/unitContext";
import Header from "./header";

const Layout = ({ children }) => {
  return (
    <ThemeProvider>
      <UnitProvider>
        <Header />
        <div className="container mx-auto max-w-screen-md mt-3 px-3 pb-6">
          {children}
        </div>
      </UnitProvider>
    </ThemeProvider>
  );
};

export default Layout;
