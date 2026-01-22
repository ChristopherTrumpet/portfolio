import { fetchWeatherApi } from "openmeteo";

interface WeatherObject {
  temperature_2m: number;
  rain: number;
  snowfall: number;
  cloud_cover: number;
  is_day: number;
  last_fetched: number;
}

const params = {
  latitude: 40.43329600714427,
  longitude: -86.92195322224813,
  current: ["temperature_2m", "rain", "snowfall", "cloud_cover", "is_day"],
  timezone: "auto",
  temperature_unit: "fahrenheit",
};

const url = "https://api.open-meteo.com/v1/forecast";

let weather: WeatherObject | null = null;
const INTERVAL = 15 * 60 * 1000; // 15 Minutes

export async function getWeather() {
  const now = Date.now();

  if (weather && now - weather.last_fetched < INTERVAL) {
    return weather;
  }

  try {
    const responses = await fetchWeatherApi(url, params);
    const response = responses[0];
    const current = response.current();

    weather = {
      temperature_2m: Math.round(current!.variables(0)!.value()),
      rain: current!.variables(1)!.value(),
      snowfall: current!.variables(2)!.value(),
      cloud_cover: current!.variables(3)!.value(),
      is_day: current!.variables(4)!.value(),
      last_fetched: now,
    };

    return weather;
  } catch (error) {
    console.error("Unable to fetch weather data.", error);
    return weather;
  }
}
