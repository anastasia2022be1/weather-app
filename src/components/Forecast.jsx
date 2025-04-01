import { formatToLocalTime, iconUrlFromCode } from "../services/weatherService";

function Forecast({ title, items, timeFormat = "ccc" }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="mt-6 w-full max-w-screen-md mx-auto">
      <div className="flex items-center justify-start text-white">
        <p className="font-medium uppercase">{title}</p>
      </div>
      <hr className="my-2" />
      <div className="flex items-center justify-between text-white">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <p className="text-sm font-light">
          {formatToLocalTime(item.dt, item.timezone, timeFormat)}
            </p>
            <img src={iconUrlFromCode(item.icon)} alt="" className="w-12" />
            <p className="text-base font-medium">{`${item.temp.toFixed()}°`}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
