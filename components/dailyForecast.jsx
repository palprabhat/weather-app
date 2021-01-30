import { useDarkTheme } from "../context/themeContext";
import { useMertic } from "../context/unitContext";
import { useMemo } from "react";
import { getTemp, getTime } from "../utils";
import { IconContext } from "react-icons/lib";
import { WiDirectionUp } from "react-icons/wi";
import { getweatherIcon } from "../utils/mapWeatherIcons";

const DailyWeather = ({ daily, timezone }) => {
  const darkTheme = useDarkTheme();
  const metric = useMertic();

  const maxtemp = useMemo(() => getTemp(daily.temp.max, metric), [
    metric,
    daily,
  ]);
  const mintemp = useMemo(() => getTemp(daily.temp.min, metric), [
    metric,
    daily,
  ]);
  const tempUnit = `°${metric ? "C" : "F"}`;

  return (
    <div className="flex justify-between items-center p-3 w-full">
      <div>{getTime(daily.dt, timezone, "dddd")}</div>
      <div className="flex justify-between w-1/2">
        <IconContext.Provider
          value={{
            className: `text-2xl ${darkTheme ? "text-white" : "text-black"}`,
          }}
        >
          {getweatherIcon(daily.weather[0].id, daily.weather[0].icon, true)}
        </IconContext.Provider>

        <div className="flex justify-between">
          <IconContext.Provider
            value={{
              className: `text-lg ${darkTheme ? "text-white" : "text-black"}`,
            }}
          >
            <div className="flex items-center text-sm">
              <span>{`${maxtemp}${tempUnit}`}</span>
              <WiDirectionUp />
            </div>
            <div className="flex items-center text-sm ml-1">
              <span>{`${mintemp}${tempUnit}`}</span>
              <WiDirectionUp style={{ transform: "rotate(180deg)" }} />
            </div>
          </IconContext.Provider>
        </div>
      </div>
    </div>
  );
};

const DailyForecast = ({ daily }) => {
  return (
    <div className="border-t-4">
      {daily.slice(1).map((day, i) => (
        <DailyWeather key={i} daily={day} />
      ))}
    </div>
  );
};

export default DailyForecast;
