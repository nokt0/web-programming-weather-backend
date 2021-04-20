import { Router } from 'express';
import Route from '../interfaces/routes.interface';
import validationMiddleware from "../middlewares/validation.middleware";
import WeatherController from "../controllers/weather.controller";
import { CreateCityNameDto, CreateCoordinatesDto} from "../dtos/weather.dto";

class WeatherRoutes implements Route {
  public path = '/weather';
  public router = Router();
  public weatherController = new WeatherController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/city`,  validationMiddleware(CreateCityNameDto, 'query'), this.weatherController.weatherByCity);
    this.router.get(`${this.path}/coordinates`, validationMiddleware(CreateCoordinatesDto, 'query'), this.weatherController.weatherByCoordinates);
  }
}

export default WeatherRoutes;
