import LocationSearch from "../components/locationSearch";
import axios from "axios";
import Layout from "../components/layout";
import { useEffect, useMemo, useState } from "react";
import WeatherCard from "../components/weatherCard";
import { useLocalStorage } from "../hooks/useLocalStorage";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState({});
  const [placeName, setPalceName] = useState("");
  const [weather, setWeather] = useState({});
  const [locationLoc, setLocationLoc] = useLocalStorage("location", {});

  useEffect(async () => {
    if (
      !(
        Object.keys(locationLoc).length === 0 &&
        locationLoc.constructor === Object
      )
    ) {
      setPalceName(locationLoc.place);
      setLocation({ lat: locationLoc.lat, lon: locationLoc.lon });
    }
  }, []);

  useEffect(() => {
    if (
      !(Object.keys(location).length === 0 && location.constructor === Object)
    ) {
      const getWeather = async (location) => {
        setIsLoading(true);
        try {
          const { lat, lon } = location;
          const response = await axios.get(
            `/api/weather-all?lat=${lat}&lon=${lon}`
          );

          const weatherData = response.data;
          setWeather(weatherData);
        } catch (err) {
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      };
      getWeather(location);

      const intervalId = setInterval(
        async () => getWeather(location),
        10 * 60 * 1000
      );
      return () => clearInterval(intervalId);
    }
  }, [location]);

  const isWeatherEmpty = useMemo(
    () => Object.keys(weather).length === 0 && weather.constructor === Object,
    [weather]
  );

  return (
    <Layout>
      <LocationSearch
        onLocationSelect={({ lat, lon, place }) => {
          const loc = { lat, lon };
          setWeather({});
          setLocation(loc);
          setPalceName(place);
          setLocationLoc({ lat, lon, place });
        }}
      />

      {isLoading && isWeatherEmpty && <WeatherCard.Loading />}

      {!isWeatherEmpty && (
        <WeatherCard
          weather={weather}
          placeName={placeName}
          isLoading={isLoading}
        />
      )}
    </Layout>
  );
};

export default Home;
