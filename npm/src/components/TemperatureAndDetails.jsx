import React from "react";
import {
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset 
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
   }
 }) {
  return (
    <div>
      {/* Блок с деталями погоды */}
      <div className="flex items-center justify-center py-6 text-xl text-cyan-300">
        <p>{details}</p>
      </div>

      {/* Блок с текущей температурой и деталями */}
      <div className="flex flex-row items-center justify-between text-white py-3">
        <img src={iconUrlFromCode(icon)} alt="weather icon" className="w-20" />
        <p className="text-5xl">{`${temp.toFixed()}°`}</p>
        <div className="flex flex-col space-y-2">
          {/* Реальная температура */}
          <div className="flex font-light text-sm items-center justify-center">
            <UilTemperature size={18} className="mr-1" />
            Real feel:
            <span className="font-medium ml-1">{`${feels_like.toFixed()}°`}</span>
          </div>
          {/* Влажность */}
          <div className="flex font-light text-sm items-center justify-center">
            <UilTear size={18} className="mr-1" />
            Humidity:
            <span className="font-medium ml-1">{`${humidity.toFixed()}%`}</span>
          </div>
          {/* Ветер */}
          <div className="flex font-light text-sm items-center justify-center">
            <UilWind size={18} className="mr-1" />
            Wind:
            <span className="font-medium ml-1">{`${speed.toFixed()} km/h`}</span>
          </div>
        </div>
      </div>

      {/* Блок с информацией о восходе и закате */}
      <div className="flex flex-row items-center justify-center space-x-2 text-white text-sm py-3">
        <UilSun size={18} className="mr-1" />
        <p className="font-light">
          Rise:{" "}
          <span className="font-medium ml-1">
            {formatToLocalTime(sunrise, timezone, "hh:mm a")}
          </span>
        </p>
        <p className="font-light">|</p>

        <UilSunset size={18} className="mr-1" />
        <p className="font-light">
          Set:{" "}
          <span className="font-medium ml-1">
            {formatToLocalTime(sunset, timezone, "hh:mm a")}
          </span>
        </p>
        <p className="font-light">|</p>

        <UilSun size={18} className="mr-1" />
        <p className="font-light">
          High:{" "}
          <span className="font-medium ml-1">{`${temp_max.toFixed()}°`}</span>
        </p>
        <p className="font-light">|</p>

        <UilSun size={18} className="mr-1" />
        <p className="font-light">
          Low:{" "}
          <span className="font-medium ml-1">{`${temp_min.toFixed()}°`}</span>
        </p>
      </div>
    </div>
  );
}

export default TemperatureAndDetails;
