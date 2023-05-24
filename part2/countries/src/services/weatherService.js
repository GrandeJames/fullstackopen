import axios from "axios";

const api = process.env.REACT_APP_NOT_SECRET_CODE;

const getWeather = (lat, lon) => {
  return axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api}`
    )
    .then((response) => response.data);
};

const weatherService = { getWeather };
export default weatherService;
