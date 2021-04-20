import { Router } from 'express';
import Route from '../interfaces/routes.interface';
import FavoriteController from "../controllers/favorite.controller";
import validationMiddleware from "../middlewares/validation.middleware";
import {CreateCityIdDto, CreateCityNameDto} from "../dtos/weather.dto";


class FavoriteRoutes implements Route {
  public path = '/favorite';
  public router = Router();
  public favoriteCitiesController = new FavoriteController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`,  this.favoriteCitiesController.getFavoriteCities);
    this.router.get(`${this.path}/:cityId`, validationMiddleware(CreateCityIdDto, "params"), this.favoriteCitiesController.getCityById);
    this.router.delete(`${this.path}`, validationMiddleware(CreateCityNameDto, "body"), this.favoriteCitiesController.deleteCity);
    this.router.post(`${this.path}`, validationMiddleware(CreateCityNameDto, "body"), this.favoriteCitiesController.addCity);
  }
}

export default FavoriteRoutes;
