export interface Coordinates {
  lon: number,
  lat: number
}

export interface WeatherApiResponse {
  clouds: { all: number },
  coord: Coordinates,
  id: number,
  name: string,
  wind: { deg: number, speed: number },
  weather: {}
}
