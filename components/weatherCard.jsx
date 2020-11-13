import { useDarkTheme } from "../context/themeContext";
import * as dayjs from "dayjs";
import { useMertic } from "../context/unitContext";
import { getDayTime, getweatherIcon } from "../utils";
import { IconContext } from "react-icons/lib";
import { WiSunrise, WiSunset, WiTime3 } from "react-icons/wi";
import { GiSandsOfTime } from "react-icons/gi";

const WeatherCard = ({ weather, placeName }) => {
  const darkTheme = useDarkTheme();
  const metric = useMertic();

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
          <div className="text-5xl">
            {`${weather.current.temp}°${metric ? "C" : "F"}`}
          </div>
          <div>{`Feels like ${weather.current.feels_like}`}</div>
          <div className="text-xl">{placeName}</div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <IconContext.Provider
          value={{
            className: `text-2xl ${darkTheme ? "text-white" : "text-black"}`,
          }}
        >
          <div className="flex flex-col items-center">
            <WiSunrise />
            <div>{dayjs.unix(weather.current.sunrise).format("hh:mm a")}</div>
            <div className="text-xs">Sunrise</div>
          </div>
          <div className="flex flex-col items-center">
            <WiSunset />
            <div>{dayjs.unix(weather.current.sunset).format("hh:mm a")}</div>
            <div className="text-xs">Sunset</div>
          </div>
          <div className="flex flex-col items-center">
            <WiTime3 />
            <div>
              {getDayTime(weather.current.sunrise, weather.current.sunset)}
            </div>
            <div className="text-xs">Daytime</div>
          </div>
        </IconContext.Provider>
      </div>
    </div>
  );
};

export default WeatherCard;
