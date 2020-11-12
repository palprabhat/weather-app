import { createContext, useContext, useState } from "react";

const UnitContext = createContext();
const UnitUpdateContext = createContext();

export const useMertic = () => {
  return useContext(UnitContext);
};

export const useUnitToggle = () => {
  return useContext(UnitUpdateContext);
};

export const UnitProvider = ({ children }) => {
  const [metric, setMetric] = useState(true);
  const toggleUnit = () => {
    setMetric((prevUnit) => !prevUnit);
  };

  return (
    <UnitContext.Provider value={metric}>
      <UnitUpdateContext.Provider value={toggleUnit}>
        {children}
      </UnitUpdateContext.Provider>
    </UnitContext.Provider>
  );
};
