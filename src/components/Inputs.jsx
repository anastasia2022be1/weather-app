import { useState } from "react";
import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";
import { toast } from "react-toastify";

function Inputs({ setQuery, units, setUnits }) {
  const [city, setCity] = useState("");

  const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) setUnits(selectedUnit);
  };

  const handleSearchClick = () => {
    if (city !== "") setQuery({ q: city });
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      toast.info("Fetching user's location.");
      navigator.geolocation.getCurrentPosition((position) => {
        toast.success("Location fetched!");
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({
          lat,
          lon,
        });
      });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center my-6 space-y-4 sm:space-y-0 sm:space-x-4 w-full">
      {/* Input and icons (search and location) */}
      <div className="flex flex-row w-full sm:w-3/4 items-center space-x-4">
        <input
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          type="text"
          placeholder="Search for city..."
          className="text-lg sm:text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase"
        />
        <UilSearch
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleSearchClick}
        />
        <UilLocationPoint
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleLocationClick}
        />
      </div>

      {/* Unit selection (°C / °F) */}
      <div className="flex flex-row w-full sm:w-1/4 items-center justify-center space-x-2 sm:space-x-4">
        <button
          name="metric"
          className={`text-lg sm:text-xl text-white font-light transition ease-out hover:scale-125 ${units === "metric" ? "font-bold" : ""}`}
          onClick={handleUnitsChange}
        >
          °C
        </button>
        <p className="text-lg sm:text-xl text-white">|</p>
        <button
          name="imperial"
          className={`text-lg sm:text-xl text-white font-light transition ease-out hover:scale-125 ${units === "imperial" ? "font-bold" : ""}`}
          onClick={handleUnitsChange}
        >
          °F
        </button>
      </div>
    </div>
  );
}

export default Inputs;
