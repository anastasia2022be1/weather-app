function TopButtons({ setQuery }) {
  const cities = [
    { id: 1, title: "London" },
    { id: 2, title: "Sydney" },
    { id: 3, title: "Tokyo" },
    { id: 4, title: "Toronto" },
    { id: 5, title: "Paris" },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 my-4 sm:my-6">
      {cities.map((city) => (
        <button
          key={city.id}
          className="text-white text-sm sm:text-lg font-medium transition ease-out hover:scale-110"
          onClick={() => setQuery({ q: city.title })}
        >
          {city.title}
        </button>
      ))}
    </div>
  );
}

export default TopButtons;
