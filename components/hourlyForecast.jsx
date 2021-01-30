import { useDarkTheme } from "../context/themeContext";
import { useMertic } from "../context/unitContext";
import { useMemo } from "react";
import { getTemp } from "../utils";
import { IconContext } from "react-icons/lib";
import { getweatherIcon } from "../utils/mapWeatherIcons";
import { getTime } from "../utils/days";

const HourItem = ({ hour, timezone }) => {
  const darkTheme = useDarkTheme();
  const metric = useMertic();

  const temp = useMemo(() => getTemp(hour.temp, metric), [metric, hour]);
  const feelsLike = useMemo(() => getTemp(hour.feels_like, metric), [
    metric,
    hour,
  ]);
  const tempUnit = `°${metric ? "C" : "F"}`;

  return (
    <div className="flex flex-col justify-center items-center p-3 w-full">
      <div>{getTime(hour.dt, timezone, "h a")}</div>
      <div className="flex justify-around items-center w-full">
        <IconContext.Provider
          value={{
            className: `text-3xl ${darkTheme ? "text-white" : "text-black"}`,
          }}
        >
          {getweatherIcon(hour.weather[0].id, hour.weather[0].icon, true)}
        </IconContext.Provider>
        <div className="text-sm">{`${temp}${tempUnit}`}</div>
      </div>

      <div className="text-xs whitespace-no-wrap">{`Feels like ${feelsLike}${tempUnit}`}</div>
    </div>
  );
};

const HourlyForecast = ({ hourly, timezone }) => {
  return (
    <div className="flex overflow-x-scroll border-t border-b">
      {hourly.slice(1, 25).map((hour, i) => (
        <HourItem key={i} hour={hour} timezone={timezone} />
      ))}
    </div>
  );
};

export default HourlyForecast;
