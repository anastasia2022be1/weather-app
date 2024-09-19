import { formatToLocalTime } from "../services/weatherService.js";

function TimeAndLocation({ weather: { dt, timezone, name, country } }) {
  return (
    <div className="w-full max-w-screen-md mx-auto">
      {/* Local Time Section */}
      <div className="flex items-center justify-center my-3 sm:my-6">
        <p className="text-white text-lg sm:text-xl font-extralight">
          {formatToLocalTime(dt, timezone)}
        </p>
      </div>

      {/* Location Section */}
      <div className="flex items-center justify-center my-2 sm:my-3">
        <p className="text-white text-2xl sm:text-3xl font-medium">
          {`${name}, ${country}`}
        </p>
      </div>
    </div>
  );
}

export default TimeAndLocation;
