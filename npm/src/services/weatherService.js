import { DateTime } from "luxon";

const API_KEY = "ef826c14ad4cb4d0bbf2c979f9f0b7dd"; // Ваш API-ключ для OpenWeatherMap
const BASE_URL = "https://api.openweathermap.org/data/2.5"; // Базовый URL для запросов к API OpenWeatherMap

// Функция для получения текущих данных о погоде
const getCurrentWeatherData = (searchParams) => {
    const url = new URL(`${BASE_URL}/weather`); // Создаем URL для запроса текущей погоды
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY }); // Добавляем параметры запроса и API-ключ

    return fetch(url) // Выполняем запрос к API
        .then(response => {
            if (!response.ok) { // Проверяем, был ли запрос успешным
                return response.text() // Получаем текст ошибки
                    .then(text => {
                        throw new Error(`Error ${response.status}: ${text}`); // Выбрасываем ошибку с текстом
                    });
            }
            return response.json(); // Возвращаем данные в формате JSON
        })
        .catch(error => {
            console.error("Не удалось получить данные о погоде:", error); // Логируем ошибку
            throw error; // Пробрасываем ошибку для дальнейшей обработки
        });
};

// Функция для форматирования текущей погоды
const formatCurrentWeather = (data) => {
    const {
        coord: { lat, lon }, // Широта и долгота
        main: { temp, feels_like, temp_min, temp_max, humidity }, // Основные данные о температуре и влажности
        name, // Название города
        dt, // Время получения данных
        sys: { country, sunrise, sunset }, // Страна, время восхода и заката
        weather, // Массив с информацией о погоде
        wind: { speed }, // Скорость ветра
    } = data;

    const { main: details, icon } = weather[0]; // Основные детали погоды и иконка

    return {
        lat,
        lon,
        temp,
        feels_like,
        temp_min,
        temp_max,
        humidity,
        name,
        dt,
        country,
        sunrise,
        sunset,
        details,
        icon,
        speed,
    };
};

// Функция для получения и форматирования данных о погоде
const getFormattedWeatherData = (searchParams) => {
    return getCurrentWeatherData(searchParams) // Получаем текущие данные о погоде
        .then(formatCurrentWeather) // Форматируем текущую погоду
        .catch((error) => {
            console.error("Ошибка при получении или форматировании данных о погоде:", error); // Логируем ошибку
            throw error; // Пробрасываем ошибку для дальнейшей обработки
        });
};

// Функция для форматирования времени
const formatToLocalTime = (
    secs,
    zone,
    format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format); // Форматируем время с использованием Luxon

// Функция для формирования URL для иконок погоды
const iconUrlFromCode = (code) =>
    `http://openweathermap.org/img/wn/${code}@2x.png`; // Формируем URL для иконки погоды по коду

export default getFormattedWeatherData; // Экспортируем функцию для получения и форматирования данных о погоде

export { formatToLocalTime, iconUrlFromCode }; // Экспортируем функции форматирования времени и создания URL для иконок
