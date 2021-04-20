import { NextFunction, Request, Response } from 'express';
import WeatherService from "../services/weather.service";
import { CreateCityNameDto, CreateCoordinatesDto} from "../dtos/weather.dto";
import {WeatherApiResponse} from "../interfaces/apiResponses.interface";

class WeatherController {
  public weatherService = new WeatherService();

  public weatherByCity = async (req: Request, res: Response, next: NextFunction) => {
    const cityData: CreateCityNameDto = {name: req.query.name as string} ;

    try {
      const weather: WeatherApiResponse = await this.weatherService.requestWeatherByCity(cityData);
      res.status(201).json({ data: weather, message: 'Weather by city' });
    } catch (error) {
      next(error);
    }
  };

  public weatherByCoordinates = async (req: Request, res: Response, next: NextFunction) => {
    const coordinatesData = req.query as unknown as CreateCoordinatesDto;

    try {
      const weather: WeatherApiResponse = await this.weatherService.requestByCoordinates(coordinatesData);
      res.status(201).json({ data: weather, message: 'Weather by coordinates' });
    } catch (error) {
      next(error);
    }
  };

}

export default WeatherController;
