import { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

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
  const [metricLoc, setMetricLoc] = useLocalStorage("metric", metric);

  const toggleUnit = () => {
    setMetric((prevUnit) => !prevUnit);
  };

  useEffect(() => {
    setMetric(metricLoc);
  }, []);

  useEffect(() => {
    setMetricLoc(metric);
  }, [metric]);

  return (
    <UnitContext.Provider value={metric}>
      <UnitUpdateContext.Provider value={toggleUnit}>
        {children}
      </UnitUpdateContext.Provider>
    </UnitContext.Provider>
  );
};
