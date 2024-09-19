import React from "react";
import {
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
} from "@iconscout/react-unicons";
import { formatToLocalTime, iconUrlFromCode } from "../services/weatherService";

function TemperatureAndDetails({
  weather: {
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
    timezone,
  },
}) {
  // Vertical details: real feel, humidity, wind speed
  const verticalDetails = [
    {
      id: 1,
      icon: <UilTemperature size={18} className="mr-1" />,
      title: "Real feel",
      value: `${feels_like.toFixed()}°`,
    },
    {
      id: 2,
      icon: <UilTear size={18} className="mr-1" />,
      title: "Humidity",
      value: `${humidity.toFixed()}%`,
    },
    {
      id: 3,
      icon: <UilWind size={18} className="mr-1" />,
      title: "Wind",
      value: `${speed.toFixed()} km/h`,
    },
  ];

  // Horizontal details: sunrise, sunset, high/low temperatures
  const horizontalDetails = [
    {
      id: 1,
      icon: <UilSun size={18} className="mr-1" />,
      title: "Rise",
      value: formatToLocalTime(sunrise, timezone, "hh:mm a"),
    },
    {
      id: 2,
      icon: <UilSunset size={18} className="mr-1" />,
      title: "Set",
      value: formatToLocalTime(sunset, timezone, "hh:mm a"),
    },
    {
      id: 3,
      icon: <UilSun size={18} className="mr-1" />,
      title: "High",
      value: `${temp_max.toFixed()}°`,
    },
    {
      id: 4,
      icon: <UilSun size={18} className="mr-1" />,
      title: "Low",
      value: `${temp_min.toFixed()}°`,
    },
  ];

  return (
    <div className="w-full max-w-screen-md mx-auto">
      {/* Weather details */}
      <div className="flex items-center justify-center py-4 text-lg sm:text-xl text-cyan-300">
        <p>{details}</p>
      </div>

      {/* Current temperature and vertical details */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-white py-3">
        <img
          src={iconUrlFromCode(icon)}
          alt="weather icon"
          className="w-20 sm:w-24"
        />
        <p className="text-4xl sm:text-5xl">{`${temp.toFixed()}°`}</p>
        <div className="flex flex-col space-y-2">
          {verticalDetails.map(({ id, icon, title, value }) => (
            <div
              key={id}
              className="flex font-light text-sm sm:text-base items-center justify-center"
            >
              {icon}
              {title}:{" "}
              <span className="font-medium ml-1">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Horizontal details like sunrise, sunset, high and low */}
      <div className="flex flex-col sm:flex-row items-center justify-center space-x-0 sm:space-x-2 space-y-2 sm:space-y-0 text-white text-sm sm:text-base py-3">
        {horizontalDetails.map(({ id, icon, title, value }) => (
          <div key={id} className="flex items-center">
            {icon}
            <p className="font-light">
              {title}:{" "}
              <span className="font-medium ml-1">{value}</span>
            </p>
            {id < horizontalDetails.length && (
              <p className="font-light hidden sm:block mx-2">|</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TemperatureAndDetails;
