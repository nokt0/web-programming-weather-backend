import HttpException from '../exceptions/HttpException';
import {WeatherApiResponse} from "../interfaces/apiResponses.interface";
import {CreateCityNameDto, CreateCoordinatesDto} from "../dtos/weather.dto";
import fetch from 'node-fetch';

class WeatherService {
  public weatherApiUrl = `${process.env.API_URL}&appid=${process.env.WEATHER_API_KEY}`;

  async requestByCoordinates({lat, lon}: CreateCoordinatesDto) : Promise<WeatherApiResponse> {
    console.log(`${this.weatherApiUrl}&lat=${lat}&lon=${lon}`);
    return fetch(`${this.weatherApiUrl}&lat=${lat}&lon=${lon}`)
      .then(response => response.json())
      .catch((e) => {
        console.log(e);
        throw new HttpException(500, 'Cannot connect to api service');
      });
  }

  async requestWeatherByCity({name}: CreateCityNameDto) : Promise<WeatherApiResponse> {
    return fetch(`${this.weatherApiUrl}&q=${encodeURIComponent(name)}`)
      .then(response => response.json())
      .catch((e) => {
        console.log(e);
        throw new HttpException(500, 'Cannot connect to api service');
      });
  }
}

export default WeatherService;
