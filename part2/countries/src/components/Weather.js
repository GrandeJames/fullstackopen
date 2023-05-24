import { useEffect, useState } from "react";
import weatherService from "../services/weatherService";

const Weather = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    weatherService
      .getWeather(country.latlng[0], country.latlng[1])
      .then((data) => {
        setWeather(data);
      });
  });

  if (weather === null) {
    return null;
  }

  return (
    <>
      <h3>Weather in {country.capital}</h3>
      <p>temperature {weather.main.temp} Celcius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="weather icon"
        height={100}
      ></img>
      <p>wind {weather.wind.speed} m/s</p>
    </>
  );
};

export default Weather;
