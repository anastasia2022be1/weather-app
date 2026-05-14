import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Forecast from "./components/Forecast.jsx";
import Inputs from "./components/Inputs";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import TimeAndLocation from "./components/TimeAndLocation";
import TopButtons from "./components/TopButtons";
import getFormattedWeatherData from "./services/weatherService";

function App() {
  const [query, setQuery] = useState({ q: "berlin" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = () => {
      const message = query.q ? query.q : "current location.";
      toast.info("Fetching weather for " + message);

      getFormattedWeatherData({ ...query, units })
        .then((data) => {
          if (!data) {
            throw new Error("No data returned from the API");
          }

          toast.success(
            `Successfully fetched weather for ${data.name}, ${data.country}.`
          );
          setWeather(data);
        })
        .catch((error) => {
          toast.error("Error fetching weather data: " + error.message);
        });
    };

    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-neutral-950 via-emerald-950 to-stone-950";
    const threshold = units === "metric" ? 20 : 60;

    if (weather.temp <= threshold) {
      return "from-neutral-950 via-emerald-950 to-stone-950";
    }

    return "from-neutral-950 via-rose-950 to-amber-950";
  };

  return (
    <main
      className={`min-h-screen bg-gradient-to-br ${formatBackground()} px-4 py-6 text-white sm:px-6 lg:px-8`}
    >
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-6xl flex-col justify-center">
        <section className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

          <TopButtons setQuery={setQuery} />
          <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

          {weather && (
            <div className="space-y-6">
              <TimeAndLocation weather={weather} />
              <TemperatureAndDetails weather={weather} />
              <div className="grid gap-5 lg:grid-cols-2">
                <Forecast
                  title="Hourly Forecast"
                  items={weather.hourly}
                  timeFormat="hh:mm a"
                />
                <Forecast
                  title="Daily Forecast"
                  items={weather.daily}
                  timeFormat="ccc"
                />
              </div>
            </div>
          )}
        </section>
      </div>

      <ToastContainer autoClose={5000} theme="colored" newestOnTop={true} />
    </main>
  );
}

export default App;
