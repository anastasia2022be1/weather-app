import { BiSolidDropletHalf } from "react-icons/bi";
import { FaThermometerEmpty, FaWind } from "react-icons/fa";
import { GiSunrise, GiSunset } from "react-icons/gi";
import { MdKeyboardArrowUp, MdOutlineKeyboardArrowDown } from "react-icons/md";
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
    units,
  },
}) {
  const windUnit = units === "imperial" ? "mph" : "m/s";

  const verticalDetails = [
    {
      id: 1,
      Icon: FaThermometerEmpty,
      title: "Real feel",
      value: `${feels_like.toFixed()}\u00B0`,
    },
    {
      id: 2,
      Icon: BiSolidDropletHalf,
      title: "Humidity",
      value: `${humidity.toFixed()}%`,
    },
    {
      id: 3,
      Icon: FaWind,
      title: "Wind",
      value: `${speed.toFixed()} ${windUnit}`,
    },
  ];

  const horizontalDetails = [
    {
      id: 1,
      Icon: GiSunrise,
      title: "Sunrise",
      value: formatToLocalTime(sunrise, timezone, "hh:mm a"),
    },
    {
      id: 2,
      Icon: GiSunset,
      title: "Sunset",
      value: formatToLocalTime(sunset, timezone, "hh:mm a"),
    },
    {
      id: 3,
      Icon: MdKeyboardArrowUp,
      title: "High",
      value: `${temp_max.toFixed()}\u00B0`,
    },
    {
      id: 4,
      Icon: MdOutlineKeyboardArrowDown,
      title: "Low",
      value: `${temp_min.toFixed()}\u00B0`,
    },
  ];

  return (
    <section className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
      <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/[0.08] p-6 shadow-xl shadow-black/20 ring-1 ring-white/5 sm:p-8">
        <div className="absolute right-6 top-6 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase text-emerald-100/80">
          {details}
        </div>

        <div className="flex min-h-64 flex-col justify-between gap-8 sm:min-h-72">
          <div>
            <img
              src={iconUrlFromCode(icon)}
              alt="weather icon"
              className="h-24 w-24 drop-shadow-2xl sm:h-28 sm:w-28"
            />
            <p className="mt-2 text-[5rem] font-semibold leading-none text-white sm:text-[7rem]">
              {`${temp.toFixed()}\u00B0`}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {verticalDetails.map(({ id, Icon, title, value }) => (
              <div
                key={id}
                className="rounded-2xl border border-white/10 bg-neutral-950/25 p-4"
              >
                <Icon size={18} className="mb-3 text-amber-100/80" />
                <p className="text-xs uppercase text-white/45">{title}</p>
                <p className="mt-1 text-lg font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {horizontalDetails.map(({ id, Icon, title, value }) => (
          <div
            key={id}
            className="rounded-3xl border border-white/15 bg-neutral-950/25 p-5 shadow-lg shadow-black/10 ring-1 ring-white/5"
          >
            <Icon size={28} className="text-emerald-100/80" />
            <p className="mt-5 text-xs uppercase text-white/45">{title}</p>
            <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TemperatureAndDetails;
