import "./App.css"; // Импорт стилей для приложения
import TopButtons from "./components/TopButtons"; // Импорт компонента для верхних кнопок
import Inputs from "./components/Inputs"; // Импорт компонента для ввода данных
import TimeAndLocation from "./components/TimeAndLocation"; // Импорт компонента для отображения времени и локации
import TemperatureAndDetails from "./components/TemperatureAndDetails"; // Импорт компонента для отображения температуры и подробностей
import getFormattedWeatherData from "./services/weatherService"; // Импорт функции для получения и форматирования данных погоды
import { useEffect, useState } from "react"; // Импорт хуков React для управления состоянием и побочными эффектами
import { ToastContainer, toast } from "react-toastify"; // Импорт компонентов для отображения уведомлений
import "react-toastify/dist/ReactToastify.css"; // Импорт стилей для уведомлений

function App() {
  // Хук состояния для хранения поискового запроса, единиц измерения и данных о погоде
  const [query, setQuery] = useState({ q: "berlin" }); // Поисковой запрос, по умолчанию - "берлин"
  const [units, setUnits] = useState("metric"); // Единицы измерения температуры, по умолчанию - "метрическая"
  const [weather, setWeather] = useState(null); // Данные о погоде, изначально пустые

  useEffect(() => {
    // Хук для выполнения побочного эффекта при изменении query или units
    const fetchWeather = () => {
      const message = query.q ? query.q : "current location."; // Сообщение для уведомления
      toast.info("Fetching weather for " + message); // Показ уведомления о начале запроса

      // Получение и форматирование данных о погоде
      getFormattedWeatherData({ ...query, units })
        .then((data) => {
          if (!data) { // Проверка на случай, если данных нет
            throw new Error("No data returned from the API"); // Выбрасываем ошибку
          }

          toast.success(`Successfully fetched weather for ${data.name}, ${data.country}.`); // Уведомление об успешном получении данных
          setWeather(data); // Устанавливаем данные о погоде в состояние
        })
        .catch((error) => {
          toast.error("Error fetching weather data: " + error.message); // Уведомление об ошибке при получении данных
        });
    };

    fetchWeather(); // Вызов функции для получения данных о погоде
  }, [query, units]); // Перезапуск эффекта при изменении query или units

  // Функция для определения фона в зависимости от температуры и единиц измерения
  const formatBackground = () => {
    if (!weather) return "from-cyan-700 to-blue-700"; // Фон по умолчанию, если данных о погоде нет
    const threshold = units === "metric" ? 20 : 60; // Пороговая температура для смены фона
    if (weather.temp <= threshold) return "from-cyan-700 to-blue-700"; // Фон для прохладной погоды

    return "from-yellow-700 to-orange-700"; // Фон для теплой погоды
  };

  return (
<div
  className={`mx-auto max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-xl mt-4 py-5 px-4 sm:px-8 md:px-16 lg:px-32 bg-gradient-to-br h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}
>

      <TopButtons setQuery={setQuery} /> {/* Компонент для кнопок изменения запроса */}
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} /> {/* Компонент для ввода данных и изменения единиц измерения */}

      {weather && (
        <div>
          <TimeAndLocation weather={weather} /> {/* Компонент для отображения времени и локации */}
          <TemperatureAndDetails weather={weather} /> {/* Компонент для отображения температуры и подробностей */}
        </div>
      )}

      <ToastContainer autoClose={5000} theme="colored" newestOnTop={true} /> {/* Компонент для отображения уведомлений */}
    </div>
  );
}

export default App; 
