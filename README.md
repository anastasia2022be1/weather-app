# 🌤️ Weather App

A modern and responsive weather application built with React. It uses the OpenWeather API to fetch current weather data and forecasts, and Luxon to display accurate local time based on timezone and daylight saving time (DST).

## 🚀 Live Demo

https://weather-app-with-openweather-api.netlify.app/

---

## 📸 Features

- 🔍 Search weather by city or use your current location
- 📍 Accurate local time and timezone handling with Luxon
- 🌅 Displays sunrise and sunset in local time
- 🌡️ Shows real feel, humidity, wind speed, highs and lows
- 📆 Hourly and daily weather forecasts
- ⚙️ Metric (°C) and Imperial (°F) units toggle
- 📱 Fully responsive and mobile-friendly
- 💬 User notifications with React Toastify

---

## 🛠️ Tech Stack

| Tool             | Description                                      |
|------------------|--------------------------------------------------|
| [React](https://reactjs.org/)               | Frontend UI framework                        |
| [Tailwind CSS](https://tailwindcss.com/)    | Utility-first CSS framework for styling     |
| [OpenWeather API](https://openweathermap.org/) | Weather and forecast data                   |
| [Luxon](https://www.npmjs.com/package/luxon) | Date/time formatting & timezone support     |
| [React Icons](https://react-icons.github.io/react-icons/) | Weather and UI icons                        |
| [React Toastify](https://www.npmjs.com/package/react-toastify) | Elegant toast notifications                |

---

## 📦 Installation

1. **Clone the repository**

```
git clone https://github.com/anastasia2022be1/weather-app
cd weather-app
```

2. **Install dependencies**

```
npm install
```

3. **Set up environment variables**

Create a .env file in the root directory and add:

```
VITE_API_KEY=your_openweather_api_key
VITE_BASE_URL=https://api.openweathermap.org/data/2.5
VITE_GEONAMES_USERNAME=your_geonames_username
```

4. **Run the development server**

```
npm run dev
```
The app will be available at http://localhost:5173


## 💡 Credits

- Weather data from [OpenWeather API](https://openweathermap.org/)

- Timezone info from [GeoNames](https://www.geonames.org/)

- Icons from [React Icons](https://react-icons.github.io/react-icons/)

- Notifications powered by [React Toastify](https://www.npmjs.com/package/react-toastify)