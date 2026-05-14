import { useState } from "react";
import { BiCurrentLocation, BiSearch } from "react-icons/bi";
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
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        setQuery({
          lat,
          lon,
        });
      });
    }
  };

  return (
    <div className="my-6 grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
      <div className="flex min-h-14 items-center rounded-2xl border border-white/15 bg-neutral-950/35 px-3 shadow-inner shadow-black/20 ring-1 ring-white/5">
        <input
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearchClick();
          }}
          type="text"
          placeholder="Search by city..."
          className="h-12 min-w-0 flex-1 bg-transparent px-2 text-base font-light text-white outline-none placeholder:text-white/45 sm:text-lg"
        />
        <button
          aria-label="Search weather"
          className="grid h-10 w-10 place-items-center rounded-xl text-white/75 transition duration-200 hover:bg-white/15 hover:text-white"
          onClick={handleSearchClick}
        >
          <BiSearch size={24} />
        </button>
        <button
          aria-label="Use current location"
          className="grid h-10 w-10 place-items-center rounded-xl text-white/75 transition duration-200 hover:bg-white/15 hover:text-white"
          onClick={handleLocationClick}
        >
          <BiCurrentLocation size={24} />
        </button>
      </div>

      <div className="grid grid-cols-2 rounded-2xl border border-white/15 bg-neutral-950/35 p-1 shadow-inner shadow-black/20 ring-1 ring-white/5 md:w-40">
        <button
          name="metric"
          className={`rounded-xl px-4 py-3 text-sm font-semibold transition duration-200 ${
            units === "metric"
              ? "bg-white text-neutral-950 shadow-lg shadow-black/20"
              : "text-white/65 hover:bg-white/10 hover:text-white"
          }`}
          onClick={handleUnitsChange}
        >
          {"\u00B0C"}
        </button>
        <button
          name="imperial"
          className={`rounded-xl px-4 py-3 text-sm font-semibold transition duration-200 ${
            units === "imperial"
              ? "bg-white text-neutral-950 shadow-lg shadow-black/20"
              : "text-white/65 hover:bg-white/10 hover:text-white"
          }`}
          onClick={handleUnitsChange}
        >
          {"\u00B0F"}
        </button>
      </div>
    </div>
  );
}

export default Inputs;
