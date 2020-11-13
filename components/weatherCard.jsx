import { useDarkTheme } from "../context/themeContext";
import { useMertic } from "../context/unitContext";
import { getDayTime, getTemp, getTime, getweatherIcon } from "../utils";
import { IconContext } from "react-icons/lib";
import {
  WiBarometer,
  WiHumidity,
  WiSunrise,
  WiSunset,
  WiTime3,
} from "react-icons/wi";
import { useMemo } from "react";
import HourForecast from "./hourlyForecart";
import DailyForecast from "./dailyForecast";

const WeatherItem = ({ icon, value, desc }) => {
  const darkTheme = useDarkTheme();
  return (
    <div className="flex flex-col items-center">
      <IconContext.Provider
        value={{
          className: `text-2xl ${darkTheme ? "text-white" : "text-black"}`,
        }}
      >
        {icon}
      </IconContext.Provider>
      <div>{value}</div>
      <div className="text-xs">{desc}</div>
    </div>
  );
};

const WeatherCard = ({ weather, placeName }) => {
  const darkTheme = useDarkTheme();
  const metric = useMertic();

  const temp = useMemo(() => getTemp(weather.current.temp, metric), [
    metric,
    weather,
  ]);
  const feelsLike = useMemo(() => getTemp(weather.current.feels_like, metric), [
    metric,
    weather,
  ]);
  const tempUnit = `°${metric ? "C" : "F"}`;

  return (
    <div
      className={`mt-4 p-4 rounded-lg shadow-md ${
        darkTheme ? "bg-gray-800" : "border border-gray-100"
      }`}
    >
      <div className="flex justify-around">
        <div className="flex flex-col justify-center items-center">
          <IconContext.Provider
            value={{
              className: `text-6xl ${darkTheme ? "text-white" : "text-black"}`,
            }}
          >
            {getweatherIcon(
              weather.current.weather[0].id,
              weather.current.weather[0].icon
            )}
          </IconContext.Provider>
          <div>{weather.current.weather[0].main}</div>
        </div>
        <div>
          <div className="text-5xl">{`${temp}${tempUnit}`}</div>
          <div>{`Feels like ${feelsLike}${tempUnit}`}</div>
          <div className="text-xl">{placeName}</div>
        </div>
      </div>

      <div className="mt-8">
        <HourForecast hourly={weather.hourly} />
      </div>

      <div className="flex justify-around mt-8">
        <WeatherItem
          icon={<WiSunrise />}
          value={getTime(weather.current.sunrise, "hh:mm a")}
          desc="Sunrise"
          darkTheme
        />
        <WeatherItem
          icon={<WiSunset />}
          value={getTime(weather.current.sunset, "hh:mm a")}
          desc="Sunset"
          darkTheme
        />
        <WeatherItem
          icon={<WiTime3 />}
          value={getDayTime(weather.current.sunrise, weather.current.sunset)}
          desc="Daytime"
          darkTheme
        />
      </div>

      <div className="flex justify-around mt-8">
        <WeatherItem
          icon={<WiHumidity />}
          value={`${weather.current.humidity}%`}
          desc="Humidity"
          darkTheme
        />
        <WeatherItem
          icon={<WiBarometer />}
          value={`${weather.current.pressure} mbar`}
          desc="Pressure"
          darkTheme
        />
      </div>

      <div className="mt-8">
        <DailyForecast daily={weather.daily} />
      </div>
    </div>
  );
};

export default WeatherCard;
