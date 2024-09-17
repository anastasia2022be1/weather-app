// Ключ API для аутентификации запросов к OpenWeatherMap API
const API_KEY = "ef598ae15b3bdb77faa65dd41be3d3a3";

// Базовый URL для запросов к OpenWeatherMap API
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// Функция для получения данных о погоде на основе типа информации (например, 'weather' или 'forecast')
// и параметров поиска (например, название города или координаты)
export const getWeatherData = (infoType, searchParams) => {
    // Создание полного URL, объединяя базовый URL с типом запрашиваемой информации о погоде
    const url = new URL(BASE_URL + "/" + infoType);

    // Добавление параметров поиска в URL, включая ключ API для аутентификации
    url.search = new URLSearchParams({
        ...searchParams,  // Оператор spread для включения дополнительных параметров поиска, таких как название города
        appid: API_KEY    // Добавление ключа API к параметрам
    });

    // Запрос данных с созданного URL, затем преобразование и возврат ответа в формате JSON
    return fetch(url)
        .then((res) => res.json());  // Преобразование ответа в формат JSON
};

// Функция для форматирования данных о текущей погоде
const formatCurrentWeather = (data) => {
    const {
        coord: { lat, lon },  // Извлечение координат: широта и долгота
        main: {
            temp, feels_like, temp_min, temp_max, humidity // Извлечение данных о температуре, влажности и т.д.
        },
        name, // Название города
        dt, // Время данных (в формате UNIX)
        sys: { country, sunrise, sunset }, // Страна, время восхода и заката солнца
        weather, // Информация о погоде
        wind: { speed } // Скорость ветра
    } = data;

    const { main: details, icon } = weather[0]; // Основное описание погоды и значок

    // Возврат отформатированных данных о погоде
    return { lat, lon, temp, feels_like, temp_min, temp_max, humidity, name, dt, country, sunrise, sunset, speed, details, icon };
}

// Функция для получения и форматирования данных о погоде
const getFormattedWeatherData = (searchParams) => {
    // Возвращаем результат вызова функции getWeatherData
    return getWeatherData('weather', searchParams)
        .then((weatherData) => {
            // Форматируем полученные данные о погоде
            return formatCurrentWeather(weatherData);
        })
        .catch((error) => {
            // Обработка ошибок, если запрос не удался
            console.error('Ошибка при получении данных о погоде:', error);
        });
};

// Экспорт функции по умолчанию
export default getFormattedWeatherData;
