import { useDarkTheme } from "../context/themeContext";

const WeatherCard = ({ weather, placeName }) => {
  const darkTheme = useDarkTheme();

  return (
    <div className={`rounded-lg shadow-md ${darkTheme ? "bg-gray-800" : ""}`}>
      <div className="text-lg text-center mt-6">{placeName}</div>
      <div className="text-4xl text-center mt-4">{`${weather.current.temp}°C`}</div>
    </div>
  );
};

export default WeatherCard;
