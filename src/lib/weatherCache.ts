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
const INTERVAL = 60 * 60 * 1000; // 1 Hour

export async function getWeather() {
  const now = Date.now();

  if (weather && now - weather.last_fetched < INTERVAL) {
    return weather;
  }

  let attempts = 0;
  const MAX_RETRIES = 2;

  while (attempts < MAX_RETRIES) {
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
      attempts++;
      console.warn(`Weather fetch attempt ${attempts} failed.`);

      if (attempts >= MAX_RETRIES) {
        console.error("Unable to fetch weather data after retries.", error);
        return weather;
      }
    }
  }

  return weather;
}
