import { formatToLocalTime } from "../services/weatherService.js";

function TimeAndLocation({ weather: { dt, timezone, name, country } }) {
  return (
    <div className="flex flex-col items-center justify-center py-2 text-center">
      <p className="text-sm font-light uppercase text-white/55">
        {formatToLocalTime(dt, timezone)}
      </p>
      <h1 className="mt-3 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
        {name}
      </h1>
      <p className="mt-2 text-sm font-medium uppercase text-emerald-100/70">
        {country}
      </p>
    </div>
  );
}

export default TimeAndLocation;
