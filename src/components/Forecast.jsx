import { formatToLocalTime, iconUrlFromCode } from "../services/weatherService";

function Forecast({ title, items, timeFormat = "ccc" }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="rounded-3xl border border-white/15 bg-neutral-950/25 p-4 shadow-lg shadow-black/10 ring-1 ring-white/5 sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase text-white/65">
          {title}
        </p>
        <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent ml-4" />
      </div>

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-3 xl:grid-cols-6">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex min-h-28 flex-col items-center justify-between rounded-2xl border border-white/10 bg-white/[0.07] px-2 py-3 text-center shadow-sm shadow-black/10"
          >
            <p className="text-xs font-medium text-white/65">
              {formatToLocalTime(item.dt, item.timezone, timeFormat)}
            </p>
            <img src={iconUrlFromCode(item.icon)} alt="" className="h-12 w-12" />
            <p className="text-lg font-semibold text-white">
              {`${item.temp.toFixed()}\u00B0`}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Forecast;
