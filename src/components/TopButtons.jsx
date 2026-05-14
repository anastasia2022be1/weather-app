function TopButtons({ setQuery }) {
  const cities = [
    { id: 1, title: "London" },
    { id: 2, title: "Sydney" },
    { id: 3, title: "Tokyo" },
    { id: 4, title: "Toronto" },
    { id: 5, title: "Paris" },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
      {cities.map((city) => (
        <button
          key={city.id}
          className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium uppercase text-white/80 shadow-sm shadow-black/10 transition duration-200 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/20 hover:text-white"
          onClick={() => setQuery({ q: city.title })}
        >
          {city.title}
        </button>
      ))}
    </div>
  );
}

export default TopButtons;
