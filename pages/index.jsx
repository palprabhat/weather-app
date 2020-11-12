import LocationSearch from "../components/locationSearch";
import axios from "axios";
import Layout from "../components/layout";
import { useEffect, useState } from "react";
import WeatherCard from "../components/weatherCard";

const getWeather = async (lat, lon, units = "metric") => {
  const response = await axios.get(
    `/api/weather-all?lat=${lat}&lon=${lon}&units=${units}`
  );
  return response.data;
};

const Home = () => {
  const [location, setLocation] = useState({});
  const [placeName, setPalceName] = useState("");
  const [weather, setWeather] = useState({});

  useEffect(async () => {
    if (
      !(Object.keys(location).length === 0 && location.constructor === Object)
    ) {
      setWeather({});
      const { lat, lon } = location;
      const weatherData = await getWeather(lat, lon);

      setWeather(weatherData);
    }
  }, [location]);

  return (
    <Layout>
      <LocationSearch
        onSelect={({ lat, lon, place }) => {
          const loc = { lat, lon };
          setLocation(loc);
          setPalceName(place);
        }}
      />
      {!(
        Object.keys(weather).length === 0 && weather.constructor === Object
      ) && <WeatherCard weather={weather} placeName={placeName} />}
    </Layout>
  );
};

export default Home;
