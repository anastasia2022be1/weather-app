import { DateTime } from "luxon";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const getCurrentWeatherData = (infoType, searchParams) => {
  const url = new URL(`${BASE_URL}/${infoType}`);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => {
          throw new Error(`Error ${response.status}: ${text}`);
        });
      }
      return response.json();
    })
    .catch(error => {
      console.error("Unable to retrieve weather data:", error);
      throw error;
    });
};

export const formatToLocalTime = (
    secs,
    zone = "UTC",
    format = "cccc, dd LLL yyyy | hh:mm a"
  ) => {
    if (!Number.isFinite(secs)) return "";

    if (Number.isFinite(zone)) {
      return DateTime
        .fromSeconds(secs + zone, { zone: "UTC" })
        .toFormat(format);
    }

    return DateTime
      .fromSeconds(secs, { zone: "UTC" })
      .setZone(zone)
      .toFormat(format);
  };
  

const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    timezone,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    timezone,
    country,
    sunrise,
    sunset,
    details,
    icon,
    speed,
  };
};

const getFormattedWeatherData = async (searchParams) => {
  const currentWeather = await getCurrentWeatherData("weather", searchParams)
    .then(formatCurrentWeather);

  const { lat, lon } = currentWeather;

  const forecastData = await getCurrentWeatherData("forecast", {
    lat,
    lon,
    units: searchParams.units,
  });
  const timezone = forecastData.city?.timezone ?? currentWeather.timezone ?? 0;

  const hourly = forecastData.list.slice(0, 6).map((d) => ({
    dt: d.dt,
    temp: d.main.temp,
    icon: d.weather[0].icon,
    timezone,
  }));

  const daily = forecastData.list
    .filter((_, idx) => idx % 8 === 0)
    .map((d) => ({
      dt: d.dt,
      temp: d.main.temp,
      icon: d.weather[0].icon,
      timezone,
    }));

  return { ...currentWeather, hourly, daily, timezone, units: searchParams.units };
};

export const iconUrlFromCode = (code) =>
  `https://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;
